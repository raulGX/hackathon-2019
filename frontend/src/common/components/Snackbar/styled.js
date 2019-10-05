import styled from 'styled-components';

export const SnackBarWrapper = styled.div`
  height: 100%;

  & .variantError {
    background-color: ${({ theme }) => theme.palette.error.main};
  }
`;
