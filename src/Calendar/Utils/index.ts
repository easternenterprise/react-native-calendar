import moment from "moment";

// To calcular difference in dates from current
export const getDayDifferenceFromCurrent = (date: string) => {
    var current = moment(new Date(), 'YYYY-MM-DD');
    var dateValue = moment(date, 'YYYY-MM-DD');
    return dateValue.diff(current, 'days')
}
