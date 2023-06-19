import React from 'react';

import { Grid, TextField, type TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { ItemGrid } from '@/styles/pages/shared.styles';

import { type FormikProps } from 'formik';

import ShowPopoverMessage from './ShowPopoverInfo';

interface InputTextProps<T> {
  formik: FormikProps<T>
  keyName: keyof T & string
  isDisabled: boolean
  enableFutureDates: boolean
  label: string
  xs?: number
  sm: number
}

const InputDate: <T>(props: InputTextProps<T>) => JSX.Element =
  ({ xs = 12, ...rest }) => {
    const fieldTouched = Boolean(rest.formik.touched[rest.keyName]);
    const error = rest.formik.errors[rest.keyName];
    const hasError = Boolean(error && fieldTouched);
    return (
      <Grid item xs={xs} sm={rest.sm}>
        <ItemGrid justify='center'>
          <DatePicker
            disabled={rest.isDisabled}
            className="datePicker"
            label={rest.label}
            maxDate={rest.enableFutureDates ? undefined : new Date()}
            openTo="month"
            views={['year', 'month', 'day']}
            value={rest.formik.values[rest.keyName]}
            inputFormat='DD/MM/YYYY'
            onChange={(value) => {
              try {
                rest.formik.setFieldValue(rest.keyName, value?.toISOString());
              } catch (error) {
                rest.formik.setFieldValue(rest.keyName, '');
              }
            }}
            renderInput={(props: TextFieldProps) => (
              <TextField {...props}
                fullWidth
                id={rest.keyName}
                name={rest.keyName}
                error={hasError}
                helperText={hasError && <ShowPopoverMessage message={String(error)} />}
              />
            )}
          />
        </ItemGrid>
      </Grid>
    );
  };

export default InputDate;
