import { Box, styled } from '@mui/material';

export const CustomContentFooter = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 1rem 0.3rem 0.2rem;
`;

export const CustomBoxText = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomDestakTextFooter = styled('span')`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export const CustomResultTextFooter = styled('span')`
  display: flex;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.palette.grey[600]};
`;
