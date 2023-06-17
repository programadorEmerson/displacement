import React from 'react';

import { NextPage } from 'next';

import { Box, Button } from '@mui/material';

const IndexPage: NextPage = () => (
  <Box>
    <Button variant="contained"
      color="primary">
      Hello World
    </Button>
  </Box>
);

export default IndexPage;
