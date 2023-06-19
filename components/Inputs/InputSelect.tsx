import React from 'react';

import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { ItemGrid } from '@/styles/pages/shared.styles';

import { type FormikProps } from 'formik';

import ShowPopoverMessage from './ShowPopoverInfo';

interface InputTextProps<T> {
  formik: FormikProps<T>
  keyName: keyof T & string
  isDisabled: boolean
  label: string
  xs?: number
  sm: number
  items: string[]
  size?: 'small' | 'medium'
}

const InputSelect: <T>(props: InputTextProps<T>) => JSX.Element =
  ({ xs = 12, size = 'medium', ...rest }) => {
    const fieldTouched = Boolean(rest.formik.touched[rest.keyName]);
    const error = rest.formik.errors[rest.keyName];
    const hasError = Boolean(error && fieldTouched);
    const props = { color: hasError ? 'red' : 'primary' };

    return (
      <Grid item xs={xs} sm={rest.sm}>
        <ItemGrid justify='center'>
          <FormControl fullWidth>
            <InputLabel sx={{ ...props }} id={rest.keyName}>
              {rest.label}
            </InputLabel>
            <Select
              sx={{ textAlign: 'left' }}
              disabled={rest.isDisabled}
              labelId={rest.keyName}
              id={rest.keyName}
              name={rest.keyName}
              value={rest.formik.values[rest.keyName]}
              label={rest.label}
              onChange={rest.formik.handleChange}
              error={hasError}
              size={size}
            >
              {rest.items.map((item, index) => (
                <MenuItem key={`${index}-${item}`} value={item}>{item}</MenuItem>
              ))}
            </Select>
            {hasError && (
              <FormHelperText error>
                <ShowPopoverMessage message={String(error)} />
              </FormHelperText>
            )}
          </FormControl>
        </ItemGrid>
      </Grid>
    );
  };

export default InputSelect;
