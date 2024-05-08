type SearchEngineParams = {
    province: number
    city: number
    date: Date
    sport: string
    action?: Function
}

type SearchResult = {
    data: ReserveDetails[]
    pagination: Pagination
}
