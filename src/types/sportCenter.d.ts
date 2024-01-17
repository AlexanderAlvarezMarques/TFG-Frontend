type SportCenter = {
    "id": number,
    "name": string,
    "country": string,
    "state": string,
    "city": string,
    "street": string,
    "postalCode": string,
    "courts": [
        {
            "identifier": string,
            "number": number,
            "type": string
        },
        {
            "identifier": string,
            "number": number,
            "type": string
        },
        {
            "identifier": string,
            "number": number,
            "type": string
        },
        {
            "identifier": string,
            "number": number,
            "type": string
        }
    ]
}

type ReserveScheduleHour = {
    [hour: string]: {
        [minute: string]: boolean;
    };
}

type ReserveSchedule = {
    id: number;
    number: number;
    schedule: ReserveScheduleHour[];
};
