import globalAxios from "@/utils/axios.config";
import {Reserve} from "@/types/reserves";

const endPoint = `/reserves`;

const apiSearchReserves = async (params: object) => globalAxios.get(
    `${endPoint}/search`,
    { params }
);

const apiGetReserve = async (id: number) => globalAxios.get(
    `${endPoint}/${id}`
);

const apiCreateReserve = async (reserve: any) => globalAxios.post(
    `${endPoint}`,
    reserve
);

const apiDeleteReserve = async (id: number) => globalAxios.delete(
    `${endPoint}/${id}`
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiSearchReserves,
    apiGetReserve,
    apiCreateReserve,
    apiDeleteReserve
}
