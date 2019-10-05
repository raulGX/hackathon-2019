import styled from 'styled-components';

export const StyledValue = styled.div`
  color: ${({ theme }) => theme.palette.text.primary60};
  font-size: 3.4rem;
  min-width: 10rem;
`;

export const ContainerWrapper = styled.div`
  width: calc(100% - 10rem);
  height: 100%;

  .clickableDot {
    &:hover {
      cursor: pointer;
    }
  }
`;
