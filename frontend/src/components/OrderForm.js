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
} from '@mui/material';
import { useState, useRef } from 'react';
import { RxCaretDown } from 'react-icons/rx';
import Confetti from 'react-confetti';

const OrderForm = () => {
  const [tabValue, setTabValue] = useState('LONG');
  const [orderType, setOrderType] = useState('MARKET');
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

  const handleOrderType = (event) => {
    setOrderType(event.target.value);
  };

  const handleClickBuy = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }

    setButtonClicked(true);
    // Capture the button's position
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setConfettiSource({
        x: rect.left + rect.width / 2 - 100, // Center the confetti
        y: rect.top + rect.height / 2 - 100, // Center the confetti
        w: 200,
        h: 200,
      });
    }

    setTimeout(() => {
      setButtonClicked(false);
    }, 5000);
  };

  return (
    <Box p={3} bgcolor='#161514' color='white' height={'600px'}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor='inherit'
        indicatorColor='transparent'>
        <Tab
          value='LONG'
          label='LONG'
          sx={{
            width: '50%',
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
            width: '50%',
            color: tabValue === 'SHORT' ? '#FF5A44' : 'white',
            borderBottom: tabValue === 'SHORT' ? '2px solid #FF5A44' : 'none',
            '&:hover': {
              color: '#FF5A44',
            },
          }}
        />
      </Tabs>

      {/* Order Type Select */}
      <div style={{ margin: '15px 0' }}>
        <Typography fontSize='14px' mb={2}>
          Order Type
        </Typography>
        <Select
          labelId='demo-multiple-name-label'
          fullWidth
          value={orderType}
          onChange={handleOrderType}
          IconComponent={() => (
            <InputAdornment position='end'>
              <IconButton>
                <RxCaretDown />
              </IconButton>
            </InputAdornment>
          )}
          sx={{
            backgroundColor: '#1A1A1A',
            color: 'white',
            border: 'none',
            '& .MuiSelect-select': {
              padding: '12px 14px',
              '&:focus': {
                outline: 'none',
              },
            },
          }}>
          <MenuItem value='MARKET'>MARKET</MenuItem>
          <MenuItem value='LIMIT'>LIMIT</MenuItem>
        </Select>
      </div>

      {/* Size Input */}
      <div style={{ margin: '15px 0' }}>
        <Typography fontSize='14px' mb={2}>
          Size
        </Typography>
        <TextField
          fullWidth
          variant='outlined'
          placeholder='0 USDC'
          sx={{
            backgroundColor: '#1A1A1A',
            borderRadius: '5px',
            marginBottom: '16px',
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
        <Typography fontSize={'14px'} fontWeight={400} color='#898989'>
          Up to 1,458.173
        </Typography>
      </div>

      {/* Leverage Slider */}
      <Typography fontSize='14px' mb={2} color='#AEADAD'>
        Leverage
      </Typography>
      <Slider
        aria-label='Small steps'
        defaultValue={0.00000005}
        step={0.00000001}
        marks
        min={-0.00000005}
        max={0.0000001}
        valueLabelDisplay='auto'
      />

      {/* Additional Information */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}>
        <Typography fontSize='14px' fontWeight={400} color='#AEADAD'>
          Liquidation Price
        </Typography>
        <Typography fontSize='14px' fontWeight={400}>
          300,212 USDC
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}>
        <Typography fontSize='14px' fontWeight={400} color='#AEADAD'>
          Slippage
        </Typography>
        <Typography fontSize='14px' fontWeight={400}>
          1.20 USDC (0.3%)
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}>
        <Typography fontSize='14px' fontWeight={400} color='#AEADAD'>
          FEE
        </Typography>
        <Typography fontSize='14px' fontWeight={400}>
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
              <RxCaretDown />
            </IconButton>
          </InputAdornment>
        )}
        sx={{
          margin: '5px 0',
          backgroundColor: '#1A1A1A',
          color: 'white',
          border: 'none',
          '& .MuiSelect-select': {
            padding: '12px 14px',
            '&:focus': {
              outline: 'none',
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
        <MenuItem value='MARKET'>Advanced</MenuItem>
      </Select>

      {/* Buy Button */}
      <Button
        fullWidth
        ref={buttonRef}
        onClick={handleClickBuy}
        variant='contained'
        style={{ background: '#4BC2A3' }}
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
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.closePath();
          }}
        />
      )}
    </Box>
  );
};

export default OrderForm;
