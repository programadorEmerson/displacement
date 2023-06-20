import React, { useState, type ReactNode, useEffect } from 'react';

import { CalendarMonth, Cloud } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import useDeviceType from '@/hooks/useDeviceType';

import { format } from 'date-fns';

import ApiService from '../../../services/api';
import DrawerHeaderApp from '../Menu';
import { AppBar, DrawerHeader, StyledHeader } from '../styles';

type WatherForecast = {
  date: string,
  temperatureC: number,
  temperatureF: number,
  summary: string
}

interface MenuDrawerProps {
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

export default function MenuDrawer({ children, open, setOpen }: MenuDrawerProps) {
  const [weatherForecast, setWeatherForecast] = useState<string[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openCloud = Boolean(anchorEl);

  const { type } = useDeviceType();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    const getWeatherForecast = async () => {
      const api = new ApiService();
      const response = await api.get<WatherForecast[]>('WeatherForecast');
      const data = response.map((item) => (
        `${format(new Date(item.date), 'dd/MM/yyyy')} | ${item.temperatureC}°C | ${item.temperatureF}°F`
      ));
      setWeatherForecast(data);
    };
    getWeatherForecast();
  }, []);

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
            <Button startIcon={<Cloud sx={{ color: 'white' }} />} onClick={handleClick} variant="text">
              <Typography
                variant="h6"
                gutterBottom
                m={0}
                color='white'
                sx={{ fontSize: '1.1rem' }}
              >
                Previsão tempo
              </Typography>

            </Button>
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
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openCloud}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {weatherForecast.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            <ListItemIcon>
              <CalendarMonth fontSize="small" />
            </ListItemIcon>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
