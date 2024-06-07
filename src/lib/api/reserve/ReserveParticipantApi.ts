import globalAxios from "@/utils/axios.config";

const endPoint = `/reserves`;
const getFullEndPoint = (id: number = -1) => id === -1 ? `${endPoint}/participants` : `${endPoint}/${id}/participants`;

const apiJoinRequest = async (body: any) => globalAxios.post(
    `${getFullEndPoint()}/join_request`,
    body
)

const apiCancelRequest = async (reserveId: number) => globalAxios.patch(
    `${getFullEndPoint(reserveId)}/cancel_request`
)

const apiAcceptJoinRequest = async (reserveId: number, participantId: number) => globalAxios.patch(
    `${getFullEndPoint(reserveId)}/${participantId}/accept_request`,
    {}
)

const apiRejectJoinRequest = async (reserveId: number, participantId: number) => globalAxios.patch(
    `${getFullEndPoint(reserveId)}/${participantId}/reject_request`,
    {}
)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiJoinRequest,
    apiCancelRequest,
    apiAcceptJoinRequest,
    apiRejectJoinRequest
}
