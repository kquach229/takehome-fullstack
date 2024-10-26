import { Box, Typography } from '@mui/material';
import React from 'react';

const StatusBar = () => {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', sm: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      height='100%'
      color='grey'
      p={{ xs: '5px', sm: '10px 0' }}
      width='100%'
      sx={{ overflowX: 'auto' }}>
      <span
        style={{
          margin: '5px 0',
          display: 'flex',
          alignItems: 'center',
        }}>
        <img src='/btc.svg' height='25px' width='25px' alt='btc' />
        <Typography
          fontSize={{ xs: '12px', sm: '14px' }}
          fontWeight={700}
          ml={2}
          color='white'>
          BTC / BITCOIN
        </Typography>
      </span>
      <span
        style={{
          margin: '5px 0',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Typography fontSize={{ xs: '12px', sm: '14px' }}>Price</Typography>
        <Typography fontWeight={700} color='white'>
          $31,119.01
        </Typography>
      </span>

      <span
        style={{ margin: '5px 0', display: 'flex', flexDirection: 'column' }}>
        <Typography fontSize={{ xs: '12px', sm: '14px' }}>
          24H CHANGE
        </Typography>
        <Typography color='#4BC2A3' fontWeight='600'>
          +22.3USDC (+7.5)
        </Typography>
      </span>

      <span
        style={{ margin: '5px 0', display: 'flex', flexDirection: 'column' }}>
        <Typography fontSize={{ xs: '12px', sm: '14px' }}>
          1H FUNDING
        </Typography>
        <Typography color='#4BC2A3' fontWeight='600'>
          0.00012%
        </Typography>
      </span>

      <span
        style={{ margin: '5px 0', display: 'flex', flexDirection: 'column' }}>
        <Typography fontSize={{ xs: '12px', sm: '14px' }}>
          LONG OPEN INTEREST
        </Typography>
        <Typography color='#4BC2A3' fontWeight='600'>
          8.871 BTC
        </Typography>
      </span>

      <span
        style={{ margin: '5px 0', display: 'flex', flexDirection: 'column' }}>
        <Typography fontSize={{ xs: '12px', sm: '14px' }}>
          SHORT OPEN INTEREST
        </Typography>
        <Typography color='#4BC2A3' fontWeight='600'>
          8.871 BTC
        </Typography>
      </span>
    </Box>
  );
};

export default StatusBar;
