import React from 'react';

import { Autocomplete, Grid, TextField } from '@mui/material';

import { ItemGrid } from '@/styles/pages/shared.styles';

import { type FormikProps } from 'formik';

interface InputAutoCompleteProps<T> {
  formik: FormikProps<T>
  keyName: keyof T & string
  isDisabled: boolean
  label: string
  xs?: number
  sm: number
  items: string[]
  size?: 'small' | 'medium'
}

const InputAutoComplete: <T>(props: InputAutoCompleteProps<T>) => JSX.Element =
  ({ xs = 12, size = 'medium', ...rest }) => {

    return (
      <Grid item xs={xs} sm={rest.sm}>
        <ItemGrid justify='center'>
          <Autocomplete
            disablePortal
            id={rest.keyName}
            options={rest.items}
            size={size}
            fullWidth
            value={String(rest.formik.values[rest.keyName])}
            noOptionsText="Selecione um item"
            disabled={rest.isDisabled}
            onInputChange={(_, value) => {
              rest.formik.setFieldValue(rest.keyName, value);
            }}
            renderInput={(params) => (
              <TextField
                sx={{ marginTop: '0.2rem' }}
                name={rest.keyName}
                label={rest.label}
                {...params}
              />
            )}
          />
        </ItemGrid>
      </Grid>
    );
  };

export default InputAutoComplete;
