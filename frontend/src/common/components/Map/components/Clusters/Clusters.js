import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Supercluster from 'supercluster';

import { createClusters } from '../../services/Map.service';

export function Clusters({
  map,
  markers,
  viewport,
  maxZoom,
  radius,
  children,
  onSuperclusterInit
}) {
  const supercluster = useMemo(() => {
    const s = new Supercluster({
      radius,
      maxZoom,
      map: p => ({ ongoing: p.payload.ongoing }),
      reduce: (accumulated, p) => {
        accumulated.ongoing = accumulated.ongoing || p.ongoing;
      }
    });
    onSuperclusterInit(s);
    return s;
  }, [radius, maxZoom]);

  const clusters = useMemo(() => createClusters(map, markers, viewport.zoom, supercluster), [
    map,
    markers,
    viewport,
    supercluster,
    radius
  ]);

  return <>{children(clusters)}</>;
}

Clusters.propTypes = {
  markers: PropTypes.array,
  map: PropTypes.object,
  viewport: PropTypes.object,
  maxZoom: PropTypes.number,
  radius: PropTypes.number,
  children: PropTypes.func.isRequired,
  onSuperclusterInit: PropTypes.func
};

export default Clusters;
