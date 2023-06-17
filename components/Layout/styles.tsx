import {
  Box, Button, CSSObject, Theme,
  Tooltip, TooltipProps, Typography,
  styled, tooltipClasses
} from '@mui/material';
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps
} from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

export const drawerWidth = 220;

export const StyledApp = styled(Box) <{ type: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 91.5vh;
  transition: all 0.25s;

  &.menu-opened {
    margin-left: 220px;
    min-width: calc(100% - 220px);
  }

  &.menu-closed {
    margin-left: ${({ type }) => (type === 'mobile' ? '0px' : '4rem')};
    min-width: calc(100% - 4rem);
  }
`;

export const StyledButton = styled(Button)`
  background-color: transparent;
  font-size: 1rem;
  position: relative;
  font-family: "Righteous", cursive;
  color: ${({ theme }) => theme.palette.grey[700]};
  transition: all 0.3s ease-in-out;
`;

export const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props}
    arrow
    classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main
  }
}));

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: theme.spacing(0),
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  minHeight: '4rem',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export const StyledHeader = styled(Box) <{ type: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  background-size: contain;
  background-color: '#fff';
  transition: background-color 1s ease;

  .container-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: ${({ theme, type }) =>
    type === 'mobile' ? '100%' : `${theme.breakpoints.values.xl}px`};
    width: 100%;
    padding: 0.8rem;

    .slogan {
      font-family: "Righteous", cursive;
      color: ${({ theme }) => theme.palette.grey[800]};
      font-size: 1rem;
      text-transform: uppercase;
    }

    .user-info-bar {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        font-family: "Righteous", cursive;
        color: ${({ theme }) => theme.palette.grey[800]};

        &:hover {
          background-color: transparent;
          color: ${({ theme }) => theme.palette.grey[900]};
        }

        &:hover:after {
          content: "";
          display: flex;
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2px;
          opacity: 0.8;
          background-color: ${({ theme }) => theme.palette.grey[900]};
        }
      }

      .dash-button {
        color: ${({ theme }) => theme.palette.grey[900]};

        &:hover:after {
          display: none;
        }
      }

      img {
        border: 1px solid ${({ theme }) => theme.palette.grey[400]};
        border-radius: 50%;
      }
    }
  }
`;

export const SpanName = styled(Typography)`
  font-size: 14px;
  margin: 0 0 0 0.8rem;

  &.active-menu-item {
    color: ${({ theme }) => theme.palette.grey[800]};
    cursor: pointer;

    &.selected-menu-item {
      font-weight: bold;
    }
  }

  &.disabled-menu-item {
    color: ${({ theme }) => theme.palette.secondary.dark};
    opacity: 0.6;
    font-weight: 600;
    cursor: not-allowed;
    pointer-events: all;
  }
`;
