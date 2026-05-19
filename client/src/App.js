import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Navbar from './components/Navbar';
import { setLogoutHandler } from './api';

const getAuthUser = () => {
  const token = localStorage.getItem('taskmanager_token');
  if (!token) return null;
  const saved = localStorage.getItem('taskmanager_user');
  if (!saved || saved === 'null') return null;
  try {
    return JSON.parse(saved);
  } catch (e) {
    return null;
  }
};

function App() {
  const [user, setUser] = useState(getAuthUser());

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('taskmanager_token');
    localStorage.removeItem('taskmanager_user');
  };

  useEffect(() => {
    setLogoutHandler(handleLogout);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('taskmanager_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('taskmanager_user');
    }
  }, [user]);

  return (
    <div className="app-shell">
      <Navbar user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/signup" element={<Signup onLogin={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/projects" element={user ? <Projects user={user} /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={user ? <Tasks user={user} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
