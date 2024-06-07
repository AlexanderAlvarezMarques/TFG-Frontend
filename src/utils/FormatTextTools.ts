const capitalizeFirstChar = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    capitalizeFirstChar
}
