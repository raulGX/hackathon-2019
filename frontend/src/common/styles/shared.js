import styled from 'styled-components';

export const Row = styled.div`
  display: flex;

  ${props => (props.fluid ? 'width: 100%' : '')};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${props => (props.fluid ? 'width: 100%' : '')};
`;

export const PushRight = styled.div`
  margin-left: auto;
  ${({ noWrap }) => noWrap && 'white-space: nowrap'}
`;
