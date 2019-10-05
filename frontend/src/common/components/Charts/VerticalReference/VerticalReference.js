import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { LineChart, ResponsiveContainer, Tooltip, Line } from 'recharts';

import { withTheme } from 'styled-components';
import { Typography } from '@material-ui/core';
import { StyledTooltip } from './styled';
import tooltipKeyProptype from './custom-proptypes';

function CustomTooltip({ payload, displayTooltip, tooltipKey, data, onChange }) {
  if (!payload || !payload.length || !displayTooltip) return <span />;

  const payloadInfo = payload[0].payload;
  const keyData = payloadInfo && payloadInfo[tooltipKey];
  const timeFormat = keyData && moment(keyData).format('hh:mm:ssa');
  const tooltipIndex = data.findIndex(d => d.id === payloadInfo.id);
  const centeredTooltip = tooltipIndex > data.length * 0.9;

  onChange(tooltipIndex);

  return (
    keyData && (
      <StyledTooltip centeredTooltip={centeredTooltip}>
        <Typography className="tooltip--text" variant="caption">
          {timeFormat || keyData}
        </Typography>
      </StyledTooltip>
    )
  );
}

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  displayTooltip: PropTypes.bool,
  tooltipKey: tooltipKeyProptype,
  data: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func
};

/**
 * @description Draws the tooltip's vertical line as a reference
 *              to all the charts with the same syncId and the same length of data;
 */

function VerticalReference({
  data,
  dataKey,
  syncId,
  tooltipKey,
  displayTooltip,
  onIndexChange,
  theme
}) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const stroke = theme.palette.popup.main;
  const halfWidthTooltip = 44;

  function onTooltipChange(index) {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      onIndexChange(index);
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} syncId={syncId}>
        <Tooltip
          cursor={{ stroke }}
          position={{ y: -18 }}
          offset={-halfWidthTooltip}
          content={
            <CustomTooltip
              onChange={onTooltipChange}
              tooltipKey={tooltipKey}
              displayTooltip={displayTooltip}
              data={data}
            />
          }
        />

        <Line strokeWidth={0} dataKey={dataKey} stroke="none" dot={false} activeDot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

VerticalReference.defaultProps = {
  data: [{}, {}],
  syncId: '',
  tooltipKey: '',
  displayTooltip: false,
  onIndexChange: () => {}
};

VerticalReference.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  dataKey: PropTypes.string.isRequired,
  syncId: PropTypes.string,
  displayTooltip: PropTypes.bool,
  onIndexChange: PropTypes.func,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  tooltipKey: tooltipKeyProptype
};

export default withTheme(VerticalReference);
