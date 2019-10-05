import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

const StyledPerfectScrollbar = styled(PerfectScrollbar)`
  && {
    .ps__rail-x,
    .ps__rail-y {
      border-radius: 0.6rem;
      width: 0.8rem;

      &:hover,
      &:focus,
      &.ps--clicking {
        background-color: transparent;
      }

      & > .ps__thumb-x,
      & > .ps__thumb-y {
        right: 0;
        border-radius: 0.6rem;
        width: 0.8rem;
      }
    }
  }
`;

export default StyledPerfectScrollbar;
