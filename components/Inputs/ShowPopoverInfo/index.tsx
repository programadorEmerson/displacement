import React, { type FC, type MouseEvent, useState } from 'react';

import { Info } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

interface ShowPopoverMessageProps {
  message: string
}

const ShowPopoverMessage: FC<ShowPopoverMessageProps> = ({ message }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      display='flex'
      alignItems="center"
      justifyContent="flex-start"
      color="error.main"
    >
      <Typography mt={0.6} variant="caption" display="block" gutterBottom>
        *Ops!!! erro.
      </Typography>
      <IconButton
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ padding: '0px', marginLeft: '0.3rem' }}
      >

        <Info color='error' sx={{ fontSize: '1.2rem' }} />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{message}</Typography>
      </Popover>
    </Box>
  );
};

export default ShowPopoverMessage;
