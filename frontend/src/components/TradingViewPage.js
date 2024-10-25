import React, { useState } from 'react';
import { Box, Grid, Tabs, Tab } from '@mui/material';
import TradingViewChart from './TradingViewChart';
import OrderForm from './OrderForm';

const TradingViewPage = () => {
  const [tabValue, setTabValue] = useState('PRICE');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Grid container spacing={2} sx={{ height: '100vh' }}>
      <Grid item xs={8}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor='inherit'
          indicatorColor='transparent'>
          <Tab
            value='PRICE'
            label='PRICE'
            sx={{
              color: tabValue === 'PRICE' ? '#FF5A44' : 'white',
              borderBottom: tabValue === 'PRICE' ? '2px solid #FF5A44' : 'none',
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
        <Box p={2} mt={2} bgcolor='#1e1e1e'>
          <TradingViewChart />
        </Box>
      </Grid>

      <Grid item xs={4} mt={5}>
        <Box p={2} bgcolor='#000' color='white'>
          <OrderForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TradingViewPage;
