import globalAxios from "@/utils/axios.config";

const apiGetCountries = async () => globalAxios.get(
    '/master/countries'
);

const apiGetProvinces = async (isoCode: string = "esp") => globalAxios.get(
    `/master/provinces?isoCode=${isoCode}&cities`
);

const apiGetCities = async (province: string = "") => globalAxios.get(
    `/master/cities?order[name]=asc&province.name=${province}`
);

const apiGetSports = async () => globalAxios.get(
    '/master/sports'
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apiGetCountries,
    apiGetProvinces,
    apiGetCities,
    apiGetSports
}
