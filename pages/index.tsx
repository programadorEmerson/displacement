import React from 'react';

import { NextPage } from 'next';

import { Button } from '@mui/material';

import Layout from '@/components/Layout';

import useDisplacementContext from '@/hooks/useDisplacementContext';

const IndexPage: NextPage = () => {
  const { getDisplacements } = useDisplacementContext();

  return (
    <Layout title='Home Page'>
      <Button
        variant="contained"
        color="primary"
        onClick={getDisplacements}
      >
        Hello World
      </Button>
    </Layout>
  );
};

export default IndexPage;
