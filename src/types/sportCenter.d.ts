type SportCenter = {
    "id": number,
    "name": string,
    "country": string,
    "state": string,
    "city": City,
    "street": string,
    "postalCode": string,
    "courts"?: [
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

type Court = {
    id?: number;
    identifier?: string;
    number: number;
    sport: string;
    sportCenter: SportCenter;
};

type CourtSchedule = {
    id: number;
    number: number;
    schedule: ReserveScheduleHour[];
};
