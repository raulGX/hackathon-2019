import React, { lazy, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import { changeDateRange } from 'model/actions/dateRange';
import { getMomentDateRange } from 'model/selectors/dateRange';

import ErrorBoundary from 'components/ErrorBoundary';
import SuspenseLoading from 'containers/SuspenseLoading';
import AccountMenu from '../AccountMenu';

import { StyledHeader, VerticalDivider, ActionBarItem, StyledDivider } from './styled';

const DateRange = lazy(() => import(/* webpackChunkName: "DateRange" */ 'components/DateRange'));

function Header({ pageName }) {
  const dispatch = useDispatch();
  const dateRange = useSelector(getMomentDateRange);

  const onDateRangeChangeHandler = useCallback(
    (startDate, endDate) => {
      dispatch(changeDateRange(startDate, endDate));
    },
    [dispatch]
  );

  return (
    <>
      <StyledHeader>
        <Typography className="title" variant="h5">
          {pageName}
        </Typography>

        <ActionBarItem>
          <ErrorBoundary className="horizontal">
            <SuspenseLoading small>
              <DateRange range={dateRange} onDateRangeChangeEvent={onDateRangeChangeHandler} />
            </SuspenseLoading>
          </ErrorBoundary>
        </ActionBarItem>

        <VerticalDivider />

        <ActionBarItem>
          <ErrorBoundary className="horizontal">
            <AccountMenu />
          </ErrorBoundary>
        </ActionBarItem>
      </StyledHeader>
      <StyledDivider />
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired
};

export default Header;
