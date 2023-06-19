import React, { type FC } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingProgress: FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <CircularProgress />
      <Typography mt={3} variant="body1" gutterBottom>
        Recuperando dados...
      </Typography>
    </Box>
  );
};

export default LoadingProgress;
