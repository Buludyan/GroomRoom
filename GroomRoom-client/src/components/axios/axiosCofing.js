import axios from "axios";


export const Axios = axios.create({
    baseURL: "http://localhost:6060",
    withCredentials: true
})


Axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    return config;
})

Axios.interceptors.request.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get('http://localhost:6060/refresh', {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return Axios.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})
