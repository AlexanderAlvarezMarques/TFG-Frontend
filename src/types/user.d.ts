type AuthToken = {
    token: string,
    refresh_token: string
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

type Reserve =  {
    "id": number,
    "court": {
        "sportCenter": {
            "name": string,
            "city": {
                "name": string,
                "province": {
                    "name": string,
                    "country": {
                        "name": srting
                    }
                }
            },
        }
        "identifier": string,
        "number": 4,
        "type": string
    },
    "startDate": string,
    "endDate": string,
    "status": string
}

type Match = {
    "id": number,
    "reserve": {
        "id": number,
        "status": string,
        "locationDetails": {
            "sportCenter": {
                "id": number,
                "name": string
            },
            "court": {
                "number": number,
                "type": string
            }
        },
        "startDate": string,
        "startHour": string,
        "endDate": string,
        "endHour": string
    }
}

type Dashboard = {
    "games": {
        "history": [Match],
        "next": [Match]
    },
    "reserves": {
        "history": [Reserve],
        "active": [Reserve]
    }
}
