import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Home from 'pages/Home';

import store from 'store';

import GlobalStyle from 'styles/global';
import theme from 'styles/theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: 'Poppins, sans-serif'
            }
          }}
        >
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
