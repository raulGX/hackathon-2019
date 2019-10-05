import styled from 'styled-components';

import { Tabs, Tab } from '@material-ui/core';

export const StyledTabs = styled(Tabs)`
  && {
    position: relative;
  }
`;

export const StyledTab = styled(Tab)`
  && {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${props => (props.selected ? '#8D77FF' : props.theme.palette.text.secondary)};
  }
`;
