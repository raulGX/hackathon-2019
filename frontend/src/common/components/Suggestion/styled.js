import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';

export const StyledSuggestion = styled(MenuItem)`
  && {
    color: ${({ theme }) => theme.palette.text.primary38};
    font-size: 1.4rem;
    height: 3.2rem;
    box-sizing: border-box;
    padding: 0.6rem 1rem 0 5.4rem;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;

    strong {
      color: ${({ theme }) => theme.palette.common.white};
    }

    &.selected,
    &:hover,
    &.selected:hover {
      background-color: ${({ theme }) => theme.palette.action.hover};
    }
  }
`;
