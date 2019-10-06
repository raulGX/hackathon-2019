import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import PinIcon from 'assets/icons/pin.svg';
import { StyledMap } from './styled';
import events from './mocks';

import 'mapbox-gl/dist/mapbox-gl.css';

/* eslint-disable prefer-destructuring */
const MAPBOX_KEY = process.env.MAPBOX_KEY;

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
      <ReactMapGL {...viewport} onViewportChange={setViewport} mapboxApiAccessToken={MAPBOX_KEY}>
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
