const STATUS_TYPES = {
  connected: 'connected',
  notConnected: 'not_connected',
  pending: 'pending',
  stable: 'stable'
};

const ERROR_TYPES = {
  systemError: 'error',
  poorConnection: 'poor_connection'
};

export function generateTimeData(numberOfItems) {
  return Array(numberOfItems)
    .fill()
    .map((_, i) => ({ id: i, time: randomDate(new Date(2019, 0, 1), new Date()) }));
}

export function generateEmptyData(numberOfItems) {
  return Array(numberOfItems)
    .fill()
    .map((_, i) => ({ id: i, statusType: STATUS_TYPES.pending }));
}

export function generateSpeedData(numberOfItems) {
  return Array(numberOfItems)
    .fill()
    .map((_, i) => ({ id: i, speed: Math.floor(Math.random() * 100) }));
}

export function generateFullData(numberOfItems, withError) {
  return Array(numberOfItems)
    .fill()
    .map((_, i) => ({
      id: i,
      errorType: withError && Math.floor(numberOfItems / 2) === i ? ERROR_TYPES.systemError : '',
      setMarker: withError && Math.floor(numberOfItems / 2) === i,
      statusType: STATUS_TYPES.stable
    }));
}

export function generateLinearTimeline(numberOfItems) {
  return Array(numberOfItems)
    .fill()
    .map((_, i) => {
      let systemError = Math.floor(numberOfItems / 2) === i;
      let connected = systemError || Math.random() > 0.5;
      let poorConnection = !systemError && connected && Math.random() > 0.5;

      let errorType = systemError
        ? ERROR_TYPES.systemError
        : poorConnection
        ? ERROR_TYPES.poorConnection
        : '';
      let statusType = connected ? STATUS_TYPES.connected : STATUS_TYPES.notConnected;

      return { id: i, statusType, errorType, setMarker: systemError };
    });
}

export function generateMarkersData(length) {
  let value = false;
  return Array(length)
    .fill()
    .map((_, i) => {
      let setMarker = Math.random() > 0.7;
      if (setMarker) value = !value;
      return {
        id: i,
        setMarker,
        value: value ? 'On' : 'Off'
        // errorType: ERROR_TYPES.systemError
      };
    });
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const customLinearTimeline = [
  {
    id: '12',
    statusType: 'not_connected'
  },
  {
    id: '123',
    statusType: 'not_connected'
  },
  {
    id: '124',
    statusType: 'not_connected'
  },
  {
    id: '125',
    statusType: 'connected'
  },
  {
    id: '126',
    statusType: 'connected'
  },
  {
    id: '127',
    errorType: ERROR_TYPES.poorConnection,
    statusType: 'connected'
  },
  {
    id: '128',
    statusType: 'connected'
  },
  {
    id: '129',
    errorType: ERROR_TYPES.systemError,
    setMarker: true,
    statusType: 'connected'
  },
  {
    id: '120',
    errorType: ERROR_TYPES.systemError,
    statusType: 'connected'
  },
  {
    id: '1275',
    statusType: 'connected'
  },
  {
    id: '1286',
    statusType: 'connected'
  },
  {
    id: '1297',
    errorType: ERROR_TYPES.poorConnection,
    statusType: 'connected'
  },
  {
    id: '1208',
    statusType: 'connected'
  },
  {
    id: '1201',
    statusType: 'not_connected'
  },
  {
    id: '1202',
    statusType: 'not_connected'
  },
  {
    id: '1206',
    statusType: 'not_connected'
  },
  {
    id: '1207',
    statusType: 'not_connected'
  },
  {
    id: '12088',
    statusType: 'not_connected'
  }
];
