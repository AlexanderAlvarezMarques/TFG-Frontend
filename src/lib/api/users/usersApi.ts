import globalAxios from "@/utils/axios.config";

const apiLogIn = async (data: any) => globalAxios.post(
    "/users/login",
    data
)

const apiRefreshToken = async (refreshToken: string) => globalAxios.post(
    "/users/login/refresh",
    {
        refresh_token: refreshToken
    }
)

const apiGetUserDetailsByToken = async () => globalAxios.get(
    "/users/details"
)

const apiGetUserDashboard = async () => globalAxios.get(
    "/users/dashboard"
)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiGetUserDetailsByToken,
    apiRefreshToken,
    apiLogIn,
    apiGetUserDashboard,
}
