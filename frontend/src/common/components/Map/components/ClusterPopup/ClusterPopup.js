import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import MeetingBullet from 'common/components/MeetingBullet';
import { getMarkerRadius } from '../../services/Map.service';
import { uniqueMeetingsFromClusters } from './utils';
import { StyledPopup, Header, StyledList, StyledListItem, StyledScrollbar } from './styled';

export function ClusterPopup({ cluster, onClose, supercluster, onSelectMeeting }) {
  const meetings = useMemo(
    () =>
      uniqueMeetingsFromClusters(supercluster.getLeaves(cluster.properties.cluster_id, Infinity)),
    [cluster, supercluster]
  );
  const radius = getMarkerRadius(cluster.properties.point_count);
  const renderClusterItems = () => (
    <>
      <Header className="title" variant="subtitle1">
        Meetings ({meetings.length})
      </Header>
      <StyledScrollbar>
        <StyledList className={cluster.properties.ongoing ? 'ongoing' : ''}>
          {meetings.map(meeting => (
            <StyledListItem
              button
              className={!meeting.ongoing ? 'finished' : ''}
              key={meeting.locationId}
              onClick={() => onSelectMeeting(meeting)}
            >
              {meeting.ongoing && <MeetingBullet radius={6} ongoing className="bullet" />}
              <Typography variant="caption" className="id">
                {meeting.id}
              </Typography>
              <Typography variant="caption" className="title">
                {meeting.title}
              </Typography>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledScrollbar>
    </>
  );
  return (
    <StyledPopup
      anchor="top-left"
      longitude={cluster.geometry.coordinates[0]}
      latitude={cluster.geometry.coordinates[1]}
      closeOnClick={false}
      onClose={onClose}
      captureScroll
      tipSize={0}
      offsetTop={-radius}
      offsetLeft={radius + 10}
    >
      {renderClusterItems()}
    </StyledPopup>
  );
}

ClusterPopup.propTypes = {
  cluster: PropTypes.object,
  supercluster: PropTypes.object,
  onClose: PropTypes.func,
  onSelectMeeting: PropTypes.func
};

export default ClusterPopup;
