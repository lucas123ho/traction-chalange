import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
    -webkit-font-smoonthing:antialiased;
    -moz-osx-font-smoonthing:grayscale;

    &::before,
    &::after {
        box-sizing:inherit;
    }
  }

  html {
    font-size: 62.5%;
  }

  html, body, #app {
    width: 100%;
    height: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    font-weight: normal;
    font-size: 1.6rem;
  }
`;

export default GlobalStyle;
