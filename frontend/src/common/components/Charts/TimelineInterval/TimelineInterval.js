import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { Typography } from '@material-ui/core';

import { StyledTimelineInterval } from './styled';

export default function TimelineInterval({ startDate, endDate, ongoing, format, height }) {
  const { t } = useTranslation();
  const NOW = t('common.Now');

  return (
    <StyledTimelineInterval height={height}>
      <Typography className="time" variant="caption">
        {moment(startDate).format(format)}
      </Typography>
      <Typography className="time" variant="caption">
        {ongoing ? NOW : moment(endDate).format(format)}
      </Typography>
    </StyledTimelineInterval>
  );
}

TimelineInterval.defaultProps = {
  format: 'hh:mm:ssa',
  ongoing: false
};

TimelineInterval.propTypes = {
  startDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  format: PropTypes.string,
  ongoing: PropTypes.bool,
  height: PropTypes.string
};
