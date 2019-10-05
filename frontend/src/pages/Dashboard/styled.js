import styled from 'styled-components';

export const Widgets = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.6rem 1.6rem;
  padding: 0 2.4rem;
`;

export const Status = styled.p`
  opacity: 0.87;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 3.5rem 2.4rem;

  strong {
    text-decoration: underline;
    font-size: 24px;
  }
`;
