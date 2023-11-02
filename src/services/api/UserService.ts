import UsersApi from "@/lib/api/users/api"

const logIn = async (username: string, password: string) => {
    const loginData = {
        username: username,
        password: password
    }

    return UsersApi.apiLogIn((loginData));
}

const getUserDetailsByToken = async () => {
    return await UsersApi.apiGetUserDetailsByToken()
}

const getUserDashboard = async () => {
    return await UsersApi.apiGetUserDashboard()
}

export default {
    logIn,
    getUserDetailsByToken,
    getUserDashboard,
}
