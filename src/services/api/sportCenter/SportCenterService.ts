import SportCenterApi from "@/lib/api/sportCenter/SportCenterApi";
import HTTP_STATUS from "@/enum/HttpStatusEnum";
import SportTypeEnum from "@/enum/SportTypeEnum";
import FormatDateTools from "@/utils/FormatDateTools";

const getAllSportCentersData = async () => {
    const apiResponse = await SportCenterApi.apiGetAllSportCenters();

    if (apiResponse.status === HTTP_STATUS.OK) {
        return apiResponse.data;
    }

    return [];
}

const getSportCenterDetails = async (id: number, courts: boolean = false) => {
    const apiResponse = await SportCenterApi.apiGetSportCenter(id, courts);

    if (apiResponse.status === HTTP_STATUS.OK) {
        return apiResponse.data;
    }

    return null;
}

const getAvailableSports = async (id: number) => {
    const apiResponse = await SportCenterApi.apiGetSports(id);
    return apiResponse.status === HTTP_STATUS.OK ? apiResponse.data : null;
}

const getReservesAvailable = async (sportCenterId: number, sport: string, date: Date)=> {
    const params = {
        sport: sport,
        date: FormatDateTools.formatApiDate(date)
    }
    const apiResponse = await SportCenterApi.apiGetReservesAvailable(sportCenterId, params);
    return apiResponse.status === HTTP_STATUS.OK ? apiResponse.data : null;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllSportCentersData,
    getSportCenterDetails,
    getAvailableSports,
    getReservesAvailable
}
