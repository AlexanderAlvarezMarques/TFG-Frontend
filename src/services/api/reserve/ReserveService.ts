import ReserveApi from "@/lib/api/reserve/ReserveApi";
import FormatDateTools from "@/utils/FormatDateTools";
import HTTP_STATUS from "@/enum/HttpStatusEnum";

const searchReserves = async (city: number, sport: string, date: Date, page: number, itemsPerPage: number) => {

    const queryParams = {
        city: city,
        sport: sport,
        date: FormatDateTools.formatApiDate(date),
        page: page,
        itemsPerPage: itemsPerPage
    }

    const apiResponse = await ReserveApi.apiSearchReserves(queryParams);

    if (apiResponse.status === HTTP_STATUS.OK) {
        return apiResponse.data;
    }

    return null;
}

const deleteReserve = async (id: number) => {
    const apiResponse = await ReserveApi.apiDeleteReserve(id);
    return apiResponse.status === HTTP_STATUS.NOT_CONTENT;
}

const getReserve = async (id: number) => {
    const apiResponse = await ReserveApi.apiGetReserve(id);
    return apiResponse.status === HTTP_STATUS.OK ? apiResponse.data : null
}

const createReserve = async (courtId: number, date: Date, hour: number, minutes: number, duration: number)=> {

    const endDate = new Date(date.getTime() + (duration * 60000)) // 60000 => milliseconds in a minute

    const body = {
        court: {
            id: courtId
        },
        startDate: FormatDateTools.formatApiDate(date),
        endDate: FormatDateTools.formatApiDate(endDate)
    }
    const apiResponse = await ReserveApi.apiCreateReserve(body);
    return apiResponse.status === HTTP_STATUS.CREATED;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    searchReserves,
    deleteReserve,
    getReserve,
    createReserve
}
