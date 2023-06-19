/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type FC } from 'react';

import { Grid } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarFilterButton
} from '@mui/x-data-grid';

import { ExportToCsv } from '@/components/DataGrid/ExportToCsv';
import { ExportToExcel } from '@/components/DataGrid/ExportToExcel';

import { CustomGridToolbarContainer } from './styles';

interface CustomToolbarProps {
  exportxlsx?: boolean
  exportFileName?: string
  data: any[]
}

export const CustomToolbar: FC<CustomToolbarProps> = ({
  exportxlsx = true,
  exportFileName = document.title,
  data
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomGridToolbarContainer>
          <GridToolbarColumnsButton
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          />
          <GridToolbarFilterButton
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          />
          {exportxlsx && (
            <ExportToExcel apiData={data} fileName={exportFileName} />
          )}
          {exportxlsx && (
            <ExportToCsv apiData={data} fileName={exportFileName} />
          )}
        </CustomGridToolbarContainer>
      </Grid>
    </Grid>
  );
};
