import styled from 'styled-components';
import { headerHeight } from 'common/styles/variables';

export const ErrorWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.page {
    height: calc(100vh - ${headerHeight}rem);
  }

  &.horizontal {
    flex-direction: row;

    .button {
      margin-left: 0.5rem;
    }
  }

  .icon {
    margin: ${props => props.theme.spacing(0.05)}rem;
    font-size: 2.5rem;
    color: ${props => props.theme.palette.error.main};
  }

  .text {
    color: ${({ theme }) => theme.palette.text.primary60};
  }

  .button {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.palette.text.primary60};
    background-color: ${({ theme }) => theme.palette.border.dark};
  }

  details {
    white-space: pre-wrap;
  }
`;
