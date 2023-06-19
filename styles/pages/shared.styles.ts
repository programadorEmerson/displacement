import { Box, styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const StyledContainerPage = styled(Box)`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  `;

export const StyledLimitPage = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  min-height: 91.5vh;
`;

export const ItemGrid = styled(Box) <{ justify: 'flex-end' | 'center' | 'flex-start' }>`
  padding: ${({ theme }) => theme.spacing(0.6)};
  text-align: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: ${({ justify }) => justify};
`;

export const StyledDataGrid = styled(DataGrid)`
  height: 76vh;
  &.MuiCheckbox-colorPrimary.Mui-checked {
    color: ${({ theme }) => theme.palette.primary.main};
  }
  border-color: transparent;
  .grey {
    background-color: #ebebeb;
  }
  .white {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`;

export const StyledButtonContainer = styled(Box)`
  display: flex;
  width: 100%;
  background: transparent;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(1)};

  button {
    background: transparent;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;

    i {
      font-size: 14px;
      padding-top: 8px;
      transition: 0.3s;

      :not(:disabled):hover {
        color: ${({ theme }) => theme.palette.info.main};
      }
    }
  }
`;

export const FormDefault = styled('form')`
  display: flex;
  width: 100%;
`;
