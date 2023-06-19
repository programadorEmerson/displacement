import React, { FC } from 'react';

import { Add } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';

import { ItemGrid } from '@/styles/pages/shared.styles';

import useDeviceType from '@/hooks/useDeviceType';

type TitleSectionProps = {
  title: string;
  showDialog: (open: boolean) => void;
}

const TitleSection: FC<TitleSectionProps> = ({ title, showDialog }) => {
  const { isMobile } = useDeviceType();
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <ItemGrid sx={{ padding: '1rem' }} justify='flex-start'>
          <Typography variant="h6" gutterBottom>
            {`${isMobile ? '' : 'Lista de '}${title}`}
          </Typography>
        </ItemGrid>
      </Grid>
      <Grid item xs={6}>
        <ItemGrid sx={{ padding: '1rem' }} justify='flex-end'>
          <Button
            onClick={() => showDialog(true)}
            startIcon={<Add />} variant="outlined"
          >
            {`Adicionar${isMobile ? '' : ' novo'}`}
          </Button>
        </ItemGrid>
      </Grid>
    </Grid>
  );
};

export default TitleSection;
