import globalAxios from "@/utils/axios.config";

const endPoint = '/sport_centers'

const apiGetAllSportCenters = async () => globalAxios.get(
     `${endPoint}`
)

const apiGetSportCenter = async (id: number, courts: boolean) => globalAxios.get(
    `${endPoint}/${id}${courts ? '?courts' : ''}`
)

const apiGetSports = async (id: number) => globalAxios.get(
    `${endPoint}/${id}/sports`
)

const apiGetReservesAvailable = async (id: number, params: any) => globalAxios.get(
    `${endPoint}/${id}/reserves_availability`,
    {params}
)

const apiUpdateSportCenter = async (id: number, body: any) => globalAxios.put(
    `${endPoint}/${id}`,
    body
)

const apiCreateSportCenter = async (body: any) => globalAxios.post(
    `${endPoint}`,
    body
)

const apiGetTopReserveSportCenterList = async () => globalAxios.get(
    `${endPoint}_top_reserves`
)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiGetAllSportCenters,
    apiGetSportCenter,
    apiGetSports,
    apiGetReservesAvailable,
    apiUpdateSportCenter,
    apiCreateSportCenter,
    apiGetTopReserveSportCenterList
}
