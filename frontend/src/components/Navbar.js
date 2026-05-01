import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div>
        <strong>Team Task Manager</strong>
      </div>
      <div>
        {user ? (
          <> 
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/tasks">Tasks</Link>
            <button onClick={onLogout} className="secondary">Logout</button>
          </>
        ) : (
          <> 
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}
