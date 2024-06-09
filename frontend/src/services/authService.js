import axios from 'axios';
import serverUrl from '../server/server';

const authService = {
    login: async (credentials) => {
        try {
            const response = await axios.post(`${serverUrl}/auth/login`, credentials);
            return response.data.token;
        } catch (error) {
            throw error.response.data;
        }
    },
    register: async (userData) => {
        try {
            const response = await axios.post(`${serverUrl}/auth/register`, userData);
            return response.data.message;
        } catch (error) {
            throw error.response.data;
        }
    },
    logout: async () => {
        try {
            const response = await axios.post(`${serverUrl}/auth/logout`);
            return response.data.message;
        } catch (error) {
            throw error.response.data;
        }
    },
    resetPassword: async (email, newPassword) => {
        try {
            const response = await axios.post(`${serverUrl}/auth/reset-password`, { email, newPassword });
            return response.data.message;
        } catch (error) {
            throw error.response.data;
        }
    },
    verifyAccount: async (token) => {
        try {
            const response = await axios.get(`${serverUrl}/auth/verify/${token}`);
            return response.data.message;
        } catch (error) {
            throw error.response.data;
        }
    },

    getUsername: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${serverUrl}/auth/username`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.username;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default authService;
