import styled, { keyframes } from 'styled-components';
import { fade } from '@material-ui/core/styles/colorManipulator';

const size = {
  small: '10px',
  medium: '15px',
  big: '20px'
};
const pulseAnimation = props => keyframes`
    0% {
      -webkit-box-shadow: 0 0 0 0 ${fade(props.color, 1)};
    }
    70% {
      -webkit-box-shadow: 0 0 0 ${size[props.size]} ${fade(props.color, 0)};
    }
    100% {
      -webkit-box-shadow: 0 0 0 0 ${fade(props.color, 0)};
    }
`;

export const StyledMeetingBullet = styled.svg`
  cursor: pointer;
  &.pulse {
    border-radius: 50% 50%;

    &.error {
      animation: ${props => pulseAnimation({ ...props, color: props.theme.palette.error.main })} 2s
        infinite;
    }
    animation: ${props => pulseAnimation({ ...props, color: props.theme.palette.primary.main })} 2s
      infinite;
  }

  text {
    fill: ${({ theme }) => theme.palette.common.white};
    font-size: 1rem;
  }
`;
