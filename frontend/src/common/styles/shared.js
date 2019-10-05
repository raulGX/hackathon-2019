import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Row = styled.div`
  display: flex;

  ${props => (props.fluid ? 'width: 100%' : '')};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${props => (props.fluid ? 'width: 100%' : '')};
`;

export const StyledTypography = styled(Typography)`
  && {
    ${props => (props.error ? `color: ${props.theme.palette.error.main}` : '')}
    ${props => (props.warning ? `color: ${props.theme.palette.warning.main}` : '')}
    ${props => (props.grey ? `color: ${props.theme.palette.text.primary60}` : '')}
    ${props => (props.disabled ? `color: ${props.theme.palette.text.primary54}` : '')}
    ${props => {
      if (props.ellipsis) {
        return `
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `;
      }

      return '';
    }}
  }
`;

export const PushRight = styled.div`
  margin-left: auto;
  ${({ noWrap }) => noWrap && 'white-space: nowrap'}
`;
