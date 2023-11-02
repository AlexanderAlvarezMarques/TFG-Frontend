import axios from 'axios';
import { HTTP_STATUS } from "@/enums/HttpStatus";
import UserApi from '@/lib/api/users/api'

const globalAxios = axios.create({
    baseURL: process.env.BACKEND_URL, // Replace with your API base URL
});

const noAuthRoutes = [
    `/api/users/login`,
    `/api/users/login/refresh`
]

// Request interceptor
globalAxios.interceptors.request.use(
    (config) => {
        // Modify the request config here (add Header, authentication tokens)
        const accessToken = localStorage.getItem("token");
        const url = config.url

        // Check routes that not needs Auth
        if (
            !noAuthRoutes.find((noAuthRoute) => noAuthRoute === url)
            && accessToken
        ) {
            localStorage.setItem('token', accessToken)
            if (config.headers) config.headers.Authorization = "Bearer " + accessToken;
        }

        // config.Header["Cache-Control"] = 'no-store'
        config.headers["Content-Type"] = "application/json"

        return config;
    },
    (error) => {
        // Handle request errors here

        // return Promise.reject(error);
    }
);

globalAxios.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        const originalRequest = error.config;
        const url = originalRequest.url

        if (
            error.response.status === HTTP_STATUS.UNAUTHORIZED
            && !noAuthRoutes.includes(url)
            && !originalRequest._retry
        ) {
            originalRequest._retry = true;

            let refreshToken = localStorage.getItem('refresh_token') ?? ""
            const refreshTokenPromise = UserApi.apiRefreshToken(refreshToken)

            refreshTokenPromise
                .then(( { data } ) => {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('refresh_token', data.refresh_token)
                    originalRequest.headers.Authorization = `Bearer ${data.token}`
                    return axios(originalRequest)
                })
                .catch(( error ) => {
                    return Promise.reject(error);
                })
        }

        // For other error statuses, reject the request
        const { status, data } = error.response
        return {
            status,
            data
        }
        // return Promise.reject(error);
    }
);

// End of Response interceptor

export default globalAxios;
