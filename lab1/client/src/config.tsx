
const API_BASE_URL = import.meta.env.MODE === 'development'
    ? 'http://localhost:5000'
    : 'https://competition-monitoring-app-server.onrender.com';

export default {
    API_BASE_URL
}