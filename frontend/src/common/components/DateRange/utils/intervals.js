import moment from 'moment';

export const options = [
  {
    id: 'last24Hours',
    name: 'calendar.last24Hours'
  },
  {
    id: 'last15Days',
    name: 'calendar.last15Days'
  },
  {
    id: 'last30Days',
    name: 'calendar.last30Days'
  },
  {
    id: 'customRange',
    name: 'calendar.customRange'
  }
];

export const last24Hours = () => ({
  startDate: moment().subtract('1', 'days'),
  endDate: moment()
});

export const last15Days = () => ({
  startDate: moment()
    .subtract('15', 'days')
    .startOf('day'),
  endDate: moment().endOf('day')
});

export const last30Days = () => ({
  startDate: moment()
    .subtract('30', 'days')
    .startOf('day'),
  endDate: moment().endOf('day')
});

export const emptyInterval = () => ({
  startDate: null,
  endDate: null
});
