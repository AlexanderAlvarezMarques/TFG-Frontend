import globalAxios from "@/utils/axios.config";

const apiLogIn = async (data: any) => globalAxios.post(
    "/api/users/login",
    data
)

const apiRefreshToken = async (refreshToken: string) => globalAxios.post(
    "/api/users/login/refresh",
    {
        refresh_token: refreshToken
    }
)

const apiGetUserDetailsByToken = async () => globalAxios.get(
    "/api/users/details"
)

const apiGetUserDashboard = async () => globalAxios.get(
    "/api/users/dashboard"
)

export default {
    apiGetUserDetailsByToken,
    apiRefreshToken,
    apiLogIn,
    apiGetUserDashboard,
}
