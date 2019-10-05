import styled from 'styled-components';

export const MapWrapper = styled.div`
  margin: 0 auto;
  height: 100%;
`;

export const Navigation = styled.div`
  position: absolute;
  top: 4.2rem;
  left: 0;
  padding: 1rem;

  .mapboxgl-ctrl-group {
    background-color: #191919;

    button {
      filter: invert(100%);
    }
  }
`;
