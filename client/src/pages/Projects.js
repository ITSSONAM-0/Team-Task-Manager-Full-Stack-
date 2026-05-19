import { useEffect, useState } from 'react';
import { fetchProjects, createProject, fetchUsers } from '../api';

export default function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [member, setMember] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setProjects(await fetchProjects());
        setUsers(await fetchUsers());
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({ title, description, members: member ? [member] : [user.id] });
      setTitle('');
      setDescription('');
      setError('');
      setProjects(await fetchProjects());
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Projects</h2>
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" />
        </label>
        <label>
          Add member
          <select value={member} onChange={(e) => setMember(e.target.value)}>
            <option value="">Select a member</option>
            {users.map((memberOption) => (
              <option key={memberOption._id} value={memberOption._id}>{memberOption.name} ({memberOption.role})</option>
            ))}
          </select>
        </label>
        <button type="submit">Create project</button>
      </form>
      <div className="card">
        {projects.length ? (
          projects.map((project) => (
            <div key={project._id} className="card">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <small>Owner: {project.owner.name}</small>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}
