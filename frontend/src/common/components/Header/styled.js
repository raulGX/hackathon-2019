import styled from 'styled-components';

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

export { StyledHeader };
