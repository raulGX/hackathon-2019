import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { StyledTabs, StyledTab } from './styled';

export default function Activity({ tabs, onTabChanged }) {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const onTabChangedHandler = (event, value) => {
    setCurrentTab(value);
    onTabChanged(value);
  };
  const renderTabs = () =>
    tabs.map(tab => <StyledTab key={tab.id} label={tab.name} value={tab.id} />);

  return (
    <StyledTabs
      value={currentTab}
      onChange={onTabChangedHandler}
      TabIndicatorProps={{
        style: {
          backgroundColor: '#8D77FF'
        }
      }}
    >
      {renderTabs()}
    </StyledTabs>
  );
}

Activity.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  onTabChanged: PropTypes.func.isRequired
};
