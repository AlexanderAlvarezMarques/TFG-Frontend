type AuthToken = {
    token: string,
    refresh_token: string,
    isLogged: boolean,
}

type User = {
    "id": number,
    "username": string,
    "email"?: string,
    "language": string,
    "name": string,
    "surname": string,
    "nif"?: string,
}

type Dashboard = {
    "games": {
        "history": [Match],
        "next": [Match]
    },
    "reserves": {
        "history": [DashboardReserve],
        "active": [DashboardReserve]
    }
}
