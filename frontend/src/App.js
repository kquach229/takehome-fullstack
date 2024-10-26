import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TradingViewPage from './components/TradingViewPage';
import Search from './components/Search';
import { Box } from '@mui/material';
import StatusBar from './components/StatusBar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4caf50',
    },
    background: {
      default: '#000',
    },
    text: {
      primary: '#d1d4dc',
    },
  },
});

const App = () => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
      }}>
      <ThemeProvider theme={theme}>
        <Box p={3}>
          <Search />
          <StatusBar />
          <TradingViewPage />
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
