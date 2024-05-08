type Country = {
    id: number,
    name: string
    isoCode: string
}

type Province = {
    id: number,
    name: string,
    country: Country
    cities: City[]
}

type City = {
    id: number,
    name: string
    province: Province
    sportCenters?: SportCenter[]
}

type Sport = {
    name: string
}
