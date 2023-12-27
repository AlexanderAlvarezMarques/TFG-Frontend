import ReserveApi from '@/lib/api/reserve/reservesApi';
import {format} from "date-fns";

const searchReserves = async (city: string, sport: string, date: Date, time: Date | null, page: number = 1) => {

    const startDate = format(date, 'yyyy-MM-dd');
    if (time) {
        startDate.concat('T', format(time, 'HH:mm'));
    }

    const params = {
        city: city,
        sport: sport,
        startDate: date,
        page: page,
    };

    return ReserveApi.apiSearchReserves(params);
}

const getReserve = async (id: number) => {
    return ReserveApi.apiGetReserve(id);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    searchReserves,
    getReserve
}
