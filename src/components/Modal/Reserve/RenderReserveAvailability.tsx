import styles from "@/assets/sass/components/Modal/createReserve.module.scss";
import React from "react";

type Props = {
    sport: string,
    reserves: ReserveSchedule[],
}

const sortNumeric = (arr: any) => arr.sort((a: any, b: any) => parseInt(a) - parseInt(b));

const renderHoursAndMinutes = (reserve: ReserveSchedule) =>
    sortNumeric(Object.keys(reserve.schedule)).map((hour: any, hourIndex: number) =>
        sortNumeric(Object.keys(reserve.schedule[hour])).map((minute: any, minuteIndex: number) => (
            <div
                key={minuteIndex}
                className={`${styles.hour} ${reserve.schedule[hour][minute] ? styles.available : styles.unavailable}`}
            >
                {hour}:{minute}
            </div>
        ))
    );

const RenderReserveAvailability = (props: Props) => {

    return (
        <div className={`${styles.reserveAvailability}`}>
            {props.reserves.map((reserve: ReserveSchedule, reserveIndex: number) => (
                <div key={reserveIndex} className={`${styles.court}`}>
                    <div className={`${styles.title}`}>
                        {props.sport[0].toUpperCase() + props.sport.slice(1).toLowerCase()} {reserve.number}
                    </div>
                    <div className={`${styles.hours}`}>{renderHoursAndMinutes(reserve)}</div>
                </div>
            ))}
        </div>
    )

}

export default RenderReserveAvailability;
