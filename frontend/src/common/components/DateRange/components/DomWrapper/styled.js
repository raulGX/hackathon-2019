import styled from 'styled-components';

const StyledDomWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1300;
  position: fixed;

  .overlay {
    opacity: 1;
    will-change: opacity;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    position: fixed;
    touch-action: none;
  }

  &.display {
    .mat-dropdown-wrapper {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default StyledDomWrapper;
