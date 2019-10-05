import React from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

import { useTranslation } from 'react-i18next';

import ChartCard from 'components/Charts/ChartCard';

import {
  getTotalAttendedMeetingsCardData,
  getTotalAttendedMeetingsCount
} from 'model/selectors/analytics';

function TotalMeetingsCard({ theme }) {
  const data = useSelector(getTotalAttendedMeetingsCardData);
  const isLoading = useSelector(state => state.analytics.isLoading);
  const totalCount = useSelector(getTotalAttendedMeetingsCount);
  const { t } = useTranslation();

  return (
    <ChartCard
      title={t('common.meetingsAttended')}
      isLoading={isLoading}
      totalCount={totalCount}
      chartProps={{
        data,
        color: theme.palette.primary.main,
        dotStroke: theme.palette.background.main
      }}
    />
  );
}

TotalMeetingsCard.propTypes = {
  theme: PropTypes.object.isRequired
};

export default withTheme(TotalMeetingsCard);
