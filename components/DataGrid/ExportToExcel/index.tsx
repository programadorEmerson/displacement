/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { ListAlt } from '@mui/icons-material';
import { Button } from '@mui/material';

import useIsMobileDevice from '@/hooks/useDeviceType';

import FileSaver from 'file-saver';
import { writeXLSX, utils } from 'xlsx';

interface ExportData {
  apiData: any
  fileName: string
}

const ExportToExcel = ({ apiData, fileName }: ExportData) => {
  const { type } = useIsMobileDevice();
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToXlsx = () => {
    const spreadsheet = utils.json_to_sheet(apiData);
    const spreadsheetContent = {
      Sheets: { data: spreadsheet },
      SheetNames: ['data']
    };
    const excelBuffer = writeXLSX(spreadsheetContent, {
      bookType: 'xlsx',
      type: 'array'
    });
    const newArchive = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(newArchive, fileName + fileExtension);
  };

  return (
    <Button
      sx={{ fontSize: '0.85rem', paddingBottom: '0.5rem' }}
      onClick={() => {
        exportToXlsx();
      }}
    >
      <ListAlt
        style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}
        color="primary"
      />
      {type === 'mobile' ? 'XLSX' : 'GERAR XLSX'}
    </Button>
  );
};

export { ExportToExcel };
