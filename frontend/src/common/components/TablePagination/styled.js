import styled from 'styled-components';

export const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${props => props.rows * 5.5}rem;
`;
