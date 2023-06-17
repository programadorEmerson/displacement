import React, { FC } from 'react';

import { Box } from '@mui/material';

import TitleApp from '@/components/Layout/TitleApp';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <Box>
      <TitleApp title={title} />
      {children}
    </Box>
  );
};

export default Layout;
