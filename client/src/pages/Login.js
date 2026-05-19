import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await login({ email, password });
      localStorage.setItem('taskmanager_token', result.token);
      onLogin(result.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>
        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
      <p>
        New here? <Link to="/signup">Create account</Link>
      </p>
    </div>
  );
}
