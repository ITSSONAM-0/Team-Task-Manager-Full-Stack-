import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api';

export default function Signup({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await signup({ name, email, password, role });
      localStorage.setItem('taskmanager_token', result.token);
      onLogin(result.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>
        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        <button type="submit">Create account</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
