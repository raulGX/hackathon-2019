import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

const StyledIconButton = styled(IconButton)`
  && {
    ${props => {
      if (props.iconcolor === 'grey') {
        return `color: ${props.theme.palette.text.primary54}`;
      }

      return '';
    }}
  }
`;

export default StyledIconButton;
