import React, { useState } from 'react';
import { Box, Grid, Tabs, Tab, Divider } from '@mui/material';
import TradingViewChart from './TradingViewChart';
import OrderForm from './OrderForm';

const TradingViewPage = () => {
  return (
    <Grid container spacing={2} sx={{ height: '100vh' }}>
      {' '}
      {/* Added spacing={2} */}
      <Grid item xs={12} md={8}>
        <Box height='650px' bgcolor='#161514' p={2} mt={2}>
          <TradingViewChart />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          height='650px'
          bgcolor='#161514'
          p={2}
          color='white'
          mt={{ xs: 8, md: 2 }}>
          <OrderForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TradingViewPage;
