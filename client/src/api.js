const API_BASE = (process.env.NODE_ENV === 'production') 
  ? '/api' 
  : (process.env.REACT_APP_API_URL || 'http://localhost:5000/api');


const getToken = () => localStorage.getItem('taskmanager_token');

const clearAuth = () => {
  localStorage.removeItem('taskmanager_token');
  localStorage.removeItem('taskmanager_user');
};

let logoutHandler = null;

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

const request = async (path, options = {}) => {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  
  if (response.status === 401) {
    clearAuth();
    if (logoutHandler) logoutHandler();
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('API URL is incorrect or backend is down. Received HTML instead of JSON.');
  }

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Request failed');
  }
  return json;
};

export const login = (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) });
export const signup = (data) => request('/auth/signup', { method: 'POST', body: JSON.stringify(data) });
export const fetchProjects = () => request('/projects');
export const createProject = (data) => request('/projects', { method: 'POST', body: JSON.stringify(data) });
export const fetchUsers = () => request('/projects/members');
export const fetchTasks = () => request('/tasks');
export const createTask = (data) => request('/tasks', { method: 'POST', body: JSON.stringify(data) });
export const updateTask = (id, data) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) });
