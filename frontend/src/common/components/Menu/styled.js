import styled from 'styled-components';

import { BottomNavigation } from '@material-ui/core';

export const Navigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);

  && .MuiBottomNavigationAction-iconOnly,
  && .Mui-selected {
    padding-top: 0;
  }
`;
