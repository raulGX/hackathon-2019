import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: 4.8rem 2.4rem 4rem 2.4rem;
  position: relative;
  z-index: 4;

  & > .title {
    flex: 1;
  }
`;

export const PageTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  margin: 0;
`;

export const Icons = styled.div`
  margin-left: auto;

  svg {
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
