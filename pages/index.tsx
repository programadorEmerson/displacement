import React from 'react';

import { NextPage } from 'next';

import { Button } from '@mui/material';

import Layout from '@/components/Layout';

import useVehicleContext from '@/hooks/useVehicleContext';

const IndexPage: NextPage = () => {
  const { getVehicles } = useVehicleContext();

  return (
    <Layout title='Home Page'>
      <Button
        variant="contained"
        color="primary"
        onClick={getVehicles}
      >
        Hello World
      </Button>
    </Layout>
  );
};

export default IndexPage;
