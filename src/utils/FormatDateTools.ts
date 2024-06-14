import {format} from "date-fns";

const formatApiDate = (date: Date) => {
    const day = format(date, "yyyy-MM-dd");
    const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    return `${day}T${time}`
}

const formatDateWithoutTime = (date: Date) => {
    const dayOfMonth: number = date.getDate();
    const formattedDay: string = dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth.toString();

    const month = date.getMonth();
    const months = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"
    ]

    return `${formattedDay} ${months[month]}`;
}

const formatHour = (date: Date) => {
    return date.toLocaleTimeString([], {hour: `2-digit`, minute: `2-digit`});
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    formatApiDate,
    formatDateWithoutTime,
    formatHour
}
