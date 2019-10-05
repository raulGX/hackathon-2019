import styled from 'styled-components';
import { menuWidth } from '../../../styles/variables';

export const StyledPage = styled.div`
  width: calc(100% - ${menuWidth});
  background-color: ${({ theme }) => theme.palette.background.dark};
  flex-grow: 1;
`;
