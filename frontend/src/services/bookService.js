import axios from 'axios';
import serverUrl from '../server/server';

const bookService = {
    createBook: async (bookData) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const formData = new FormData();
            formData.append('title', bookData.title);
            formData.append('author', bookData.author);
            formData.append('publishedYear', bookData.publishedYear);
            formData.append('description', bookData.description);
            formData.append('coverPhoto', bookData.coverPhoto); // Assuming coverPhoto is a File object

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.post(`${serverUrl}/books/`, formData, config); // Use serverUrl
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    getBooks: async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.get(`${serverUrl}/books/`, config); // Use serverUrl
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    getBookById: async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.get(`${serverUrl}/books/${id}`, config); // Use serverUrl
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    updateBook: async (id, bookData) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.put(`${serverUrl}/books/${id}`, bookData, config); // Use serverUrl
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    deleteBook: async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.delete(`${serverUrl}/books/${id}`, config); // Use serverUrl
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
};

export default bookService;
