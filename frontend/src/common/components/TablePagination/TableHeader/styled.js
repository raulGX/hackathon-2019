import styled from 'styled-components';
import { ExpansionPanel } from '@material-ui/core';

export const StyledListHeader = styled(ExpansionPanel)`
  && {
    background-color: transparent;
    box-shadow: none;
    border-bottom: solid 1px ${props => props.theme.palette.border.dark};
    cursor: default;

    &:before {
      display: none;
    }

    .summary {
      cursor: default;
      opacity: 1;
      min-height: 5.6rem;
    }
  }

  .text {
    font-weight: 500;
    color: ${props => props.theme.palette.text.primary60};
    letter-spacing: 0.01rem;
    line-height: 4rem;
  }
`;
