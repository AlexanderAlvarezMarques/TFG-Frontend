type ReserveDetails = {
    "id": number,
    "isOwner": boolean,
    "owner"?: {
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
    "isParticipant": boolean,
    "isFull": boolean,
    "startDate": string,
    "endDate": string,
    "sport": string,
    "participants"?: ReserveParticipant[],
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

type ReserveParticipant = {
    "status": string,
    "participant": {
        "id": number,
        "username": string,
    },
}
