import MasterService from "@/services/api/MasterService";

const getMasterData = () => {
    const countries = MasterService.getCountries();
    const provinces = MasterService.getProvinces();
    const cities = MasterService.getCities();
    const sports = MasterService.getSports();

    return Promise.all([countries, provinces, cities, sports]).then((values) => {
        return {
            countries: values[0],
            provinces: values[1],
            cities: values[2],
            sports: values[3]
        };
    });
}

export default {
    getMasterData
}
