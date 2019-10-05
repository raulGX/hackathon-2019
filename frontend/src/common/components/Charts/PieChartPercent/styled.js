import styled from 'styled-components';
import { CenteredBox } from 'common/styles/mixins';

export const ChartContainer = styled.div`
  position: relative;
  ${CenteredBox};
  width: 100%;
  height: 100%;
  min-width: 15rem;
  min-height: 15rem;

  & > .label {
    position: absolute;
  }

  .pie-chart {
    transform: rotateY(-180deg) rotateX(0deg) rotateZ(-90deg);
  }
`;
