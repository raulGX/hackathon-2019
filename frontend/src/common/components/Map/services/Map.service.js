import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import * as turfHelpers from '@turf/helpers';
import turfGreatCircle from '@turf/great-circle';

export const createClusters = (map, markers, zoom, supercluster) => {
  if (!map) return [];

  const bounds = map.getBounds();
  const points = markers.map(m =>
    turfHelpers.point([m.lon, m.lat], { payload: m, ongoing: m.ongoing })
  );
  const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];

  supercluster.load(points);
  return supercluster.getClusters(bbox, Math.ceil(zoom));
};

export const getMeetingConnections = meetingMarkers => {
  let source = meetingMarkers.find(user => user.userRole === 'organizer');

  if (!source || (source && !source.lon && !source.lat)) {
    source = meetingMarkers.find(user => user.lon && user.lat);
  }
  if (!source) return [];

  return meetingMarkers.reduce((result, user) => {
    if (user.userId !== source.userId) {
      result.push({ id: user.userId, source, target: user });
    }
    return result;
  }, []);
};

export const getViewportFromPoints = (markers = [], currentViewport) => {
  if (!markers.length) return currentViewport;
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => {
    marker.lon && marker.lat && bounds.extend([marker.lon, marker.lat]);
  });
  const viewport = new WebMercatorViewport({ ...currentViewport });
  const west = bounds.getWest();
  const south = bounds.getSouth();
  const east = bounds.getEast();
  const north = bounds.getNorth();

  if (west === east && north === south) {
    return {
      longitude: west,
      latitude: north,
      zoom: currentViewport.zoom
    };
  }
  return viewport.fitBounds([[west, south], [east, north]], {
    padding: 100
  });
};

export const drawLines = (connections = [], map, theme) => {
  let origin;
  let destination;
  let start;
  let end;
  let arc;
  let lines = [];

  connections.forEach((connection, index) => {
    origin = [connection.source.lon, connection.source.lat];
    destination = [connection.target.lon, connection.target.lat];

    start = turfHelpers.point(origin);
    end = turfHelpers.point(destination);

    arc = turfGreatCircle(start, end, { npoints: 1 });
    lines.push(arc);
    drawLine(
      map,
      arc,
      index,
      connection.faulty ? theme.palette.error.main : theme.palette.primary.main
    );
  });

  return lines;
};

const drawLine = (map, arc, id, color) => {
  map.addSource(`${id}`, {
    type: 'geojson',
    data: arc
  });

  map.addLayer({
    id: `${id}`,
    source: `${id}`,
    type: 'line',
    paint: {
      'line-width': 2,
      'line-color': color
    }
  });
};

export const removeLines = (lines = [], map) => {
  lines.forEach((line, index) => {
    const layer = map.getLayer(`${index}`);
    const source = map.getSource(`${index}`);

    layer && map.removeLayer(`${index}`);
    source && map.removeSource(`${index}`);
  });
};

export const getMarkerRadius = points => Math.min(6 + (points - 1) * 2, 30);
