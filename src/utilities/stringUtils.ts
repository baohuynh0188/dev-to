export const camalize = (str: string): string => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

export const convertDate = (str: string) => {
    const dateTime = new Date(str);
    return `${dateTime.toLocaleDateString()} - ${dateTime.toLocaleTimeString()}`
}
