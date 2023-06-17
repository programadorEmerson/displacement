import React, { FC, useState } from 'react';

import TitleApp from '@/components/Layout/TitleApp';

import useDeviceType from '@/hooks/useDeviceType';

import MenuDrawer from './AppBar';
import { StyledApp } from './styles';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const { type } = useDeviceType();

  return (
    <MenuDrawer
      open={open}
      setOpen={setOpen}
    >
      <TitleApp title={title} />
      <StyledApp type={type}
        className={`menu-${open ? 'opened' : 'closed'}`}>
        {children}
      </StyledApp>
    </MenuDrawer>
  );
};

export default Layout;
