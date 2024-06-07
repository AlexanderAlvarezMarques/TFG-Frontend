import ReserveParticipantApi from "@/lib/api/reserve/ReserveParticipantApi";
import HTTP_STATUS from "@/enum/HttpStatusEnum";

const requestJoin = async (id: number) => {

    const body = {
        reserve: {
            id: id
        }
    };

    const apiResponse = await ReserveParticipantApi.apiJoinRequest(body);
    return apiResponse.status === HTTP_STATUS.CREATED;
}

const cancelJoin = async (reserveId: number) => {
    const apiResponse = await ReserveParticipantApi.apiCancelRequest(reserveId);
    return apiResponse.status === HTTP_STATUS.NOT_CONTENT;
}

const acceptJoinRequest = async (reserveId: number, participantId: number) => {
    const apiResponse = await ReserveParticipantApi.apiAcceptJoinRequest(reserveId, participantId);
    return apiResponse.status === HTTP_STATUS.OK ? apiResponse.data : null;
}

const rejectJoinRequest = async (reserveId: number, participantId: number) => {
    const apiResponse = await ReserveParticipantApi.apiRejectJoinRequest(reserveId, participantId);
    return apiResponse.status === HTTP_STATUS.OK ? apiResponse.data : null;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    requestJoin,
    cancelJoin,
    acceptJoinRequest,
    rejectJoinRequest,
}
