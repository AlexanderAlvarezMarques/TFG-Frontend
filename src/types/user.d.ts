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

type Book = {
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
    "participants": {},
    "startDate": string,
    "startHour": string,
    "endDate": string,
    "endHour": string
}

type Match = {
    "id": number,
    "book": {
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
    "books": {
        "history": [Book],
        "active": [Book]
    }
}
