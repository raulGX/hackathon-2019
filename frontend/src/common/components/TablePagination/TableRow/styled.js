import styled from 'styled-components';

import { ExpansionPanel } from '@material-ui/core';

export const StyledListItem = styled(ExpansionPanel)`
  && {
    border-bottom: solid 1px ${props => props.theme.palette.border.light};
    box-shadow: none;

    &:before {
      display: none;
    }

    .list-summary {
      & > div {
        /* Reset material's element margin */
        margin: 0;
      }
    }

    &.expanded {
      background-color: ${props => props.theme.palette.background.dark};
      margin: 0;

      .list-summary {
        border-bottom: solid 1px ${props => props.theme.palette.border.light};
      }
    }

    &.expansion-disabled {
      & > .list-summary {
        cursor: auto;
        user-select: auto;
      }
    }

    .list-summary {
      min-height: 5.5rem;
    }
  }
`;
