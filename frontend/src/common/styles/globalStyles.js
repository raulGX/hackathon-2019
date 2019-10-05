import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    font-size: 62.5%;
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: ${props => props.theme.typography.fontFamily};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: ${({ theme }) => theme.palette.background.default};

  }

  #root {
    height: 100%;
  }

  * {
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }

  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
  }
`;

export default GlobalStyle;
