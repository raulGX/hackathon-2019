import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
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
