import styled from 'styled-components';

const StyledMatDropdownWrapper = styled.div`
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 16px;
  outline: none;
  position: absolute;
  transition: opacity 281ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 187ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: scale(0.6) translateZ(0px);
  opacity: 0;
  transform-origin: top right;
  border-radius: ${props => props.theme.shape.borderRadius / 10}rem;
`;

export default StyledMatDropdownWrapper;
