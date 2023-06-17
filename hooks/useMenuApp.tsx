import React from 'react';

import { useRouter } from 'next/router';

import { PeopleAltRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material';

import Menu from '@/enums/menu';
import Navigation from '@/enums/navgation';

const useMenuApp = () => {
  const { asPath } = useRouter();
  const { palette } = useTheme();

  const props = { color: palette.primary.main, marginRight: '12px' };

  return [
    {
      name: Menu.CLIENT,
      path: Navigation.CLIENT,
      disabled: false,
      icon: <PeopleAltRounded sx={props} />,
      active: asPath.includes(Navigation.CLIENT),
    }
  ];

};

export default useMenuApp;
