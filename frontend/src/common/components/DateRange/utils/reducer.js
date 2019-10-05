export default function(state, action) {
  switch (action.type) {
    case 'SELECT_DEFAULT_MODE':
      return {
        ...state,
        internalRange: action.range,
        mode: action.mode,
        prevMode: state.mode,
        isDropdownOpened: false
      };
    case 'SELECT_CUSTOM_RANGE_MODE':
      return {
        ...state,
        internalRange:
          state.mode !== 'customRange' ? { startDate: null, endDate: null } : state.internalRange,
        mode: 'customRange',
        prevMode: state.mode,
        prevInternalRange: state.internalRange
      };
    case 'UPDATE_INTERNAL_RANGE':
      return {
        ...state,
        internalRange: action.range
      };
    case 'APPLY_RANGE':
      return {
        ...state,
        internalRange: action.range,
        prevInternalRange: action.range,
        isDropdownOpened: false
      };
    case 'SYNC_RANGE':
      return {
        ...state,
        internalRange: action.range,
        prevInternalRange: action.range,
        mode: 'customRange'
      };
    case 'TOGGLE_DROPDOWN': {
      let newPrevInternalRange = Object.assign({}, state.prevInternalRange);
      let newInternalRange = Object.assign({}, state.internalRange);
      let newMode = state.mode;

      if (!state.isDropdownOpened) {
        newPrevInternalRange = Object.assign({}, state.internalRange);
      }

      if (state.isDropdownOpened) {
        if (!state.internalRange.startDate || !state.internalRange.endDate) {
          newPrevInternalRange = action.range;
          newInternalRange = state.prevInternalRange;
          newMode = state.prevMode;
        }
      }
      return {
        ...state,
        prevInternalRange: newPrevInternalRange,
        internalRange: newInternalRange,
        mode: newMode,
        isDropdownOpened: !state.isDropdownOpened
      };
    }
    case 'RESET':
      return {
        ...state,
        isDropdownOpened: false,
        internalRange: action.range,
        mode: null,
        prevMode: null
      };
    default:
      return state;
  }
}
