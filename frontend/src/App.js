import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TradingViewPage from './components/TradingViewPage';
import Search from './components/Search';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import StatusBar from './components/StatusBar';
import './App.css';

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
  const [tabValue, setTabValue] = useState('PRICE');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
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
          <Divider />
          <Tabs
            value={tabValue}
            sx={{ marginTop: '25px' }}
            onChange={handleTabChange}
            textColor='inherit'
            indicatorColor='transparent'>
            <Tab
              value='PRICE'
              label='PRICE'
              sx={{
                color: tabValue === 'PRICE' ? '#FF5A44' : 'white',
                borderBottom:
                  tabValue === 'PRICE' ? '2px solid #FF5A44' : 'none',
                '&:hover': {
                  color: '#FF5A44',
                },
              }}
            />
            <Tab
              value='FUNDING'
              label='FUNDING'
              sx={{
                color: tabValue === 'FUNDING' ? '#FF5A44' : 'white',
                borderBottom:
                  tabValue === 'FUNDING' ? '2px solid #FF5A44' : 'none',
                '&:hover': {
                  color: '#FF5A44',
                },
              }}
            />
          </Tabs>
          <Divider />
          <TradingViewPage />
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
