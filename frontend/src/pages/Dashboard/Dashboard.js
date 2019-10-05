import React from 'react';

import { CardsContainer, StyledWidget } from './styled';

function Dashboard() {
  return (
    <CardsContainer>
      <StyledWidget title="Mobility" />
      <StyledWidget title="Environment" />
      <StyledWidget title="Pollution" />
      <StyledWidget title="Municipality" />
      <StyledWidget title="Security & Emergencies" />
      <StyledWidget title="Entertainment" />
    </CardsContainer>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
