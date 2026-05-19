import { useEffect, useState } from 'react';
import { fetchProjects, fetchTasks } from '../api';

export default function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
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

  return (
    <div className="card">
      <h2>Welcome, {user.name}</h2>
      <p>Your role: {user.role}</p>
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      <div className="card">
        <h3>Projects</h3>
        {projects.length ? (
          <ul>
            {projects.map((project) => (
              <li key={project._id}>{project.title} - {project.owner.name}</li>
            ))}
          </ul>
        ) : (
          <p>No projects yet.</p>
        )}
      </div>
      <div className="card">
        <h3>Your tasks</h3>
        {tasks.length ? (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                {task.title} - {task.status} - {task.project?.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks assigned.</p>
        )}
      </div>
    </div>
  );
}
