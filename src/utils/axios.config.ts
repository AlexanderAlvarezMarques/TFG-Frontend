import axios from 'axios';
import { HTTP_STATUS } from "@/enums/HttpStatus";
import {useDispatch} from "react-redux";

const globalAxios = axios.create({
    baseURL: process.env.BACKEND_URL,
});

/// Helper function to refresh token
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token') ?? '';
    const response = await axios.post(
        `${process.env.BACKEND_URL}/api/users/login/refresh`,
        {
            refresh_token: refreshToken
        }
    )

    const { status, data } = response;
    if (status === HTTP_STATUS.OK) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refresh_token', data.refresh_token);
        return data.token;
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        throw new Error('Refresh token request failed');
    }
};

// Request interceptor
globalAxios.interceptors.request.use(
    async (config) => {
        // Modify the request config here (add Header, authentication tokens)
        config.url = "/api" + config.url;
        config.headers["Content-Type"] = "application/json";

        // Check for token in localStorage
        const accessToken = localStorage.getItem("token");

        // if (accessToken) not working || if (accessToken !== undefined) not working
        if (
            accessToken
            // accessToken !== null &&
            // accessToken !== "undefined" &&
            // accessToken !== undefined &&
            // accessToken !== ""
        ) {
            if (config.headers) config.headers.Authorization = "Bearer " + accessToken;
        }

        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Response interceptor
globalAxios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === HTTP_STATUS.UNAUTHORIZED
            && !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const newToken = await refreshToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            originalRequest.url = originalRequest.url.replace('/api', '');
            return globalAxios(originalRequest);
        }

        // For other error statuses, reject the request
        return Promise.reject(error);
    }
);

// End of Response interceptor

export default globalAxios;
