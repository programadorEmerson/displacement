import React, { FC } from 'react';

import { Add } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';

import { ItemGrid } from '@/styles/pages/shared.styles';

import useClientContext from '@/hooks/useClientContext';
import useDeviceType from '@/hooks/useDeviceType';

type TitleSectionProps = {
  title: string;
}

const TitleSection: FC<TitleSectionProps> = ({ title }) => {
  const { isMobile } = useDeviceType();
  const { handleShowDialogClient } = useClientContext();
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
            onClick={() =>
              handleShowDialogClient(true)}
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
