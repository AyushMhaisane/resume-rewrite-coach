import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Interceptor: Automatically add Token to every request
API.interceptors.request.use((req) => {
    // We will store the token in localStorage for the MVP
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        req.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    return req;
});

export default API;