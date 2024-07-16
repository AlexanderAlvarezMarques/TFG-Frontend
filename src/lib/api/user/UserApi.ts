import globalAxios from "@/utils/axios.config";

const endPoint = `/users`;

const apiLogIn = async (params: {username: string, password: string})=> globalAxios.post(
    `${endPoint}/login`,
    params
);

const apiGetUser = async (id: number) => globalAxios.get(
    `${endPoint}/${id}`
);

const apiGetUserByToken = async () => globalAxios.get(
    `${endPoint}/details`
);

const apiGetUserDashboard = async (params: any)=> globalAxios.get(
    `${endPoint}/dashboard`,
    {params}
)

const apiGetUserSportFacilities = async (params: any) => globalAxios.get(
    `${endPoint}/sport_centers`,
    {params}
)

const apiCreatePlayerUser = async (body: any) => globalAxios.post(
    `${endPoint}/player`,
    body
)

const apiUpdateUserData = async (body: any) => globalAxios.patch(
    `${endPoint}`,
    body
)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiLogIn,
    apiGetUser,
    apiGetUserByToken,
    apiGetUserDashboard,
    apiGetUserSportFacilities,
    apiCreatePlayerUser,
    apiUpdateUserData
}
