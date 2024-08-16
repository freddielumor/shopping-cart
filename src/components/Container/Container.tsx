import React from 'react';
import { Box } from '@mui/material';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#D3D3D3', 
        padding: '20px',
         maxWidth: '1024px',
         margin: '0 auto'
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
