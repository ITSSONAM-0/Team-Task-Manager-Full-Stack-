import { useEffect, useState } from 'react';
import { fetchProjects, fetchTasks, createTask, updateTask } from '../api';

export default function Tasks({ user }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('todo');
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setProjects(await fetchProjects());
        setTasks(await fetchTasks());
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description, project: projectId, assignedTo: assignee, status });
      setTitle('');
      setDescription('');
      setAssignee('');
      setStatus('todo');
      setError('');
      setTasks(await fetchTasks());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (taskId, nextStatus) => {
    try {
      await updateTask(taskId, { status: nextStatus });
      setTasks(await fetchTasks());
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Tasks</h2>
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      <form className="form-grid" onSubmit={handleCreate}>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" />
        </label>
        <label>
          Project
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
            <option value="">Select project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>{project.title}</option>
            ))}
          </select>
        </label>
        <label>
          Assign to
          <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="User ID or leave blank" />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">Todo</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <button type="submit">Create task</button>
      </form>
      <div className="card">
        {tasks.length ? (
          tasks.map((task) => (
            <div key={task._id} className="card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <button type="button" onClick={() => handleStatusChange(task._id, 'in progress')} className="secondary">
                In Progress
              </button>
              <button type="button" onClick={() => handleStatusChange(task._id, 'done')}>
                Done
              </button>
            </div>
          ))
        ) : (
          <p>No tasks yet.</p>
        )}
      </div>
    </div>
  );
}
