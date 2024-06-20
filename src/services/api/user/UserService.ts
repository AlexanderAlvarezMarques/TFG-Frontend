import UserApi from "@/lib/api/user/UserApi";
import HTTP_STATUS from "@/enum/HttpStatusEnum";
import {UserDashboardFilterEnumType} from "@/enum/UserDashboardQueryParamEnum";

const logIn = async (username: string, password: string) => {
    const bodyRequest = {
        username: username,
        password: password
    }

    const apiResponse = await UserApi.apiLogIn(bodyRequest);

    if (apiResponse.status === HTTP_STATUS.OK) {
        return apiResponse.data
    }

    return null;
};

const getUserDetails = async (id: number) => {
    const apiResponse = await UserApi.apiGetUser(id);

    if (apiResponse.status === HTTP_STATUS.OK) {
        return apiResponse.data
    }

    return null;
};

const getUserByToken = async () => {
    const apiResponse = await UserApi.apiGetUserByToken();

    if (apiResponse.status === HTTP_STATUS.OK) {
        return apiResponse.data
    }

    return null;
};

const getUserDashboard = async (type: UserDashboardFilterEnumType, page: number, itemsPerPage: number) => {
    const apiResponse = await UserApi.apiGetUserDashboard({filter: type, page: page, itemsPerPage: itemsPerPage});
    return apiResponse.status === HTTP_STATUS.OK ? apiResponse.data : null;
}

const getUserSportFacilities = async (page: number, itemsPerPage: number) => {
    const params = {
        page: page,
        itemsPerPage: itemsPerPage
    }
    const apiResponse = await UserApi.apiGetUserSportFacilities(params);
    return apiResponse.status === HTTP_STATUS.OK ? apiResponse.data : null;
}

const createPlayerUser = async (name: string, surname: string, email: string, username: string, password: string, nif = "", language = "ES") => {
    const body = {
        name: name,
        surname: surname,
        username: username,
        email: email,
        password: password,
        nif: nif,
        language: language,
        userTelephoneNumbers: []
    }

    const apiResponse = await UserApi.apiCreatePlayerUser(body);
    return apiResponse.status === HTTP_STATUS.OK ? apiResponse.data : null;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    logIn,
    getUserDetails,
    getUserByToken,
    getUserDashboard,
    getUserSportFacilities,
    createPlayerUser
}
