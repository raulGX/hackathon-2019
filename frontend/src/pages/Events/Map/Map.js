import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import PinIcon from 'assets/icons/pin.svg';
import { StyledMap } from './styled';
import events from './mocks';

export default function Map() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 47.1688196,
    longitude: 27.5772593,
    zoom: 13
  });
  return (
    <StyledMap>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken="pk.eyJ1IjoiY2NyaXN0aWMiLCJhIjoiY2o3Ymo2bzliMGxqcjMzbnpzYnExZHV0NSJ9.d74jQikV14_RKfHUFMGv1g"
      >
        {events.map(event => (
          <Marker
            key={event.id}
            latitude={event.lat}
            longitude={event.lon}
            offsetLeft={-20}
            offsetTop={-20}
          >
            <PinIcon />
          </Marker>
        ))}
      </ReactMapGL>
    </StyledMap>
  );
}
