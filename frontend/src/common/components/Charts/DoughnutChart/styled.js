import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  .legend {
    margin-left: 7.5rem;
  }
`;

export const ChartWrapper = styled.div`
  width: 16.5rem;
  height: 20rem;

  .pie-chart {
    transform: rotateY(-180deg) rotateZ(-90deg);
  }
`;

export const DoughnutWraper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 16.5rem;
  min-height: 20rem;
`;
