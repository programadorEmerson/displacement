import React from 'react';

import { NextPage } from 'next';

import { Button } from '@mui/material';

import Layout from '@/components/Layout';

import useConductorContext from '@/hooks/useConductorContext';

const IndexPage: NextPage = () => {
  const { getConductors } = useConductorContext();

  return (
    <Layout title='Home Page'>
      <Button
        variant="contained"
        color="primary"
        onClick={getConductors}
      >
        Hello World
      </Button>
    </Layout>
  );
};

export default IndexPage;
