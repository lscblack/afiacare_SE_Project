import axios from 'axios';
import { resetStateToDefault } from '../features/SharedDataSlice/SharedData';
import { store } from '../app/store';

// Function to get token from localStorage
const getToken = () => {
    const info = localStorage.getItem('persist:afiaCare');
    if (info) {
        const userInfo = JSON.parse(JSON.parse(info).usersLogin);
        return userInfo.access_token;
    }
    return '';
};

// Create Axios instance
const createAxiosInstance = () => {
    const token = getToken();
    const instance = axios.create({
        baseURL: import.meta.env.VITE_MAIN,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        },
        withCredentials: false, // this will be changed in production
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                // Reset state and redirect to login
                store.dispatch(resetStateToDefault());
                window.location.href = ""
            } else {
                const errorData = error.response?.data;
                let errorMessage = errorData
                    ? errorData.error || error.message
                    : 'Failed';
                
                if (!errorMessage.includes('Request failed with status code')) {
                    return errorMessage
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default createAxiosInstance;
