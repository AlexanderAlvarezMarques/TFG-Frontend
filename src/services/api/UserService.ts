import UsersApi from "@/lib/api/users/usersApi"

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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    logIn,
    getUserDetailsByToken,
    getUserDashboard,
}
