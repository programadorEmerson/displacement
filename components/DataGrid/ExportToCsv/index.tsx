/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSVLink } from 'react-csv';

import { Reorder as ListAlt } from '@mui/icons-material';

import useIsMobileDevice from '@/hooks/useDeviceType';

import { CustomCSVLink } from './style';

interface ExportData {
  apiData: any
  fileName: string
}

export const ExportToCsv = ({ apiData, fileName }: ExportData) => {
  const { type } = useIsMobileDevice();
  return (
    <CustomCSVLink>
      <CSVLink data={apiData} filename={fileName} className="csv-export">
        <ListAlt
          style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}
          color="primary"
        />
        {type === 'mobile' ? 'CSV' : 'GERAR CSV'}
      </CSVLink>
    </CustomCSVLink>
  );
};
