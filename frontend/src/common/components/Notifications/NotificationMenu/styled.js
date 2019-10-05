import styled from 'styled-components';
import { Popover } from '@material-ui/core';

export { StyledMenu, StyledPopover, NotificationList };

const StyledPopover = styled(Popover)`
  /* Override Material UI's Popover style */
  & > div:last-child {
    margin-top: 0.5rem;
    background-color: ${({ theme }) => theme.palette.popup.main};
  }
`;

const StyledMenu = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 39.5rem;
  padding: 0.8rem 0;

  .button-label {
    color: ${({ theme }) => theme.palette.primary.main};
    margin-left: 4rem;
    width: 10.7rem;
    height: 3.6rem;
  }
`;

const NotificationList = styled.div`
  flex-grow: 1;
  margin: 1rem 0;
`;
