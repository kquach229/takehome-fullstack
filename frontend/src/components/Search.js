import { CiBellOn } from 'react-icons/ci';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { CiSearch } from 'react-icons/ci';
import React from 'react';
import { RxCaretDown } from 'react-icons/rx';

const Search = () => {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems='center'
      justifyContent='center'
      sx={{ gap: { xs: '10px', sm: '0' }, width: '100%' }}>
      <TextField
        sx={{
          borderRadius: '2px',
          height: '48px',
          fontWeight: '400',
          lineHeight: '16.8px',
          backgroundColor: '#1A1A1A',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <CiSearch
                  color='#818181'
                  style={{
                    top: '3px',
                    left: '3px',
                    width: '28px',
                    height: '28px',
                  }}
                />
              </InputAdornment>
            ),
          },
        }}
        type='text'
        placeholder='SEARCH'
        fullWidth
      />
      <Box
        sx={{
          color: '#AEADAD',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: { xs: '100%', sm: 'auto' },
          marginLeft: { sm: '10px' },
          gap: '5px',
        }}>
        <span style={{ top: '2.91px', left: '3.97px' }}>
          <CiBellOn
            fontSize='28px'
            color='#AEADAD'
            width='16.04px'
            height='16.87px'
          />
        </span>

        <Typography
          color='#F2F1F0'
          fontSize='14px'
          fontWeight={400}
          lineHeight='16.8px'>
          0XFC...E63D1
        </Typography>
        {/* Prevent text wrapping */}
        <RxCaretDown />
      </Box>
    </Box>
  );
};

export default Search;
