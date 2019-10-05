import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const ColumnHeader = styled(Typography)`
  && {
    color: ${props => props.theme.palette.text.primary60};
    font-weight: 500;
    letter-spacing: 0.01rem;
    line-height: 3rem;
    height: 4rem;
  }
`;

export default ColumnHeader;
