import styled from 'styled-components';

export const StyledTrigger = styled.div`
  .badge span {
    top: 0.8rem;
    right: 0.8rem;
  }

  .icon {
    color: ${({ theme }) => theme.palette.text.primary60};

    &.ui-active,
    &:hover {
      color: ${({ theme }) => theme.palette.common.white};
    }
  }
`;
