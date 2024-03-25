type DashboardReserve =  {
    "id": number,
    "startDate": Date,
    "endDate": Date,
    "sport": string,
    "participantLimit": number,
    "isParticipant": boolean,
    "court": {
        "number": number,
        "sport": string,
        "sportCenter": {
            "id": number,
            "name": string,
            "city": {
                "name": string,
                "province": {
                    "name": string,
                    "country": {
                        "name": string,
                        "isoCode": string
                    }
                }
            }
        }
    }
}

type ReserveDetails = {
    "id": number,
    "reserveOwner"?: {
        "id": number,
        "username": string,
    },
    "court": {
        "id": number,
        "identifier": string,
        "number": number,
        "sport": string,
        "sportCenter": {
            "id": number,
            "name": string,
            "street": string,
            "city": {
                "name": string,
                "province": {
                    "name": string,
                    "country": {
                        "name": string,
                        "isoCode": string,
                    }
                }
            }
        },
    },
    "participantLimit": number,
    "startDate": string,
    "endDate": string,
    "sport": string,
    "participants"?: [
        {
            "participant": {
                "id": number,
                "username": string,
            }
        }
    ],
    "reserveRates": [
        {
            "participant": {
                "id": number,
                "username": string,
            },
            "rate": number,
        }
    ],
    "status": string,
    "public": true,
    "averageRate": number,
}
