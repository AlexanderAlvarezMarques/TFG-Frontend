export default async function getAllSportCenters() {

    const response = await fetch('http://localhost:9001/api/sport_centers', { next: { revalidate: 60 }}) // Check if the local date are older than 60 seconds to request/refresh the content

    if (!response.ok) return undefined;

    return response.json();
}

export async function getSportCenterDetailsById(id: number) {

    const response = await fetch(`http://localhost:9001/api/sport_centers/${id}`)

    // if (!response.ok) throw new Error("Error getting sport center details")
    if (!response.ok) return undefined

    return response.json();
}
