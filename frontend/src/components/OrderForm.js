import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Slider,
  Divider,
} from '@mui/material';
import { useState, useRef } from 'react';
import { RxCaretDown } from 'react-icons/rx';
import Confetti from 'react-confetti';

const marks = [
  {
    value: 2,
    label: '2X',
  },

  {
    value: 25,
    label: '25X',
  },
  {
    value: 50,
    label: '50X',
  },
  {
    value: 100,
    label: '100X',
  },
  {
    value: 128,
    label: '128X',
  },
];

const OrderForm = () => {
  const [tabValue, setTabValue] = useState('LONG');
  const [orderType, setOrderType] = useState('MARKET');
  const [leverage, setLeverage] = useState(5);
  const [confettiSource, setConfettiSource] = useState({
    x: 0,
    y: 0,
    w: 200,
    h: 200,
  });

  const [buttonClicked, setButtonClicked] = useState(false);

  const audioRef = useRef(null);
  const buttonRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLeverageChange = (event, newValue) => {
    setLeverage(newValue);
  };

  const handleOrderType = (event) => {
    setOrderType(event.target.value);
  };

  const handleClickBuy = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }

    setButtonClicked(true);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setConfettiSource({
        x: rect.left + rect.width / 2 - 100,
        y: rect.top + rect.height / 2 - 100,
        w: 200,
        h: 200,
      });
    }

    setTimeout(() => {
      setButtonClicked(false);
    }, 5000);
  };

  return (
    <Box
      p={3}
      pt={0}
      bgcolor='#161514'
      color='white'
      fontFamily={'IBM Plex Mono'}
      padding='8px '>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        fontFamily={'IBM Plex Mono'}
        textColor='inherit'
        indicatorColor='transparent'
        sx={{ minHeight: '40px' }}>
        <Tab
          value='LONG'
          label='LONG'
          fontFamily={'IBM Plex Mono'}
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: 'IBM Plex Mono',
            lineHeight: '16.8px',
            width: '50%',
            padding: '8px 0',
            color: tabValue === 'LONG' ? '#FF5A44' : 'white',
            borderBottom: tabValue === 'LONG' ? '2px solid #FF5A44' : 'none',
            '&:hover': {
              color: '#FF5A44',
            },
          }}
        />
        <Tab
          value='SHORT'
          label='SHORT'
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '16.8px',
            fontFamily: 'IBM Plex Mono',
            width: '50%',
            padding: '8px 0',
            color: tabValue === 'SHORT' ? '#FF5A44' : 'white',
            borderBottom: tabValue === 'SHORT' ? '2px solid #FF5A44' : 'none',
            '&:hover': {
              color: '#FF5A44',
            },
          }}
        />
      </Tabs>

      {/* Order Type Select */}
      <div style={{ margin: '10px 0' }}>
        <Box display='flex' mt={3} justifyContent='space-between' mb={'2px'}>
          <Typography
            fontFamily={'IBM Plex Mono'}
            fontSize='14px'
            fontWeight={400}
            lineHeight='19.6px'>
            Order Type
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              color='#AEADAD'
              fontWeight={400}
              fontFamily={'IBM Plex Mono'}
              fontSize='14px'
              lineHeight='19.6px'>
              Open Price
            </Typography>
            <Typography
              style={{ fontFamily: 'IBM Plex Mono' }}
              fontWeight={400}
              fontSize='14px'
              lineHeight='18px'>
              30,021.29 USDC
            </Typography>
          </div>
        </Box>

        <Select
          labelId='demo-multiple-name-label'
          fullWidth
          value={orderType}
          fontFamily={'IBM Plex Mono'}
          variant='filled'
          onChange={handleOrderType}
          IconComponent={() => (
            <InputAdornment position='end'>
              <IconButton>
                <RxCaretDown color='#AEADAD' />
              </IconButton>
            </InputAdornment>
          )}
          sx={{
            backgroundColor: '#1A1A1A',
            fontFamily: 'IBM Plex Mono',
            width: '196px',
            height: '48px',
            color: '#AEADAD',
            border: 'none',

            '& .MuiSelect-select': {
              padding: '12px 14px',
              paddingLeft: '4px',
              paddingRight: '4px',
              ml: 1,
              '&:focus': {
                outline: 'none',
              },
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#AEADAD',
              },
            },
            '&:before': {
              border: 'none',
            },
            '&:after': {
              border: 'none',
            },
            '& .MuiFilledInput-underline:before': {
              borderBottom: 'none',
            },
            '& .MuiFilledInput-underline:after': {
              borderBottom: 'none',
            },
          }}>
          <MenuItem
            sx={{ fontFamily: 'IBM Plex Mono' }}
            value='MARKET'
            color='#AEADAD'>
            MARKET
          </MenuItem>
          <MenuItem
            sx={{ fontFamily: 'IBM Plex Mono' }}
            value='LIMIT'
            color='#AEADAD'>
            LIMIT
          </MenuItem>
        </Select>
      </div>

      <div style={{ margin: '10px 0' }}>
        <Box mt={3} mb='2px'>
          <Typography
            mb='2px'
            fontSize='14px'
            fontFamily={'IBM Plex Mono'}
            fontWeight={400}
            lineHeight='19.6px'>
            Size
          </Typography>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='0 USDC'
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography fontSize='8.66px' color='#AEADAD'>
                      USDC
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              backgroundColor: '#1A1A1A',
              borderRadius: '2px',
              marginBottom: '8px',
              height: '48px',

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
          />
          <Typography
            fontSize={'14px'}
            fontFamily={'IBM Plex Mono'}
            fontWeight={400}
            lineHeight='19.6px'
            color='#898989'>
            Up to 1,458.173
          </Typography>
        </Box>
      </div>

      <Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography
            fontSize='14px'
            fontFamily={'IBM Plex Mono'}
            fontWeight={400}
            lineHeight='19.6px'
            mt={1}
            color='#AEADAD'>
            Leverage
          </Typography>
          <Typography
            mt={1}
            color='#F2F1F0'
            fontFamily={'IBM Plex Mono'}
            fontWeight={700}
            fontSize='14px'
            letterSpacing='2%'
            lineHeight='18.2px'>
            {leverage} X
          </Typography>
        </Box>
        <Slider
          aria-label='Small steps'
          fontFamily={'IBM Plex Mono'}
          defaultValue={5}
          onChange={handleLeverageChange}
          step={1}
          marks={marks}
          value={leverage}
          min={2}
          max={128}
          valueLabelDisplay='auto'
          sx={{
            height: '13px',
            borderRadius: '0px',
            '& .MuiSlider-markLabel': {
              fontSize: '10px',
              fontWeight: '400',
              lineHeight: '15px',
              textAlign: 'right',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: '10px',
            },
            '& .MuiSlider-track': {
              backgroundColor: (value) =>
                value > -0.00000005 ? '#1A1A1A' : '#4BC2A3',
            },
            '& .MuiSlider-thumb': {
              '&:before': {
                backgroundColor: '#AEADAD',
              },
            },
          }}
        />
      </Box>

      {/* Additional Information */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}>
        <Typography
          fontSize='14px'
          fontWeight={400}
          fontFamily={'IBM Plex Mono'}
          lineHeight='19.6px'
          color='#AEADAD'>
          Liquidation Price
        </Typography>
        <Typography
          fontFamily={'IBM Plex Mono'}
          color='#F2F1F0'
          fontSize='14px'
          fontWeight={400}>
          300,212 USDC
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}>
        <Typography
          lineHeight='19.6px'
          fontFamily={'IBM Plex Mono'}
          fontSize='14px'
          fontWeight={400}
          color='#AEADAD'>
          Slippage
        </Typography>
        <Typography
          fontFamily={'IBM Plex Mono'}
          color='#F2F1F0'
          fontSize='14px'
          fontWeight={400}>
          1.20 USDC (0.3%)
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}>
        <Typography
          lineHeight='19.6px'
          fontSize='14px'
          fontWeight={400}
          fontFamily={'IBM Plex Mono'}
          color='#AEADAD'>
          Fee
        </Typography>
        <Typography
          fontFamily={'IBM Plex Mono'}
          fontSize='14px'
          fontWeight={400}>
          2.00 USDC (0.05%)
        </Typography>
      </div>

      {/* Advanced Select */}
      <Select
        labelId='demo-multiple-name-label'
        fullWidth
        variant='filled'
        value={orderType}
        onChange={handleOrderType}
        IconComponent={() => (
          <InputAdornment position='end'>
            <IconButton>
              <RxCaretDown color='#AEADAD' />
            </IconButton>
          </InputAdornment>
        )}
        sx={{
          margin: '5px 0',
          backgroundColor: '#161514',
          fontFamily: 'IBM Plex Mono',
          color: '#AEADAD',
          border: 'none',
          height: '24px',

          '& .MuiSelect-select': {
            padding: '12px 14px',
            paddingLeft: '4px',
            paddingRight: '4px',
            ml: 0,
            '&:focus': {
              outline: 'none',
            },
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#AEADAD',
            },
          },
          '&:before': {
            border: 'none',
          },
          '&:after': {
            border: 'none',
          },
          '& .MuiFilledInput-underline:before': {
            borderBottom: 'none',
          },
          '& .MuiFilledInput-underline:after': {
            borderBottom: 'none',
          },
        }}>
        <MenuItem
          value='MARKET'
          color='#AEADAD'
          sx={{
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#AEADAD',
            },
          }}>
          Advanced
        </MenuItem>
      </Select>

      {/* Buy Button */}
      <Button
        fullWidth
        ref={buttonRef}
        onClick={handleClickBuy}
        sx={{
          fontFamily: 'IBM Plex Mono',
          fontWeight: 400,
          fontSize: '14px',
        }}
        variant='contained'
        style={{
          background: '#4BC2A3',
          height: '44px',
          borderRadius: '2px',
          padding: '11px 16px 11px 16px',
          marginTop: '25px',
        }}
        size='large'>
        {buttonClicked ? 'YOU JUST EARNED 200 ZK-TOKENS' : 'BUY / LONG'}
      </Button>

      {/* Audio Element */}
      <audio ref={audioRef} src='ping.mp3' preload='auto' />

      {/* Confetti Component */}
      {buttonClicked && (
        <Confetti
          confettiSource={confettiSource}
          tweenDuration={100}
          recycle={false}
          colors={['#4BC2A3']}
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
          }}
        />
      )}
    </Box>
  );
};

export default OrderForm;
