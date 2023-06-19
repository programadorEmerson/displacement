import React from 'react';
import NumberFormat from 'react-number-format';

import { Grid, TextField } from '@mui/material';

import { ItemGrid } from '@/styles/pages/shared.styles';

import { type FormikProps } from 'formik';

import ShowPopoverMessage from './ShowPopoverInfo';

interface InputNumberProps<T> {
  formik: FormikProps<T>
  keyName: keyof T & string
  isDisabled: boolean
  label: string
  xs?: number
  sm: number
  readOnly?: boolean
  mask?: string
  prefix?: string
  sufix?: string
  hideError?: boolean
  fixedDecimalScale?: boolean
}

const InputNumber: <T>(props: InputNumberProps<T>) => JSX.Element =
  ({
    xs = 12, readOnly = false, mask = undefined, sufix = undefined, prefix = undefined,
    isDisabled = false, hideError = false, fixedDecimalScale = false,
    ...rest
  }) => {
    const fieldTouched = rest.formik.touched[rest.keyName];
    const error = rest.formik.errors[rest.keyName];
    const hasError = Boolean(error && fieldTouched);

    const handleSetFormikValues = (value: string | undefined, key: string) => {
      rest.formik.setFieldValue(key, value);
    };

    return (
      <Grid item xs={xs} sm={rest.sm}>
        <ItemGrid justify='center'>
          <NumberFormat
            fullWidth
            type="text"
            color="primary"
            variant="outlined"
            decimalScale={2}
            format={mask}
            suffix={sufix}
            prefix={prefix}
            id={rest.keyName}
            label={rest.label}
            name={rest.keyName}
            disabled={isDisabled}
            customInput={TextField}
            InputProps={{ readOnly }}
            error={(hasError && !hideError)}
            fixedDecimalScale={fixedDecimalScale}
            value={String(rest.formik.values[rest.keyName])}
            helperText={(hasError && !hideError) && <ShowPopoverMessage message={String(error)} />}
            onValueChange={(current) => { handleSetFormikValues(current.formattedValue, rest.keyName); }}
          />
        </ItemGrid>
      </Grid>
    );
  };

export default InputNumber;
