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

const getUserDashboard = async (type : number = 0) => {
    /*
    * 0 => ALL
    * 1 => HG => History Games
    * 2 => NG => Next Games
    * 3 => HR => History reserves
    * 4 => AR => Active reserves
    **/
    const types = ['ALL', 'HG', 'NG', 'HR', 'AR'];
    return await UsersApi.apiGetUserDashboard({ filter: types[type] });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    logIn,
    getUserDetailsByToken,
    getUserDashboard,
}
