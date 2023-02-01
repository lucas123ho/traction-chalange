import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import Highcharts from 'highcharts';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Dashboard from 'layout/Dashboard';

import AssetDetail from 'pages/AssetDetail';
import Assets from 'pages/Assets';
import Home from 'pages/Home';
import Workorders from 'pages/Workorders';

import store from 'store';

import GlobalStyle from 'styles/global';
import theme from 'styles/theme';

Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: 'Poppins, sans-serif',
      color: theme.text
    }
  }
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: 'Poppins, sans-serif',
              colorPrimary: theme.primary,
              colorSuccess: theme.green,
              red: theme.red
            }
          }}
        >
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<Home />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/assets/:assetId" element={<AssetDetail />} />
              <Route path="/workorders" element={<Workorders />} />
              <Route
                path="/workorders/:workorderId"
                element={<Workorders />}
              />
              <Route path="*" element={<h1>Not found</h1>} />
            </Route>
          </Routes>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
