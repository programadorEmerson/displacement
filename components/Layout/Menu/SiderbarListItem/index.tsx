/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

import { useRouter } from 'next/router';

import { ListItemButton, ListItemText } from '@mui/material';

import { TooltipCustom } from '../../styles';
import { SpanName } from '../../styles';

type SiderbarListItemProps = {
  menu: {
    icon: JSX.Element;
    name: string;
    path: string;
    active: boolean;
    disabled: boolean;
  }
  showTooltip: boolean
}

export const SiderbarListItem: React.FC<SiderbarListItemProps> = ({
  menu,
  showTooltip
}) => {
  const { name, icon, path, active, disabled } = menu;

  const { push } = useRouter();

  return (
    <ListItemButton
      className={` ${active && 'selected-item'}}`}
      onClick={() => {
        if (!active) push(path);
      }}
      disabled={disabled}
      selected={active}
      sx={{ transition: 'all 0.4s ease-in-out' }}
    >
      <TooltipCustom
        title={name}
        placement="left"
        disableHoverListener={showTooltip}
      >
        {icon}
      </TooltipCustom>
      <ListItemText disableTypography>
        <SpanName
          variant="button"
          display="block"
          gutterBottom
          className={
            !active
              ? `active-menu-item ${active && 'selected-menu-item'}`
              : 'disabled-menu-item'
          }
        >
          {name}
        </SpanName>
      </ListItemText>
    </ListItemButton>
  );
};
