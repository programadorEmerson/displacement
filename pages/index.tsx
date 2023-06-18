import React from 'react';

import { NextPage } from 'next';

import { Button } from '@mui/material';

import Layout from '@/components/Layout';

import useClientContext from '@/hooks/useClientContext';

const IndexPage: NextPage = () => {
  const { getClients } = useClientContext();

  return (
    <Layout title='Home Page'>
      <Button
        variant="contained"
        color="primary"
        onClick={getClients}
      >
        Hello World
      </Button>
    </Layout>
  );
};

export default IndexPage;
