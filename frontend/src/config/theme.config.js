// eslint-disable-next-line import/no-mutable-exports
let themeConfig = {
  typography: {
    htmlFontSize: 10,
    fontFamily: 'Roboto, Arial, sans-serif'
  },
  palette: {
    background: {
      paper: '#fff',
      default: '#f9f9f9'
    }
  },
  props: {
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  },
  overrides: {
    MuiBottomNavigation: {
      root: {
        borderRadius: '20px',
        boxShadow:
          '0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)'
      }
    },
    MuiBottomNavigationAction: {
      root: {
        padding: 0
      },
      iconOnly: {
        paddingTop: '0px'
      }
    }
  }
};

export default themeConfig;
