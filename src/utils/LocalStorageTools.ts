'use client'

import MasterService from "@/services/api/master/MasterService";

async function readAndSetMasterData() {
    const [countries, provinces, cities, sports] = await Promise.allSettled([
        MasterService.getCountries(),
        MasterService.getProvinces(),
        MasterService.getCities(),
        MasterService.getSports()
    ]);

    const masterData = {
        countries: countries.status === 'fulfilled' ? countries.value : [],
        provinces: provinces.status === 'fulfilled' ? provinces.value : [],
        cities: cities.status === 'fulfilled' ? cities.value : [],
        sports: sports.status === 'fulfilled' ? sports.value : []
    };

    localStorage.setItem("countries", JSON.stringify(masterData.countries));
    localStorage.setItem("provinces", JSON.stringify(masterData.provinces));
    localStorage.setItem("cities", JSON.stringify(masterData.cities));
    localStorage.setItem("sports", JSON.stringify(masterData.sports));

}

const readMasterData = () => {
    const currentTime = new Date();
    const lastUpdate = localStorage.getItem('lastMasterDataUpdate') ?? "";
    const timeDiff = Math.abs(currentTime.getTime() - new Date(lastUpdate).getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (!lastUpdate || diffDays >= 1) {
        readAndSetMasterData().then();
        localStorage.setItem('lastMasterDataUpdate', currentTime.toString());
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    readMasterData
}
