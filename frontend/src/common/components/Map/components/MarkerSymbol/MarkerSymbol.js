import React from 'react';
import PropTypes from 'prop-types';

import MeetingBullet from 'common/components/MeetingBullet';
import { StyledMarker, StyledUserName } from './styled';
import { getMarkerRadius } from '../../services/Map.service';

export function MarkerSymbol({ lat, lon, onClick, ongoing, points = 1, user }) {
  const radius = getMarkerRadius(points);
  return (
    <StyledMarker latitude={lat} longitude={lon} offsetLeft={-radius} offsetTop={-radius}>
      <MeetingBullet radius={radius} onClick={onClick} ongoing={ongoing} points={points} />
      {user && (
        <StyledUserName variant="caption" noWrap>
          {user}
        </StyledUserName>
      )}
    </StyledMarker>
  );
}

MarkerSymbol.defaultProps = {
  mapProjection: null
};

MarkerSymbol.propTypes = {
  mapProjection: PropTypes.shape({
    fromLatLngToPoint: PropTypes.func
  }),
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  ongoing: PropTypes.bool,
  points: PropTypes.number,
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default MarkerSymbol;
