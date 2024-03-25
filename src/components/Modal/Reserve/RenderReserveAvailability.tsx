import styles from "@/assets/sass/components/Modal/createReserve.module.scss";
import React, {useEffect, useState} from "react";
import {CourtReservationModal} from "@/components/Modal/Reserve/CourtReservationModal";

type Props = {
    sport: string,
    courts: CourtSchedule[],
    date: Date,
}

const sortNumeric = (arr: any) => arr.sort((a: any, b: any) => parseInt(a) - parseInt(b));

const renderHoursAndMinutes = (court: CourtSchedule, setReserveProps: Function) => {

    const handleClick = (courtId: number, courtNumber: number, hour: string, minute: string) => {
        setReserveProps({courtId, courtNumber, hour, minute, isSet: true});
    }

    return sortNumeric(Object.keys(court.schedule)).map((hour: any) =>
        sortNumeric(Object.keys(court.schedule[hour])).map((minute: any) => (
            <div
                key={`${hour}:${minute}`}
                className={`${styles.hour} ${court.schedule[hour][minute] ? styles.available : styles.unavailable}`}
                onClick={court.schedule[hour][minute] ? () => handleClick(court.id, court.number, hour, minute) : () => {}}
            >
                {hour}:{minute}
            </div>
        ))
    );
}

const RenderReserveAvailability = (props: Props) => {

    type CreateReserveProps = {
        courtId: number;
        courtNumber: number;
        hour: string;
        minute: string;
        isSet?: boolean;
    };

    const [reserveProps, setReserveProps] = useState<CreateReserveProps>({courtId: 0, courtNumber: 0, hour: "", minute: "", isSet: false});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const resetReserveProps = () => {
        setReserveProps({courtId: 0, courtNumber: 0, hour: "", minute: "", isSet: false});
    }

    useEffect(() => {
        if (reserveProps.isSet) {
            setIsModalOpen(true);
        }
    }, [reserveProps]);

    return !isModalOpen ? (
        <div className={`${styles.reserveAvailability}`}>
            {props.courts.map((court: CourtSchedule, reserveIndex: number) => (
                <div key={reserveIndex} className={`${styles.court}`}>
                    <div className={`${styles.title}`} >
                        {props.sport[0].toUpperCase() + props.sport.slice(1).toLowerCase()} {court.number}
                    </div>
                    <div className={`${styles.hours}`}>
                        {renderHoursAndMinutes(court, setReserveProps)}
                    </div>
                </div>
            ))}
        </div>
    ) :
        <CourtReservationModal
            onClose={() => setIsModalOpen(false)}
            courtId={reserveProps.courtId}
            courtNumber={reserveProps.courtNumber}
            date={props.date}
            hour={reserveProps.hour}
            minute={reserveProps.minute}
        />
}

export default RenderReserveAvailability;
