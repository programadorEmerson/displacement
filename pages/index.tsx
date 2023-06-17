import React from 'react';

import { NextPage } from 'next';

import { Button } from '@mui/material';

import Layout from '@/components/Layout';

const IndexPage: NextPage = () => (
  <Layout title='Home Page'>
    <Button variant="contained"
      color="primary">
      Hello World
    </Button>
  </Layout>
);

export default IndexPage;
