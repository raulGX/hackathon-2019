import styled from 'styled-components';
import { ListItem } from '@material-ui/core';

export const StyledInterval = styled(ListItem)`
  && {
    height: 4.8rem;
    &.selected {
      background-color: ${props => props.theme.palette.popup.dark};
    }
    &:hover {
      background-color: ${props => props.theme.palette.popup.dark};
    }
  }
`;
