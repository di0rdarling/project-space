import moment from "moment";

export function convertToReadableDate(dateTime, includeTime) {
    if(includeTime){
        return moment(dateTime).format('DD MMM YYYY hh:mm')
    }
    return moment(dateTime).format('DD MMM YYYY')
}