const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
    