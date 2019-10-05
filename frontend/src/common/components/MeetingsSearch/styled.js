import styled from 'styled-components';
import { Paper } from '@material-ui/core';

import { VerticalCenteredBox } from 'common/styles/mixins';

export const StyledPaper = styled(Paper)`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;

  top: 100%;

  max-height: 25rem;
  overflow-y: auto;

  .meeting-bullet {
    position: absolute;
    left: 2rem;
    top: 1.1rem;
  }

  .no-suggestions {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.palette.text.primary38};
  }
`;

export const StyledInput = styled.div`
  ${VerticalCenteredBox}
  position: relative;
  padding: 0.4rem 2.2rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius / 10}rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[1]};

  .search-icon {
    position: absolute;
    left: 1.2rem;

    fill: ${({ theme }) => theme.palette.text.primary54};
  }

  .close-icon {
    fill: ${({ theme }) => theme.palette.text.primary38};
    position: absolute;
    right: 1rem;
    width: 2rem;
    cursor: pointer;
  }

  input {
    padding-left: 3.2rem;
    padding-right: 2rem;
    min-width: 24.8rem;
    font-size: 1.4rem;
  }

  &.filled,
  &.focused {
    .icon {
      fill: ${({ theme }) => theme.palette.common.white};
    }
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .icon {
    margin-right: ${({ theme }) => theme.spacing(1 / 16)}rem;
    fill: white;
  }

  .chip {
    margin-right: ${({ theme }) => theme.spacing(1 / 8)}rem;
  }

  .autocomplete-wrapper {
    display: flex;
    position: relative;

    &.opened {
      ${StyledInput} {
        border-radius: 0;
        border-bottom: solid 1px ${({ theme }) => theme.palette.border.dark};
      }
    }
  }
`;
