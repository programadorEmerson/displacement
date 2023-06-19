import React from 'react';

import { useRouter } from 'next/router';

import { CoPresent, DriveEtaRounded, MultipleStop, PeopleAltRounded } from '@mui/icons-material';
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
    },
    {
      name: Menu.CONDUCTOR,
      path: Navigation.CONDUCTOR,
      disabled: false,
      icon: <CoPresent sx={props} />,
      active: asPath.includes(Navigation.CONDUCTOR),
    },
    {
      name: Menu.VEHICLE,
      path: Navigation.VEHICLE,
      disabled: false,
      icon: <DriveEtaRounded sx={props} />,
      active: asPath.includes(Navigation.VEHICLE),
    },
    {
      name: Menu.DISPLACEMENT,
      path: Navigation.DISPLACEMENT,
      disabled: false,
      icon: <MultipleStop sx={props} />,
      active: asPath.includes(Navigation.DISPLACEMENT),
    },
  ];

};

export default useMenuApp;
