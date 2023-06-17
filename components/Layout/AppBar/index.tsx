import React, { type ReactNode } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import useDeviceType from '@/hooks/useDeviceType';

import DrawerHeaderApp from '../Menu';
import { AppBar, DrawerHeader, StyledHeader } from '../styles';

interface MenuDrawerProps {
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

export default function MenuDrawer({ children, open, setOpen }: MenuDrawerProps) {
  const { type } = useDeviceType();

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  return (
    <Box>
      <AppBar
        position="fixed"
        open={open}
      >
        <StyledHeader
          type={type}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: '0.7rem',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            className="container-header"
            data-testid="container-header"
          >
            <Typography
              variant="h6"
              gutterBottom
              m={0}
            >
              Deslocamento App
            </Typography>

          </Box>
        </StyledHeader>
      </AppBar>
      <DrawerHeaderApp
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <Box
        className="content-children"
        component="main"
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
