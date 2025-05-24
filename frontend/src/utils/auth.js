import axios from 'axios';

export const checkAuthStatus = async (API) => {
    try {
        const response = await axios.get(`${API}checkAuth`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Auth check error:', error);
        return {isAuthenticated: false};
    }
}; 