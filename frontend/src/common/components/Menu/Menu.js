import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Typography } from '@material-ui/core';
import { IS_SUPER_ADMIN } from 'config/api.config';
import HuddlLogo from 'assets/icons/huddl-logo.svg';
import Loader from 'components/Loader';
import SelectModal from 'components/SelectModal';
import { fetchOrg, fetchOrgs, changeOrg } from 'model/actions/org';

import {
  StyledDrawer,
  Header,
  LogoWrapper,
  Logo,
  LogoText,
  OrgWrapper,
  StyledList,
  StyledListItem,
  Copyright
} from './styled';

function Menu({ dispatch, routes, org }) {
  const { t } = useTranslation();
  let currentYear = new Date().getFullYear();

  useEffect(() => {
    if (IS_SUPER_ADMIN) {
      dispatch(fetchOrgs());
    } else {
      dispatch(fetchOrg());
    }
  }, [dispatch]);

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Header>
        <LogoWrapper>
          <Logo>
            <HuddlLogo />
          </Logo>
          <LogoText>
            <Typography variant="subtitle1">Huddl</Typography>
            <Loader small isLoading={org.isLoading}>
              <OrgWrapper>
                <SelectModal
                  options={org.list}
                  value={{ id: org.id, name: org.name }}
                  onChange={selectedOrg => dispatch(changeOrg(selectedOrg))}
                  modalTitle={t('org.selectOrg')}
                  searchPlaceholder={t('org.findOrg')}
                />
              </OrgWrapper>
            </Loader>
          </LogoText>
        </LogoWrapper>
      </Header>

      <StyledList component="nav">
        {routes.map(route => (
          <NavLink to={route.path} key={route.key} className="nav-link">
            <StyledListItem className="list-item" button>
              {route.icon && <route.icon className="icon" />}
              <Typography variant="subtitle2" className="nav-text" title={route.name} noWrap>
                {t(`pages.${route.name}`)}
              </Typography>
            </StyledListItem>
          </NavLink>
        ))}
      </StyledList>

      <Copyright>
        <Typography variant="caption">{currentYear} &copy; Huddl</Typography>
      </Copyright>
    </StyledDrawer>
  );
}

Menu.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  org: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(state => ({
  org: state.org
}))(Menu);
