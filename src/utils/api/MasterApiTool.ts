import MasterService from "@/services/api/MasterService";

const getMasterData = async () => {
    const countries = MasterService.getCountries();
    const provinces = MasterService.getProvinces();
    const cities = MasterService.getCities();
    const sports = MasterService.getSports();

    let values: [Country[], Province[], City[], Sport[]] = await Promise.all([countries, provinces, cities, sports]);

    return {
        countries: values[0],
        provinces: values[1],
        cities: values[2],
        sports: values[3]
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getMasterData
}
