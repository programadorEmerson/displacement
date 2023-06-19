import { styled } from '@mui/material';
import { GridOverlay } from '@mui/x-data-grid';

const CustomGridOverlay = styled(GridOverlay)`
  flex-direction: column;

  .ant-empty-img-1 {
    fill: ${({ theme }) =>
    theme.palette.mode === 'light' ? '#aeb8c2' : '#262626'};
  }

  .ant-empty-img-2 {
    fill: ${({ theme }) =>
    theme.palette.mode === 'light' ? '#f5f5f7' : '#595959'};
  }

  .ant-empty-img-3 {
    fill: ${({ theme }) =>
    theme.palette.mode === 'light' ? '#dce0e6' : '#434343'};
  }

  .ant-empty-img-4 {
    fill: ${({ theme }) =>
    theme.palette.mode === 'light' ? '#fff' : '#1c1c1c'};
  }

  .ant-empty-img-5 {
    fill-opacity: ${({ theme }) =>
    theme.palette.mode === 'light' ? 0.8 : 0.08};
    fill: ${({ theme }) =>
    theme.palette.mode === 'light' ? '#f5f5f5' : '#fff'};
  }
`;

export { CustomGridOverlay };
