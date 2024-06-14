import globalAxios from "@/utils/axios.config";

const endPoint = `/courts`;

const apiUpdateCourt = async (id: number, body: any) => globalAxios.put(
    `${endPoint}/${id}`,
    body
)

const apiCreateCourt = async (body: any) => globalAxios.post(
    `${endPoint}`,
    body
)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiUpdateCourt,
    apiCreateCourt
}
