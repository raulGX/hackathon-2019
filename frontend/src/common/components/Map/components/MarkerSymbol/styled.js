import styled from 'styled-components';
import { Marker } from 'react-map-gl';
import { Typography } from '@material-ui/core';

export const StyledUserName = styled(Typography)`
  position: absolute;
  left: 2rem;
  top: 0;

  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => `${theme.shape.borderRadius}px`};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);

  padding: 0.5rem 1rem;
  display: none;
`;

export const StyledMarker = styled(Marker)`
  &:hover ${StyledUserName} {
    display: block;
  }
`;
