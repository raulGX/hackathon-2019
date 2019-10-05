import moment from 'moment';

export function parseCalendarDates({ startDate, endDate }) {
  startDate = startDate ? moment(startDate) : null;
  endDate = endDate ? moment(endDate) : null;

  startDate && startDate.startOf('day');
  endDate && endDate.endOf('day');
  return { startDate, endDate };
}

export function getResultDate(range, mode, t, isDropdownOpened) {
  const { endDate, startDate } = range;

  if (!mode) {
    return t('calendar.last7Days');
  }
  if (mode === 'last24Hours') {
    return t('calendar.last24Hours');
  }

  let formattedStartDate = t('common.startDate');
  let formattedEndDate = t('common.endDate');

  if (startDate) {
    formattedStartDate = startDate.format('MMM D');
  }
  if (endDate) {
    formattedEndDate = endDate.format('MMM D');
  }

  if (!startDate && !endDate && !isDropdownOpened) return '';

  if (formattedStartDate === formattedEndDate) {
    return formattedStartDate;
  }

  return `${formattedStartDate} → ${formattedEndDate}`;
}
