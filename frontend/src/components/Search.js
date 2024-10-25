import { CiBellOn } from 'react-icons/ci';
import { Box, InputAdornment, TextField } from '@mui/material';
import { CiSearch } from 'react-icons/ci';
import React from 'react';
import { RxCaretDown } from 'react-icons/rx';

const Search = () => {
  return (
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      display={'flex'}>
      <TextField
        sx={{
          borderRadius: '2px',
          height: '48px',
          backgroundColor: '#1A1A1A',
          '& .MuiOutlinedInput-root': {
            backgroundColor: '',
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
      <div
        style={{
          color: 'white',
          display: 'flex',
          width: '20%',
          marginLeft: '10px',
          gap: '5px',
        }}>
        <CiBellOn />
        <span>0XFC...E63D1</span>
        <RxCaretDown />
      </div>
    </Box>
  );
};

export default Search;
