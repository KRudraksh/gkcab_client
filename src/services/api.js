import config from './config';

// Generic API request function
const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const url = `${config.apiUrl}${endpoint}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Something went wrong');
  }
  
  if (response.status === 204) {
    return null; // No content to return
  }
  
  return response.json();
};

// API functions for users
export const userApi = {
  login: (credentials) => request('/users/login', 'POST', credentials),
  adminLogin: (credentials) => request('/users/admin/login', 'POST', credentials),
  getUsers: () => request('/users'),
  createUser: (userData) => request('/users', 'POST', userData),
  deleteUser: (id, password) => request(`/users/${id}`, 'DELETE', { password }),
  resetPassword: (id, adminPassword, newPassword) => 
    request(`/users/${id}/reset-password`, 'POST', { adminPassword, newPassword }),
};

// API functions for machines
export const machineApi = {
  getMachines: (username) => request(`/machines${username ? `?username=${username}` : ''}`),
  createMachine: (machineData) => request('/machines', 'POST', machineData),
  deleteMachine: (id) => request(`/machines/${id}`, 'DELETE'),
  resetStatus: () => request('/machines/reset-status', 'POST'),
  getDirectoryNumbers: (machineId, username) => 
    request(`/machines/${machineId}/directory-numbers${username ? `?username=${username}` : ''}`),
  saveDirectoryNumbers: (machineId, directoryNumbers, username) => 
    request(`/machines/${machineId}/directory-numbers`, 'POST', { directoryNumbers, username }),
  requestStatus: (machineId) => request(`/getStatus/${machineId}`, 'POST'),
};

// API functions for operations
export const operationApi = {
  getOperations: (machineId) => request(`/operations/${machineId}`),
  deleteOperation: (id) => request(`/operations/${id}`, 'DELETE'),
  getLastUpdate: () => request('/lastUpdate'),
};

export default {
  userApi,
  machineApi,
  operationApi,
}; 