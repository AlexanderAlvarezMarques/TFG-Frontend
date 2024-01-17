import SportCenterApi from '@/lib/api/sportCenter/sportCentersApi';
import {HTTP_STATUS} from "@/enums/HttpStatus";
import {format} from "date-fns";

const getSports = async (sportCenter: number): Promise<any[]> => {
    const response = await SportCenterApi.getSports(sportCenter);

    if (response.status == HTTP_STATUS.OK) {
        return response.data;
    }

    return [];
}

const getReservesAvailable = async (sportCenter: number, sport: string, date: Date): Promise<any[]> => {
    const response = await SportCenterApi.getReservesAvailable(sportCenter, sport, format(date, 'yyyy-MM-dd'));

    if (response.status == HTTP_STATUS.OK) {
        return response.data;
    }

    return [];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSports,
    getReservesAvailable
}
