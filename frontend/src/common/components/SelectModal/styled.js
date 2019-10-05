import styled from 'styled-components';

import { Modal, Paper, List } from '@material-ui/core';
import { CenteredBox } from 'common/styles/mixins';

export const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    margin-right: 1rem;
    visibility: hidden;
    font-size: 1.5rem;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.action.hover};

    svg {
      visibility: visible;
    }
  }
`;

export const StyledModal = styled(Modal)`
  && {
    ${CenteredBox};
    background-color: ${({ theme }) => theme.palette.background.overlay};
  }
`;

export const StyledPaper = styled(Paper)`
  && {
    display: flex;
    flex-direction: column;
    height: 80%;
    min-width: 50rem;
    padding: 2rem;
  }
`;

export const StyledList = styled(List)`
  && {
    overflow-y: scroll;
    padding-right: 1.6rem;
  }

  & > .list-item {
    display: flex;
    align-items: flex-start;
    border-color: ${props => props.theme.palette.border.light};

    &.selected {
      background-color: ${({ theme }) => theme.palette.popup.main};
    }
  }
`;

export const Head = styled.div`
  padding-right: 1.6rem;

  > h5 {
    padding-left: 1rem;
  }

  > div {
    margin-bottom: 2rem;
    margin-left: 0;
    margin-top: 2rem;
  }
`;
