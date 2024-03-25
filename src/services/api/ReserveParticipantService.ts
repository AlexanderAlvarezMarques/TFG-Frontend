import ReserveParticipantApi from '@/lib/api/reserve/reserveParticipantApi';
import {HTTP_STATUS} from "@/enums/HttpStatus";

const requestJoin = async (reserveId: number) => {

    const body = {
        "reserve": {
            "id": reserveId
        }
    }

    const response = await ReserveParticipantApi.apiRequestJoin(body);

    if (response.status === HTTP_STATUS.CREATED) {
        return response.data;
    }

    return [];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    requestJoin
}
