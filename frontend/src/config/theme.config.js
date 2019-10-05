// eslint-disable-next-line import/no-mutable-exports
let themeConfig = {
  typography: {
    htmlFontSize: 10,
    fontFamily: 'NunitoSans, Arial, sans-serif'
  },
  palette: {
    background: {
      paper: '#fff',
      default: '#f9f9f9'
    },
    primary: {
      main: '#0a31f8'
    },
    text: {
      main: '#353b54'
    },

    critical: '#ff0050',
    warning: '#ff981e',
    okay: '#64c83e'
  },
  shadow: {
    main: '0 4px 16px 0 #ededed'
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
};

themeConfig.overrides = {
  MuiBottomNavigation: {
    root: {
      boxShadow: themeConfig.shadow.main,
      padding: '41px 0'
    }
  },
  MuiBottomNavigationAction: {
    root: {
      padding: 0
    },
    iconOnly: {
      padding: '41px 0'
    }
  },
  MuiButton: {
    root: {
      borderRadius: '24px'
    },
    label: {
      fontWeight: 'bold'
    }
  }
};

export default themeConfig;
