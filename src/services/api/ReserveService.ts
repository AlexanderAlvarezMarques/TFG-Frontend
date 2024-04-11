import ReserveApi from '@/lib/api/reserve/reservesApi';
import {format} from "date-fns";

const searchReserves = async (city: number, sport: string, date: Date, page: number = 1) => {

    const startDate = format(date, 'yyyy-MM-dd HH:mm');

    const params = {
        city: city,
        sport: sport,
        startDate: startDate,
        page: page,
    };

    return ReserveApi.apiSearchReserves(params);
}

const getReserve = async (id: number) => {
    return ReserveApi.apiGetReserve(id);
}

const createReserve = async (courtId: number, date: Date, hour: number, minutes: number, duration: number)  => {

    date.setHours(hour, minutes, 0, 0);
    const startDate = date;
    const endDate = new Date(startDate.getTime() + duration * 60000);

    const reserve = {
        "court": {
            "id": courtId
        },
        "startDate": format(startDate, 'yyyy-MM-dd HH:mm'),
        "endDate": format(endDate, 'yyyy-MM-dd HH:mm')
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
