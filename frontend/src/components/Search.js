import { CiBellOn } from 'react-icons/ci';
import { Box, InputAdornment, TextField } from '@mui/material';
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
          height: { xs: '40px', sm: '48px' },
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
                <CiSearch />
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
        <CiBellOn fontSize='25px' />
        <span style={{ whiteSpace: 'nowrap' }}>0XFC...E63D1</span>{' '}
        {/* Prevent text wrapping */}
        <RxCaretDown />
      </Box>
    </Box>
  );
};

export default Search;
