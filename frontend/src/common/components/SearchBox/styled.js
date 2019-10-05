import styled from 'styled-components';

import { VerticalCenteredBox } from 'common/styles/mixins';

export const StyledInput = styled.div`
  ${VerticalCenteredBox}
  margin-left: ${({ theme }) => theme.spacing(0.1)}rem;
  position: relative;
  padding: 0.4rem 2.2rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius / 10}rem;

  transition: background-color ${({ theme }) => theme.transitions.duration.standard}ms,
    box-shadow ${({ theme }) => theme.transitions.duration.standard}ms
      ${({ theme }) => theme.transitions.easing.easeInOut};

  .search-icon {
    position: absolute;
    left: 1.2rem;

    fill: ${({ theme }) => theme.palette.text.primary54};
  }

  .close-icon {
    fill: ${({ theme }) => theme.palette.text.primary38};
    position: absolute;
    right: 1rem;
    width: 2rem;
    cursor: pointer;
  }

  input {
    padding-left: 3.2rem;
    padding-right: 2rem;
    min-width: 24.8rem;
    font-size: 1.4rem;
  }

  &.filled,
  &.focused {
    background-color: ${({ theme }) => theme.palette.background.dark};
    box-shadow: ${({ theme }) => theme.shadows[1]};
  }
`;
