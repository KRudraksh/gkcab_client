// Environment-specific configuration
const dev = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
};

const prod = {
  // For Azure deployment at gkcab.azurewebsites.net
  apiUrl: process.env.REACT_APP_API_URL || 'https://gkcab.azurewebsites.net/api'
};

// Determine which environment we're in
const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config; 