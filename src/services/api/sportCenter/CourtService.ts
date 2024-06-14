import CourtApi from "@/lib/api/sportCenter/CourtApi";
import HTTP_STATUS from "@/enum/HttpStatusEnum";

const updateCourt = async (id: number, number: number, sport: string, enable: boolean)=> {

    const body = {
        number: number,
        sport: sport,
        enable: enable
    };

    const apiResponse = await CourtApi.apiUpdateCourt(id, body);
    return apiResponse.status === HTTP_STATUS.OK ? apiResponse.data : null;
}

const createCourt = async (sportCenterId: number, sport: string, number: number) => {
    const body = {
        sportCenter: {
            id: sportCenterId
        },
        sport: sport,
        number: number
    }

    const apiResponse = await CourtApi.apiCreateCourt(body);
    return apiResponse.status === HTTP_STATUS.CREATED ? apiResponse.data : null;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    updateCourt,
    createCourt
}
