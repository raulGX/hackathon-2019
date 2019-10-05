import styled from 'styled-components';
import { CenteredBox } from 'common/styles/mixins';

export const StyledTooltip = styled.div`
  ${CenteredBox};
  width: 8.8rem;
  height: 2.4rem;
  ${props => (props.centeredTooltip ? 'transform: translateX(-50%);' : '')};
  background-color: ${({ theme }) => theme.palette.background.main};
  border-radius: ${({ theme }) => theme.shape.borderRadius / 10}rem;

  .tooltip--text {
    color: ${({ theme }) => theme.palette.text.primary60};
  }
`;
