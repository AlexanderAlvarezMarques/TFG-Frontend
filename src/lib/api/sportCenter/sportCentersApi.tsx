import globalAxios from "@/utils/axios.config";

const getAllSportCenters = async() => {

    const response = await fetch('http://localhost:9001/api/sport_centers', { next: { revalidate: 60 }}) // Check if the local date are older than 60 seconds to request/refresh the content

    if (!response.ok) return undefined;

    return response.json();
}

const getSportCenterDetailsById = async (id: number) => {

    const response = await fetch(`http://localhost:9001/api/sport_centers/${id}`)

    // if (!response.ok) throw new Error("Error getting sport center details")
    if (!response.ok) return undefined

    return response.json();
}

const getSportCenterReserves = async (id: number)=> {

}

const getSports = async (id: number)=> globalAxios.get(
    `/sport_centers/${id}/sports`
)

const getReservesAvailable = async (id: number, sport: string, date: string)=> globalAxios.get(
    `/sport_centers/${id}/reserves_availability?sport=${sport}&date=${date}`
)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllSportCenters,
    getSportCenterDetailsById,
    getSportCenterReserves,
    getSports,
    getReservesAvailable,
}
