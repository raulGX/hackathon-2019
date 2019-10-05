import React from 'react';
import PropTypes from 'prop-types';

import AppRoutes from 'containers/AppRoutes';
import Menu from 'components/Menu';
import Header from 'components/Header';
import { StyledMainPage } from 'components/styled/MainPage';
import { StyledPage } from 'components/styled/Page';
import SuspenseLoading from 'containers/SuspenseLoading';

import { getPageNameFromPath } from 'common/utils';

const Index = ({ routes, location }) => {
  const pageName = getPageNameFromPath(location.pathname, routes);

  return (
    <StyledMainPage>
      <Menu routes={routes} />

      <StyledPage>
        <Header pageName={pageName} />
        <SuspenseLoading>
          <AppRoutes routes={routes} />
        </SuspenseLoading>
      </StyledPage>
    </StyledMainPage>
  );
};

export default Index;

Index.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object
};
