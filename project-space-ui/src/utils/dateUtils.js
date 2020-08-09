import moment from "moment";

export function convertToReadableDate(dateTime) {
    return moment(dateTime).format('DD MMM YYYY')
}