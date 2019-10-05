import styled from 'styled-components';

import { BottomNavigation } from '@material-ui/core';

export const Navigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  && .MuiBottomNavigationAction-iconOnly,
  && .Mui-selected {
    padding: 41px 0;
  }

  .active {
    path {
      fill: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;
