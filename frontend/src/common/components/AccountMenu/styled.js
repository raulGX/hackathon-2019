import styled from 'styled-components';

import { List, Divider, Popover } from '@material-ui/core';

const AccountMenuWrapper = styled.div`
  & > .ui-active {
    color: ${({ theme }) => theme.palette.common.white};
  }

  .popover {
    margin-top: 0.5rem;
  }
`;

export const StyledPopover = styled(Popover)`
  margin-top: 0.5rem;
`;

const StyledList = styled(List)`
  && {
    background-color: ${({ theme }) => theme.palette.popup.main};
    width: 28rem;
  }

  & > .list-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledDivider = styled(Divider)`
  && {
    background-color: ${({ theme }) => theme.palette.text.primary50};
    margin: 0 1rem;
    margin-bottom: 0.8rem;
  }
`;

export { AccountMenuWrapper, StyledList, StyledDivider };
