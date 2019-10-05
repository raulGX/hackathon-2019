import styled from 'styled-components';
import { Card } from '@material-ui/core';

import { CenteredBox } from 'common/styles/mixins';

export const StyledCard = styled(Card)`
  && {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.palette.background.main};
    color: ${({ theme }) => theme.palette.text.primary60};
    height: 20rem;
    flex-grow: 1;
    flex-basis: 33%;
    margin-left: 2.4rem;
    padding: 2.4rem 1.6rem;

    &:first-child {
      margin-left: 0;
    }
  }

  .title {
    color: ${({ theme }) => theme.palette.text.primary60};
    flex: 1;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 2.4rem;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${CenteredBox};
  align-items: flex-end;
`;
