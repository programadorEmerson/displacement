import React, { type FC } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Divider, PaginationItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import {
  CustomContentFooter
} from './styles';

interface PaginationFooterProps {
  numberOfPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const PaginationFooter: FC<PaginationFooterProps> = ({
  numberOfPages,
  currentPage,
  setCurrentPage
}) => {
  const activePage = currentPage + 1;
  return (
    <Box>
      <Divider
        orientation="horizontal"
        color="#F0F2F5"
        style={{ margin: '15px 5px 0px 5px' }}
        flexItem
      />
      <CustomContentFooter>
        <Pagination
          count={numberOfPages}
          defaultPage={1}
          page={activePage}
          onChange={(_, page) => { setCurrentPage(page - 1); }
          }
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon
              }}
              {...item}
            />
          )}
        />
      </CustomContentFooter>
    </Box>
  );
};

export default PaginationFooter;
