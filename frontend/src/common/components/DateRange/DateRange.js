import React, { useState, useEffect, useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import { DayPickerRangeController } from 'react-dates';
import { Typography, IconButton } from '@material-ui/core';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

import { Calendar } from 'common/components/Icons';
import reducer from './utils/reducer';
import MatDropdownWrapperHelper from './components/DropdownWrapper';
import Interval from './components/Interval';
import * as intervals from './utils/intervals';
import { parseCalendarDates, getResultDate } from './utils/index';
import Styles from './styled';

import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

const initialState = {
  isDropdownOpened: false,
  mode: null,
  prevMode: null,
  internalRange: { startDate: null, endDate: null },
  prevInternalRange: { startDate: null, endDate: null }
};

function DateRange({ maxStartDate, maxEndDate, range, onDateRangeChangeEvent }) {
  const { t } = useTranslation();
  const triggerRef = useRef(null);
  const matDropdownWrapperHelperRef = useRef(null);
  const [focusedInput, setFocusedInput] = useState('startDate');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { internalRange, mode, isDropdownOpened } = state;

  useEffect(() => {
    matDropdownWrapperHelperRef.current && matDropdownWrapperHelperRef.current.setStyle();
  }, [mode]);

  useEffect(() => {
    if (
      (range.startDate === internalRange.startDate && range.endDate === internalRange.endDate) ||
      (range.startDate.isSame(internalRange.startDate) &&
        range.endDate.isSame(internalRange.endDate))
    ) {
      return;
    }
    dispatch({ type: 'SYNC_RANGE', range });
  }, [range]);

  const onToggleDropdown = () => {
    dispatch({ type: 'TOGGLE_DROPDOWN', range });
    setFocusedInput('startDate');
  };

  const onDatesRangeChangeHandler = dates => {
    const nextRange = parseCalendarDates(dates);

    if (!internalRange.endDate && !nextRange.endDate) {
      dispatch({ type: 'UPDATE_INTERNAL_RANGE', range: nextRange });
      return;
    }

    if (focusedInput === 'startDate') {
      if (!nextRange.endDate || nextRange.endDate.isSame(internalRange.endDate)) {
        nextRange.endDate = null;
      }
      dispatch({ type: 'UPDATE_INTERNAL_RANGE', range: nextRange });
      return;
    }

    if (!nextRange.endDate) {
      nextRange.endDate = moment.unix(internalRange.endDate.unix());
      dispatch({ type: 'UPDATE_INTERNAL_RANGE', range: nextRange });
      return;
    }

    dispatch({ type: 'APPLY_RANGE', range: nextRange });
    onDateRangeChangeEvent(nextRange.startDate, nextRange.endDate);
    setFocusedInput('startDate');
  };

  const isOutsideRangeHandler = day => {
    if (maxStartDate && day.isBefore(maxStartDate, 'day')) {
      return true;
    }

    return maxEndDate && day.isAfter(maxEndDate, 'day');
  };

  const onFocusChangeHandler = input => {
    setFocusedInput(input || 'startDate');
  };

  const updateMode = newMode => {
    if (newMode === mode) {
      return;
    }

    if (newMode === 'customRange') {
      dispatch({ type: 'SELECT_CUSTOM_RANGE_MODE' });
      return;
    }

    let newRange;
    if (intervals[newMode]) {
      newRange = intervals[newMode]();
    } else {
      newRange = intervals.emptyInterval();
    }

    dispatch({ type: 'SELECT_DEFAULT_MODE', range: newRange, mode: newMode });
    onDateRangeChangeEvent(newRange.startDate, newRange.endDate);
  };

  const reset = () => {
    const newRange = intervals.emptyInterval();
    dispatch({ type: 'RESET', range: newRange });
    setFocusedInput('startDate');
    onDateRangeChangeEvent(newRange.startDate, newRange.endDate);
  };

  const renderDayContents = day => <span className="custom-day">{day.format('D')}</span>;

  function renderIntervals() {
    return intervals.options.map(interval => (
      <Interval
        key={interval.id}
        onClick={updateMode}
        interval={interval}
        selected={state.mode === interval.id}
      />
    ));
  }

  return (
    <Styles.StyledDateRange className="mat-date-range">
      <Styles.StyledTrigger
        className={
          internalRange.startDate || internalRange.endDate || isDropdownOpened
            ? 'result active'
            : 'result'
        }
        onClick={onToggleDropdown}
        ref={triggerRef}
        disableRipple
      >
        <Calendar />
        <Typography className="dates" variant="caption">
          {getResultDate(range, mode, t, isDropdownOpened)}
        </Typography>
      </Styles.StyledTrigger>
      {isDropdownOpened && (
        <MatDropdownWrapperHelper
          ref={matDropdownWrapperHelperRef}
          onClose={onToggleDropdown}
          triggerElement={triggerRef.current}
        >
          <Styles.StyledDatepickerWrapper>
            <Styles.OptionsWrapper>
              <Styles.StyledIntervals>{renderIntervals()}</Styles.StyledIntervals>
              <Styles.ResetBtn onClick={reset}>{t('common.reset')}</Styles.ResetBtn>
            </Styles.OptionsWrapper>
            {mode === 'customRange' && (
              <Styles.StyledDatePicker>
                <DayPickerRangeController
                  enableOutsideDays
                  minimumNights={0}
                  startDate={internalRange.startDate}
                  endDate={internalRange.endDate}
                  onDatesChange={onDatesRangeChangeHandler}
                  isOutsideRange={isOutsideRangeHandler}
                  focusedInput={focusedInput}
                  onFocusChange={onFocusChangeHandler}
                  renderDayContents={renderDayContents}
                  navPrev={
                    <IconButton>
                      <NavigateBefore />
                    </IconButton>
                  }
                  navNext={
                    <IconButton>
                      <NavigateNext />
                    </IconButton>
                  }
                  hideKeyboardShortcutsPanel
                />
              </Styles.StyledDatePicker>
            )}
          </Styles.StyledDatepickerWrapper>
        </MatDropdownWrapperHelper>
      )}
    </Styles.StyledDateRange>
  );
}

DateRange.propTypes = {
  maxStartDate: momentPropTypes.momentObj,
  maxEndDate: momentPropTypes.momentObj,
  range: PropTypes.shape({
    startDate: momentPropTypes.momentObj,
    endDate: momentPropTypes.momentObj
  }),
  onDateRangeChangeEvent: PropTypes.func
};

DateRange.defaultProps = {
  maxEndDate: moment()
};

export default DateRange;
