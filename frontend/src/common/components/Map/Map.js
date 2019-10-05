import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import MapGL, { FlyToInterpolator, NavigationControl } from 'react-map-gl';

import { easeCubic } from 'd3-ease';

import { MapWrapper, Navigation } from './styled';
import MarkerSymbol from './components/MarkerSymbol';
import Clusters from './components/Clusters';
import ClusterPopup from './components/ClusterPopup';

import * as MapUtils from './services/Map.service';

import 'mapbox-gl/dist/mapbox-gl.css';

/* eslint-disable prefer-destructuring */
const MAPBOX_KEY = process.env.MAPBOX_KEY;
/* eslint-enable prefer-destructuring */
const MAX_ZOOM = 15;

function Map({ markers, theme, selectedMeeting, onSelectMeeting }) {
  const [mapRef, setMapRef] = useState(null);
  const [mapLines, setMapLines] = useState([]);
  const [viewport, setViewport] = useState({
    pitch: 40,
    latitude: 18.43452143691739,
    longitude: 11.767077902411557,
    zoom: 0.9944196127989592
  });
  const [popup, setPopup] = useState(null);
  const [supercluster, setSupercluster] = useState(null);
  const markersToShow = useMemo(() => {
    if (!selectedMeeting) return markers;
    return markers.filter(m => m.id === selectedMeeting.id);
  }, [selectedMeeting, markers]);

  useEffect(() => {
    if (!mapRef) return;

    zoomOnMeeting(selectedMeeting);
  }, [selectedMeeting]);

  const onSetViewport = mapViewport => {
    setViewport(mapViewport);
  };

  const zoomOnMeeting = meeting => {
    const map = mapRef.getMap();
    if (!map.isStyleLoaded()) return;

    MapUtils.removeLines(mapLines, map);

    if (!meeting) {
      setMapLines([]);
      return;
    }

    const connections = MapUtils.getMeetingConnections(markersToShow);
    const { longitude, latitude, zoom } = MapUtils.getViewportFromPoints(markersToShow, viewport);

    MapUtils.removeLines(mapLines, map);
    const newLines = MapUtils.drawLines(connections, map, theme);

    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 800,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    });
    setMapLines(newLines);
  };

  const onClusterClick = cluster => {
    if (!cluster.properties.cluster) {
      onSelectMeeting && onSelectMeeting(cluster.properties.payload);
      return;
    }

    let newZoom = supercluster.getClusterExpansionZoom(cluster.properties.cluster_id) + 0.2;

    if (newZoom > MAX_ZOOM) {
      newZoom = viewport.zoom;
      setPopup(cluster);
    }

    setViewport({
      ...viewport,
      zoom: newZoom,
      longitude: cluster.geometry.coordinates[0],
      latitude: cluster.geometry.coordinates[1],
      transitionDuration: 300,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    });
  };

  const renderClusters = clusters =>
    clusters.map(cluster => (
      <MarkerSymbol
        ongoing={cluster.properties.ongoing}
        key={cluster.properties.cluster_id || cluster.properties.payload.locationId}
        onClick={() => !selectedMeeting && onClusterClick(cluster)}
        lon={cluster.geometry.coordinates[0]}
        lat={cluster.geometry.coordinates[1]}
        points={cluster.properties.point_count}
        user={!cluster.id && cluster.properties.payload.name}
      />
    ));

  return (
    <MapWrapper>
      <MapGL
        mapboxApiAccessToken={MAPBOX_KEY}
        {...viewport}
        width="100%"
        height="100%"
        ref={setMapRef}
        onLoad={() => zoomOnMeeting(selectedMeeting)}
        mapStyle="mapbox://styles/virgilm/cjvey9lmz01x21fqv2yka95g9"
        onViewportChange={onSetViewport}
        mapOptions={{ renderWorldCopies: false }}
      >
        <Navigation>
          <NavigationControl onViewportChange={onSetViewport} showCompass={false} />
        </Navigation>

        <Clusters
          map={mapRef && mapRef.getMap()}
          markers={markersToShow}
          viewport={viewport}
          maxZoom={MAX_ZOOM}
          radius={40}
          onSuperclusterInit={setSupercluster}
        >
          {clusters => renderClusters(clusters)}
        </Clusters>

        {popup && (
          <ClusterPopup
            cluster={popup}
            supercluster={supercluster}
            onClose={() => setPopup(null)}
            onSelectMeeting={meetingId => {
              onSelectMeeting && onSelectMeeting(meetingId);
              setPopup(null);
            }}
          />
        )}
      </MapGL>
    </MapWrapper>
  );
}

Map.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      lat: PropTypes.number,
      lon: PropTypes.number
    })
  ).isRequired,
  selectedMeeting: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.shape({ element: PropTypes.func })
  }),
  onSelectMeeting: PropTypes.func,
  theme: PropTypes.object
};

export default withTheme(Map);
