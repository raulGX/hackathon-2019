import styled from 'styled-components';
import { Popup } from 'react-map-gl';
import { Typography, List, ListItem } from '@material-ui/core';
import Scrollbar from 'containers/Scrollbar';

export const StyledPopup = styled(Popup)`
  border-radius: ${({ theme }) => `${theme.shape.borderRadius}px`};
  cursor: default;

  .mapboxgl-popup-content {
    background-color: ${({ theme }) => theme.palette.background.paper};
    max-width: 30rem;
    min-width: 17rem;
    padding: 0;
  }

  .mapboxgl-popup-close-button {
    font-size: 2.5rem;

    color: ${({ theme }) => theme.palette.text.primary60};
    transition: color
      ${({ theme }) =>
        `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`};

    &:hover {
      color: white;
      background: transparent;
    }
  }

  .id {
    margin-right: 1rem;
  }

  .title {
    max-width: 20rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .bullet {
    margin-right: 1rem;
    margin-top: -0.3rem;
  }

  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export const Header = styled(Typography)`
  && {
    padding: 1rem 0 0rem 1.6rem;
    color: ${({ theme }) => theme.palette.text.primary60};
  }
`;

export const StyledListItem = styled(ListItem)``;

export const StyledList = styled(List)`
  max-height: 15rem;

  &.ongoing {
    ${StyledListItem} {
      &.finished {
        padding-left: 3.8rem;
      }
    }
  }
`;

export const StyledScrollbar = styled(Scrollbar)`
  .ps__rail-y {
    transform: translateX(-10px);
  }
`;
