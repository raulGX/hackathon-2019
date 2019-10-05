import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

import { useTranslation } from 'react-i18next';

import ChartCard from 'components/Charts/ChartCard';

import { faultyData } from './backend/mock-data';

function FaultyMeetingsCard({ theme, isLoading }) {
  const { t } = useTranslation();

  return (
    <ChartCard
      title={t('common.faultyMeetings')}
      isLoading={isLoading}
      chartProps={{
        data: faultyData,
        color: theme.palette.error.main,
        dotStroke: theme.palette.background.main
      }}
    />
  );
}

FaultyMeetingsCard.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool
};

export default connect(state => ({
  isLoading: state.meetings.isLoading
}))(withTheme(FaultyMeetingsCard));
