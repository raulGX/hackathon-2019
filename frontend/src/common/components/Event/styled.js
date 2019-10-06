import styled from 'styled-components';

export const StyledEvent = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  .date {
    font-size: 12px;
    font-weight: bold;
  }

  .name {
    font-size: 18px;
    font-weight: bold;
    color: #353b54;
  }

  .place {
    font-size: 14px;
  }

  &.joined button {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #fff;
  }
`;
