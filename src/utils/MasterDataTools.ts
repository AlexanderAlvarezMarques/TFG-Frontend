import MasterService from "@/services/api/master/MasterService";

const readMasterData = async() => {
    const provinces = await MasterService.getProvinces();
    const cities = await MasterService.getCities();
    const sports = await MasterService.getSports();

    return {provinces, cities, sports}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    readMasterData
}
