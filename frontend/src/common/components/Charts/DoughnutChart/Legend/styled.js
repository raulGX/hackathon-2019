import styled from 'styled-components';

import { Column } from 'common/styles/shared';

export const LegendWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 6.6rem;
  grid-row-gap: 2rem;

  position: relative;

  ${Column} {
    position: relative;
  }
`;

export const Circle = styled.span`
  position: absolute;
  top: 0.3rem;
  left: -2.5rem;
  display: block;

  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: solid 2px ${({ color }) => color};
`;
