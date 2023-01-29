import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif !important;
    font-weight: normal;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.text};
  }

  a {
    color: ${({ theme }) => theme.link};
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    transition: all .3s ease;

    &:hover {
      opacity: .8;
    }
  }

  .ant-skeleton {
    & .ant-skeleton-avatar, & .ant-skeleton-input {
      &:after {
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.12) 25%, rgba(255, 255, 255, 0.30) 37%, rgba(255, 255, 255, 0.12) 63%) !important;
      }
    }
  }
`;

export default GlobalStyle;
