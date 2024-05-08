import {format} from "date-fns";

const formatDate = (date: Date) => {
    const day = format(date, "yyyy-MM-dd");
    const time = format(date, "HH:ii")

    return `${day}T${time}`
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    formatDate
}
