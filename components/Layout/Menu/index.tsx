import React, { type FC } from 'react';

import { Close } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';

import useMenuApp from '@/hooks/useMenuApp';

import { Drawer, DrawerHeader } from '../styles';
import { SiderbarListItem } from './SiderbarListItem';

interface DrawerProps {
  open: boolean
  handleDrawerClose: () => void
}

const DrawerHeaderApp: FC<DrawerProps> = ({ open, handleDrawerClose }) => {
  const returnAppMenu = useMenuApp();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction !== 'rtl' && <Close />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <List sx={{ marginLeft: '0.3rem' }}>
          {returnAppMenu.map((menu, index) => (
            <SiderbarListItem showTooltip={open}
              key={`${index}`}
              menu={menu} />
          ))}
        </List>
      </List>
    </Drawer>
  );
};

export default DrawerHeaderApp;
