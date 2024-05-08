import ReserveApi from '@/lib/api/reserve/reservesApi';
import {format} from "date-fns";
import FormatDateTools from "@/utils/FormatDateTools";

const searchReserves = async (city: number, sport: string, date: Date, page = process.env.DEFAULT_PAGE, itemsPerPage = process.env.DEFAULT_ITEMS_PER_PAGE) => {

    const startDateFormatted = FormatDateTools.formatDate(date);

    const params = {
        city: city,
        sport: sport,
        startDate: startDateFormatted,
        page: page,
        itemsPerPage: itemsPerPage
    };

    return ReserveApi.apiSearchReserves(params);
}

const getReserve = async (id: number) => {
    return ReserveApi.apiGetReserve(id);
}

const createReserve = async (courtId: number, date: Date, hour: number, minutes: number, duration: number)  => {

    date.setHours(hour, minutes, 0, 0);
    const startDate = date;
    const endDate = new Date(startDate.getTime() + (duration * 60000)); // 60000 => milliseconds in a minute

    const reserve = {
        "court": {
            "id": courtId
        },
        "startDate": FormatDateTools.formatDate(startDate),
        "endDate": FormatDateTools.formatDate(endDate)
    }

    return ReserveApi.apiCreateReserve(reserve);

}

const deleteParticipantFromReserve = async (reserveId: number, participantId: number) => {
    return ReserveApi.apiDeleteParticipant(reserveId, participantId);
}

const acceptParticipantFromReserve = async (reserveId: number, participantId: number) => {
    return ReserveApi.apiAcceptParticipant(reserveId, participantId);
}

const rejectParticipantFromReserve = async (reserveId: number, participantId: number) => {
    return ReserveApi.apiRejectParticipant(reserveId, participantId);
}

const cancelParticipationInReserve = async (reserveId: number, participantId: number) => {
    return ReserveApi.apiCancelParticipation(reserveId, participantId);
}

const deleteReserve = async (id: number) => {
    return ReserveApi.apiDeleteReserve(id);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    searchReserves,
    getReserve,
    createReserve,
    acceptParticipantFromReserve,
    rejectParticipantFromReserve,
    cancelParticipationInReserve,
    deleteParticipantFromReserve,
    deleteReserve,
}
