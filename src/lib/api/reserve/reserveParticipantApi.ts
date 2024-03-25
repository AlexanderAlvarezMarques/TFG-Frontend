import globalAxios from "@/utils/axios.config";

const apiRequestJoin = async (params: any) => globalAxios.post(
    "/reserves/participants/join_request" ,
    params
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiRequestJoin,
}
