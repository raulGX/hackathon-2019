import styled from 'styled-components';

import { Drawer, List, ListItem } from '@material-ui/core';

import { menuWidth } from 'common/styles/variables';

const StyledDrawer = styled(Drawer)`
  width: ${menuWidth};

  /* override Paper styles from the material-ui Drawer */
  & > div:only-child {
    width: ${menuWidth};
    border: none;
    z-index: 0;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem 0 4.6rem 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 4.4rem;
  height: 4.4rem;
  margin: 0 0.4rem 0.2rem 3.2rem;
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 4.6rem;

  h6 {
    padding-left: 1rem;
  }
`;

const OrgWrapper = styled.div`
  /* 9rem = Logo width + Logo lateral margins */
  width: calc(${menuWidth} - 9rem);
  color: ${({ theme }) => theme.palette.text.primary50};

  .text {
    padding: 0.5rem 1rem 0.5rem 1rem;
    color: ${({ theme }) => theme.palette.text.primary50};
  }
`;

const StyledListItem = styled(ListItem)`
  && {
    margin-bottom: 1.6rem;
    padding: 0;
    height: 4.8rem;

    &:focus {
      background-color: transparent;
    }
  }

  & > .icon {
    margin: 0 3.2rem;
  }
`;

const StyledList = styled(List)`
  && {
    padding: 0;
    flex-grow: 1;
  }

  & > .nav-link {
    &:hover,
    &:visited,
    &:link,
    &:active {
      color: ${({ theme }) => theme.palette.text.primary60};
      text-decoration: none;
    }

    &:hover {
      & > .list-item {
        background-color: ${({ theme }) => theme.palette.action.hover};
      }
    }

    &:not(.active) {
      .nav-text {
        color: ${({ theme }) => theme.palette.text.primary60};
      }
    }

    &.active {
      .icon {
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }
  }
`;

const Copyright = styled.div`
  padding-bottom: 3.2rem;

  & > span {
    margin-left: 3.2rem;
    color: ${({ theme }) => theme.palette.text.primary60};
  }
`;

export {
  StyledDrawer,
  Header,
  LogoWrapper,
  Logo,
  StyledList,
  StyledListItem,
  Copyright,
  OrgWrapper
};
