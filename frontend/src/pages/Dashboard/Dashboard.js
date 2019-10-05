import React from 'react';

import Widget from './Widget';

import { Status, Widgets } from './styled';

function Dashboard() {
  return (
    <>
      <Status>
        What is happening in <strong>Iași</strong>
      </Status>
      <Widgets>
        <Widget category="Mobility" percentage="23" />
        <Widget category="Emergency" percentage="48" />
        <Widget category="Pollution" percentage="63" />
        <Widget category="Environment" percentage="100" />
        <Widget category="Municipality" percentage="88" />
        <Widget category="Aesthetics" percentage="96" />
      </Widgets>
    </>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
