import React from 'react';
import PropTypes from 'prop-types';

import AppRoutes from 'containers/AppRoutes';
import Menu from 'components/Menu';
import Header from 'components/Header';
import { StyledMainPage } from 'components/styled/MainPage';
import { StyledPage } from 'components/styled/Page';
import SuspenseLoading from 'containers/SuspenseLoading';

const Index = ({ routes, location }) => (
  <StyledMainPage>
    {/*
        Menu Component uses connect from react-redux. Because of that, React will prevent
        the component to re-render if the params won't change.
        To force the re-rendering, we send the location as a param.

        https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
     */}
    <Menu routes={routes} location={location} />

    <StyledPage>
      <Header pageName="Page name" />
      <SuspenseLoading>
        <AppRoutes routes={routes} />
      </SuspenseLoading>
    </StyledPage>
  </StyledMainPage>
);

export default Index;

Index.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object
};
