import globalAxios from "@/utils/axios.config";

const apiRequestJoin = async (params: any) => globalAxios.post(
    "/reserves/participants/join_request" ,
    params
);

const apiCancelJoin = async (reserveId: number, userId: number) => globalAxios.patch(
    `/reserves/${reserveId}/participants/${userId}/cancel_request`,
    {}
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiRequestJoin,
    apiCancelJoin
}
