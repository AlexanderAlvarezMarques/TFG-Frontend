import globalAxios from "@/utils/axios.config";

const apiSearchReserves = async (params: any) => globalAxios.get(
    "/reserves/search?" ,
    { params }
);

const apiGetReserve = async (id: number) => globalAxios.get(
    `/reserves/${id}`
);

const apiCreateReserve = async (reserve: any) => globalAxios.post(
    "/reserves",
    reserve
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiSearchReserves,
    apiGetReserve,
    apiCreateReserve,
}
