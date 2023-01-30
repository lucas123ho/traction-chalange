import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Dashboard from 'layout/Dashboard';

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
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<Home />} />
              <Route path="/assets" element={<h1>Assets</h1>} />
              <Route path="/workorders" element={<h1>Workorders</h1>} />
              <Route path="*" element={<h1>Not found</h1>} />
            </Route>
          </Routes>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
