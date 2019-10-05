import styled from 'styled-components';
import { Divider } from '@material-ui/core';

import { headerHeight } from '../../styles/variables';

const StyledHeader = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.dark};
  height: ${headerHeight - 0.1}rem;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: 2.4rem;

  & > .title {
    flex: 1;
  }
`;

const VerticalDivider = styled.div`
  height: 1.6rem;
  width: 1px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  margin-right: 2.8rem;
`;

const StyledDivider = styled(Divider)`
  && {
    margin: 0 2.4rem;
  }
`;

const ActionBarItem = styled.div`
  height: 2.4rem;
  min-width: 2.4rem;
  margin-right: 2.8rem;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.text.primary60};

  &:hover {
    color: ${({ theme }) => theme.palette.common.white};
  }

  &:last-child {
    margin-right: 0;
  }
`;

export { StyledHeader, VerticalDivider, ActionBarItem, StyledDivider };
