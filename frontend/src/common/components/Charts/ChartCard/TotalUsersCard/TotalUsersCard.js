import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

import { useTranslation } from 'react-i18next';

import ChartCard from 'components/Charts/ChartCard';

import {
  getTotalUsersAttendedCardData,
  getTotalUsersAttendedCount
} from 'model/selectors/analytics';

function TotalUsersCard({ theme, isLoading, data, totalCount }) {
  const { t } = useTranslation();

  return (
    <ChartCard
      title={t('common.usersAttended')}
      isLoading={isLoading}
      totalCount={totalCount}
      chartProps={{
        data,
        color: theme.palette.common.white,
        dotStroke: theme.palette.background.main
      }}
    />
  );
}

TotalUsersCard.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  totalCount: PropTypes.number
};

export default connect(state => ({
  data: getTotalUsersAttendedCardData(state),
  totalCount: getTotalUsersAttendedCount(state),
  isLoading: state.analytics.isLoading
}))(withTheme(TotalUsersCard));
