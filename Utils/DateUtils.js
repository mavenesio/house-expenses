import {isEqual, isAfter, formatISO, parseISO, format} from 'date-fns';
import esLocale from 'date-fns/locale/es';

/* returns first day of current month */
export const getFirstDayOfThisMonth = (onISO) => {
    const now = new Date();
    const firstDayOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
    if(onISO) return formatISO(firstDayOfThisMonth) 
    return firstDayOfThisMonth
}

/* Returns first day of the year and month */
export const getFirstDayOfMonth = (year, month, onISO) => {
    if(onISO) return formatISO(new Date(year, month, 1, 0, 0, 0))
    return new Date(year, month, 1, 0, 0, 0);
};

/* Returns true if fristDate is after second date */
export const compareDate = (firstDate, secondDate) => {
    if(isEqual(firstDate, secondDate)) return false;
    return isAfter(firstDate, secondDate);
};

/* Returns true if two dates are equals */
export const DateEquals = (firstDate, secondDate) => isEqual(firstDate, secondDate);

/* Expects first Date as ISO string and second Date as Date object*/
/* Returns true if fristDate is after second date */
export const ISOEqualDate = (firstDate, secondDate) => isEqual(parseISO(firstDate), secondDate);

/* Returns ISO string from Date object */
export const getISOFromDate = (date) => formatISO(date);

/* Returns Date object from ISO string */
export const getDateFromISO = (date) => parseISO(date);

/* Returns name of Month from Date object or string*/
export const getNameMonthFromDate = (date, isISO) => {
    if(isISO) return format(parseISO(date),'MMMM',{locale: esLocale});
    else format(date,'MMMM',{locale: esLocale})
}