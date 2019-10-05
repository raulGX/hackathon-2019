import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
// import Fullscreen from '@material-ui/icons/Fullscreen';

import AreaSpline from 'components/Charts/AreaSpline';
import Loader from 'components/Loader';
import ErrorBoundary from 'components/ErrorBoundary';
import { StyledCard, ChartWrapper, StyledHeader } from './styled';

export default function ChartCard({ chartProps, title, isLoading, totalCount }) {
  const { t } = useTranslation();
  const cardTitle =
    totalCount >= 0 && !isLoading
      ? `${title} (${t('common.Total', { count: totalCount })})`
      : title;

  // const [isVisible, setIconDisplay] = useState(false);

  // function toggleIconDisplay(value) {
  //   setIconDisplay(value);
  // }

  return (
    <StyledCard>
      {/* onMouseEnter={() => toggleIconDisplay(true)} */}
      {/* onMouseLeave={() => toggleIconDisplay(false)} */}
      <ErrorBoundary>
        <StyledHeader>
          <Typography className="title" variant="subtitle1">
            {cardTitle}
          </Typography>
          {/* {isVisible && <Fullscreen />} */}
        </StyledHeader>
        <Loader isLoading={isLoading}>
          <ChartWrapper>
            <AreaSpline {...chartProps} />
          </ChartWrapper>
        </Loader>
      </ErrorBoundary>
    </StyledCard>
  );
}

ChartCard.propTypes = {
  chartProps: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  totalCount: PropTypes.number
};
