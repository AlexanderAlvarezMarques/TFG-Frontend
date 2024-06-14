type SportCenter = {
    id: number
    name: string
    country: string
    state: string
    city: City
    street: string
    postalCode: string
    nCourts: number
    courts?: Court[]
}

type Court = {
    id: number
    identifier: string
    number: number
    sport: string
    sportCenter: SportCenter
    enable: boolean
};

type CourtSchedule = {
    id: number
    number: number
    schedule: CourtScheduleHour[]
}

type CourtScheduleHour = {
    [hour: string]: {
        [minute: string]: boolean;
    };
}
