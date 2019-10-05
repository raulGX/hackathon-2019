import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import AppRoutes from 'containers/AppRoutes';
import Menu from 'components/Menu';
import Header from 'components/Header';
import { StyledMainPage } from 'components/styled/MainPage';
import { StyledPage } from 'components/styled/Page';
import SuspenseLoading from 'containers/SuspenseLoading';

import { getPageNameFromPath } from 'common/utils';
import { events } from 'config/mocks';
import { postEvent } from 'model/actions/events';

const Index = ({ routes, location }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    events.forEach(event => {
      dispatch(postEvent(event));
    });
  }, []);

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
