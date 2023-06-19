import { styled } from '@mui/system';

export const CustomCSVLink = styled('div')`
  display: flex;
  transition: all 0.3s ease-in-out;
  padding: 0.4rem;

  .csv-export {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 0.85rem;
  }

  &:hover {
    background-color: rgba(236, 240, 241, 0.5);
  }
`;
