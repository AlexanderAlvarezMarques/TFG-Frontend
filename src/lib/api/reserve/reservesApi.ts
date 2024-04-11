import globalAxios from "@/utils/axios.config";

const endPoint: string = "/reserves";

const apiSearchReserves = async (params: any) => globalAxios.get(
    `${endPoint}/search?`,
    { params }
);

const apiGetReserve = async (id: number) => globalAxios.get(
    `${endPoint}/${id}`
);

const apiCreateReserve = async (reserve: any) => globalAxios.post(
    `${endPoint}`,
    reserve
);

const apiDeleteParticipant = async (reserveId: number, participantId: number)=> globalAxios.delete(
    `${endPoint}/${reserveId}/participants/${participantId}`
)

const apiAcceptParticipant = async (reserveId: number, participantId: number)=> globalAxios.patch(
    `${endPoint}/${reserveId}/participants/${participantId}/accept_request`, {}
)

const apiRejectParticipant = async (reserveId: number, participantId: number)=> globalAxios.patch(
    `${endPoint}/${reserveId}/participants/${participantId}/reject_request`, {}
)

const apiCancelParticipation = async (reserveId: number, participantId: number)=> globalAxios.patch(
    `${endPoint}/${reserveId}/participants/${participantId}/cancel_request`, {}
)

const apiDeleteReserve = async (id: number) => globalAxios.delete(
    `${endPoint}/${id}`, {}
)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiSearchReserves,
    apiGetReserve,
    apiCreateReserve,
    apiAcceptParticipant,
    apiRejectParticipant,
    apiCancelParticipation,
    apiDeleteParticipant,
    apiDeleteReserve,
}
