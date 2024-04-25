import moment from 'moment';
import dayjs from 'dayjs';

export const formatDate = (date: Date): string => {
  return dayjs(date).format('YYYY.MM.DD');
};

export function convertDayjsToMoment(dayjsObject: dayjs.Dayjs): moment.Moment {
  const formattedString = dayjsObject.format('YYYY-MM-DD');
  return moment(formattedString);
}