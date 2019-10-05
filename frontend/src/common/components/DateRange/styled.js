import { List, Button } from '@material-ui/core';

import styled from 'styled-components';

const StyledTrigger = styled.span`
  display: flex;
`;

const StyledDateRange = styled.div`
  .result {
    display: flex;
    align-items: center;

    &.active {
      color: ${props => props.theme.palette.primary.main};
    }

    .dates {
      margin-left: 1rem;
      margin-top: 0.3rem;
    }
  }
`;

const StyledDatepickerWrapper = styled.div`
  min-height: 29.4rem;
  display: flex;
`;

const OptionsWrapper = styled.div`
  background-color: ${props => props.theme.palette.popup.main};
`;

export const ResetBtn = styled(Button)`
  && {
    margin: 0.8rem 1.6rem 0 1.6rem;
    min-width: 7.2rem;
    letter-spacing: 1.25px;
    color: #8d77ff;
  }
`;

const StyledIntervals = styled(List)`
  && {
    width: 20rem;
    flex-grow: 1;
  }
`;

const StyledDatePicker = styled.div`
  background-color: ${props => props.theme.palette.popup.dark};
  color: white;

  .DayPicker__withBorder {
    box-shadow: none;
  }

  .CalendarDay_container {
    &,
    &:hover,
    &:active {
      border: 0 none;
      color: white;
    }
  }

  .DayPickerNavigation {
    .DayPickerNavigation_button:first-child {
      position: absolute;
      top: 0.9rem;
      left: 0.7rem;
    }
    .DayPickerNavigation_button:last-child {
      position: absolute;
      top: 0.9rem;
      right: 0.7rem;
    }
  }

  .DayPicker__horizontal,
  .DayPicker,
  .CalendarMonthGrid,
  .CalendarMonth,
  .CalendarDay_container,
  .CalendarDay_container:active,
  .CalendarDay_container:hover,
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    background: transparent;
  }

  .CalendarMonth_caption {
    color: white;
  }

  .CalendarDay__default,
  .CalendarDay__default:hover {
    box-sizing: border-box;
    background: transparent;
    border: none;
    color: white;
    height: 2rem;
    font-size: 1.2rem;
    font-weight: 400;
  }

  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    color: ${props => props.theme.palette.text.disabled};
  }

  .CalendarDay__default:not(.CalendarDay__selected):not(.CalendarDay__selected_span):not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__hovered_span):not(.CalendarDay__blocked_minimum_nights):hover {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      z-index: 1;
      top: 3px;
      left: 0;
      right: 0;
      bottom: 3px;
      background-color: ${props => props.theme.palette.secondary.light};
      color: white;
      border-radius: 1.6rem;
      opacity: 0.38;
    }

    .custom-day {
      position: relative;
      z-index: 2;
    }
  }

  .CalendarDay__selected_span,
  .CalendarDay__selected {
    position: relative;

    .custom-day {
      position: relative;
      z-index: 2;
    }

    &:not(.CalendarDay__selected_start).CalendarDay__lastDayOfWeek {
      &:before {
        border-radius: 0 1.6rem 1.6rem 0;
      }
    }

    &.CalendarDay__firstDayOfWeek:not(.CalendarDay__selected_start):not(.CalendarDay__selected_end) {
      &:before {
        border-radius: 1.6rem 0 0 1.6rem;
      }
    }

    &:before {
      content: '';
      position: absolute;
      z-index: 1;
      top: 3px;
      left: 0;
      right: 0;
      bottom: 3px;
      background: ${props => props.theme.palette.secondary.light};
      opacity: 0.54;
    }
  }

  .CalendarDay__selected_start {
    &:before {
      left: 0;
      border-radius: 1.6rem 0 0 1.6rem;
      opacity: 1;
    }
  }

  .CalendarDay__selected_end {
    &:before {
      border-radius: 0 1.6rem 1.6rem 0;
      opacity: 1;
    }
  }

  .CalendarDay__selected.CalendarDay__selected_start.CalendarDay__selected_end,
  .CalendarDay__selected_start.CalendarDay__selected_end {
    &:before {
      border-radius: 1.6rem;
    }
    &:after {
      display: none;
    }
  }

  .CalendarDay__selected.CalendarDay__selected_end {
    &.CalendarDay__firstDayOfWeek {
      &:after {
        display: none;
      }
      &:before {
        border-radius: 1.6rem;
      }
    }
    &:before {
      border-radius: 0 1.6rem 1.6rem 0;
      opacity: 1;
    }
    &:after {
      content: '';
      position: absolute;
      z-index: 1;
      top: 3px;
      left: 0;
      right: 30%;
      bottom: 3px;
      background: ${props => props.theme.palette.secondary.light};
      opacity: 0.54;
    }
  }

  .CalendarDay__outside {
    color: ${props => props.theme.palette.text.disabled};
    pointer-events: none;
  }

  .CalendarDay__hovered_span {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      z-index: 1;
      top: 3px;
      right: 0;
      left: 0;
      bottom: 3px;
      background-color: ${props => props.theme.palette.secondary.light};
      opacity: 0.38;
    }

    &.CalendarDay__lastDayOfWeek {
      &:before {
        border-right: solid 1px ${props => props.theme.palette.secondary.light};
        border-radius: 0 1.6rem 1.6rem 0;
      }
    }
    &.CalendarDay__firstDayOfWeek {
      &:before {
        border-left: solid 1px ${props => props.theme.palette.secondary.light};
        border-radius: 1.6rem 0 0 1.6rem;
      }
    }

    &:hover {
      &:before {
        border-right: solid 1px ${props => props.theme.palette.secondary.light};
        border-radius: 0 1.6rem 1.6rem 0;
      }
    }
  }

  .DayPicker_weekHeader_ul {
    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: ${props => props.theme.palette.divider};
      display: block;
      margin: 0.6rem 0;
    }
  }

  .DayPicker_weekHeader_li {
    color: white;
    font-size: 1.2rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
  }

  .CalendarMonth_table {
    margin-top: 1rem;
  }

  .DayPickerNavigation_button__horizontal {
    background: transparent;
    border: 0 none;
    padding: 0;
    top: 20px;

    path {
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

export default {
  StyledDatepickerWrapper,
  StyledIntervals,
  StyledTrigger,
  StyledDateRange,
  StyledDatePicker,
  OptionsWrapper,
  ResetBtn
};
