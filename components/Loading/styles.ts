import { styled, Alert, Box } from '@mui/material';

const AlertRoot = styled(Alert)`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.grey[50]};
  box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 10%);
`;

const ContentContainer = styled(Box)`
  display: flex;
  width: 100%;
  min-width: 15rem;
  height: 100%;
  min-height: 2.8rem;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export { AlertRoot, ContentContainer };
