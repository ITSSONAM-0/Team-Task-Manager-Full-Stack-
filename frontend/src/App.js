import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Navbar from './components/Navbar';

const getAuthUser = () => {
  const saved = localStorage.getItem('taskmanager_user');
  return saved ? JSON.parse(saved) : null;
};

function App() {
  const [user, setUser] = useState(getAuthUser());

  useEffect(() => {
    localStorage.setItem('taskmanager_user', JSON.stringify(user));
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('taskmanager_token');
  };

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
