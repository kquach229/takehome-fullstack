import { Box, Hidden, Typography } from '@mui/material';
import React from 'react';

const StatusBar = () => {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', sm: 'row' }}
      justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
      textAlign='left'
      alignItems={{ xs: 'flex-start', sm: 'center' }}
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
          height: '25px',
          gap: '8px',
        }}>
        <img src='/btc.svg' height='25px' width='25px' alt='btc' />
        <Typography
          fontSize='14px'
          fontWeight={700}
          lineHeight='18.2px'
          color='#F2F1F0'>
          BTC / BITCOIN
        </Typography>
      </span>
      <span
        style={{
          margin: '5px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
        <Typography
          color='#AEADAD'
          fontSize='10px'
          fontWeight='400'
          lineHeight='15px'>
          Price
        </Typography>
        <Typography
          fontWeight={700}
          fontSize='14px'
          letterSpacing='2%'
          color='#F2F1F0'>
          $31,119.01
        </Typography>
      </span>

      <span
        style={{
          margin: '5px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
        <Typography
          color='#AEADAD'
          fontSize='10px'
          fontWeight='400'
          lineHeight='15px'>
          24H CHANGE
        </Typography>
        <Typography
          color='#4BC2A3'
          fontSize='14px'
          fontWeight={700}
          lineHeight='18.2px'>
          +22.3USDC (+7.5)
        </Typography>
      </span>

      <span
        style={{
          margin: '5px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
        <Typography
          color='#AEADAD'
          fontSize='10px'
          fontWeight='400'
          lineHeight='15px'>
          1H FUNDING
        </Typography>
        <Typography
          color='#4BC2A3'
          fontSize='14px'
          fontWeight={700}
          lineHeight='18.2px'>
          0.00012%
        </Typography>
      </span>

      <span
        style={{
          margin: '5px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
        <Typography
          color='#AEADAD'
          fontSize='10px'
          fontWeight='400'
          lineHeight='15px'>
          LONG OPEN INTEREST
        </Typography>
        <Typography
          color='#4BC2A3'
          fontSize='14px'
          fontWeight={700}
          lineHeight='18.2px'>
          8.871 BTC
        </Typography>
      </span>

      <Box
        display={{ xs: 'flex', sm: 'none', md: 'flex' }}
        style={{
          margin: '5px 0',

          flexDirection: 'column',
          gap: '4px',
        }}>
        <Typography
          color='#AEADAD'
          fontSize='10px'
          fontWeight='400'
          lineHeight='15px'>
          SHORT OPEN INTEREST
        </Typography>
        <Typography
          color='#4BC2A3'
          fontSize='14px'
          fontWeight={700}
          lineHeight='18.2px'>
          8.871 BTC
        </Typography>
      </Box>
    </Box>
  );
};

export default StatusBar;
