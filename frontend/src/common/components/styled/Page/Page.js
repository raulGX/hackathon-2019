import styled from 'styled-components';
import { menuWidth } from '../../../styles/variables';

export const StyledPage = styled.div`
  width: calc(100% - ${menuWidth});
  flex-grow: 1;
`;
