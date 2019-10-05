// eslint-disable-next-line import/no-mutable-exports
let themeConfig = {
  palette: {
    type: 'dark',
    action: {
      hover: 'rgba(0, 0, 0, 0.12)',
      disabled: 'rgba(33, 33, 33, 0.54)'
    },
    border: {
      light: 'rgba(255, 255, 255, 0.0648)',
      dark: 'rgba(255, 255, 255, 0.12)'
    },
    primary: {
      main: '#6C58FF',
      dark: '#4039FF'
    },
    secondary: {
      light: '#CC8EFE',
      main: '#A332FF',
      dark: '#7A00F7',
      audioColors: {
        100: '#6C4300',
        200: '#975E00',
        300: '#FF9F00',
        400: '#FFBF56',
        500: '#FFD389'
      },
      videoColors: {
        100: '#5A2600',
        200: '#892600',
        300: '#FF4800',
        400: '#FF6A30',
        500: '#FF9D76'
      }
    },
    background: {
      paper: '#212121',
      dark: '#191919',
      main: '#212121',
      overlay: 'rgba(25, 25, 25, 0.8)'
    },
    grey: {
      700: '#373737'
    },
    divider: '#616161',
    text: {
      primary: '#ffffff',
      primary80: 'rgba(255, 255, 255, 0.8)',
      primary60: 'rgba(255, 255, 255, 0.6)',
      primary54: 'rgba(255, 255, 255, 0.54)',
      primary50: 'rgba(255, 255, 255, 0.5)',
      primary38: 'rgba(255, 255, 255, 0.38)',
      primary04: 'rgba(255, 255, 255, 0.04)',
      secondary: '#e7e7e7',
      secondary80: 'rgba(231, 231, 231, 0.8)',
      secondary54: 'rgba(33, 33, 33, 0.54)'
    },
    popup: {
      main: '#2F2F2F',
      dark: '#2B2B2B'
    },
    error: {
      main: '#C7044B'
    },
    warning: {
      main: '#FF9F00'
    }
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: 'Roboto, Arial, sans-serif',
    subtitle2: {
      lineHeight: 'initial'
    }
  },
  primaryShadow: '0 2px 16px 4px rgba(0, 0, 0, 0.5)'
};

themeConfig.props = {
  MuiTypography: {
    variant: 'body2'
  }
};

themeConfig.overrides = {
  MuiTypography: {
    root: {
      color: '#ffffff'
    },
    subtitle1: {
      letterSpacing: '0.05rem'
    }
  },
  MuiChip: {
    root: {
      borderRadius: '1.6rem',
      backgroundColor: themeConfig.palette.background.main,
      fontSize: '1.4rem',
      letterSpacing: '0.025rem'
    },
    deleteIcon: {
      marginLeft: '0rem',
      marginRight: '1rem',
      fontSize: '1.6rem',
      color: themeConfig.palette.text.primary54
    }
  },
  MuiTableCell: {
    head: {
      fontWeight: 500,
      fontSize: '1.4rem',
      color: themeConfig.palette.text.primary60,
      borderColor: themeConfig.palette.border.dark,
      letterSpacing: '0.01rem'
    },
    body: {
      borderColor: themeConfig.palette.border.light,
      fontSize: '1.4rem',
      letterSpacing: '0.025rem'
    }
  },
  MuiTablePagination: {
    root: {
      color: themeConfig.palette.text.primary60,
      letterSpacing: '0.04rem'
    },
    selectIcon: {
      color: themeConfig.palette.text.primary60
    }
  },
  MuiCheckbox: {
    root: {
      svg: {
        fill: 'black'
      }
    }
  }
};

export default themeConfig;
