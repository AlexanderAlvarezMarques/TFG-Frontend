import MasterApi from '@/lib/api/master/masterApi';
import { HTTP_STATUS } from "@/enums/HttpStatus";

const getCountries = async () => {

    const countries = await MasterApi.apiGetCountries();

    const { status, data } = countries;
    if (status === HTTP_STATUS.OK) {
        return data;
    }

    return {};
}

const getProvinces = async () => {

    const provinces = await MasterApi.apiGetProvinces();

    const { status, data } = provinces;
    if (status === HTTP_STATUS.OK) {
        return data;
    }

    return {};
}

const getCities = async () => {

    const cities = await MasterApi.apiGetCities();

    const { status, data } = cities;
    if (status === HTTP_STATUS.OK) {
        return data;
    }

    return {};
}

const getSports = async () => {
    const sports = await MasterApi.apiGetSports();

    const { status, data } = sports;
    if (status === HTTP_STATUS.OK) {
        return data;
    }

    return {};
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getCountries,
    getProvinces,
    getCities,
    getSports
}
