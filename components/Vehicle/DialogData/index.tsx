/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, forwardRef, useEffect } from 'react';

import { Save } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';

import InputNumber from '@/components/Inputs/InputNumber';
import InputText from '@/components/Inputs/InputText';

import { FormDefault, ItemGrid } from '@/styles/pages/shared.styles';

import { VehicleContext } from '@/contexts/vehicle';

import useVehicleContext from '@/hooks/useVehicleContext';

import { useFormik } from 'formik';
import * as yup from 'yup';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues: VehicleContext = {
  id: 0,
  placa: '',
  marcaModelo: '',
  anoFabricacao: 0,
  kmAtual: 0,
};

const validationSchema = yup.object<VehicleContext>({
  placa: yup.string().required('Informe a placa do veículo'),
  marcaModelo: yup.string().required('Informe a marca e modelo do veículo'),
  anoFabricacao: yup.number()
    .min(1900, 'Informe um ano maior que 1900').required('Informe o ano de fabricação do veículo'),
  kmAtual: yup.number()
    .min(0, 'Informe um valor maior que 0').required('Informe a quilometragem atual do veículo'),
});

const DialogVehicle: FC = () => {
  const {
    openDialogVehicle, handleShowDialogVehicle,
    vehicle, fetching, createVehicle, updateVehicle
  } = useVehicleContext();

  const editMode = Boolean(vehicle);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      if (editMode) {
        return updateVehicle(values.id, values);
      }
      createVehicle(values);
    }
  });

  useEffect(() => {
    if (vehicle) {
      formik.setValues(vehicle);
    }
  }, [vehicle]);

  useEffect(() => {
    if (!openDialogVehicle) formik.resetForm();
  }, [openDialogVehicle]);

  return (
    <Dialog
      keepMounted
      fullWidth
      maxWidth="md"
      open={openDialogVehicle}
      TransitionComponent={Transition}
      onClose={() => handleShowDialogVehicle(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {editMode ? `Editar veículo: ${formik.values.placa}` : 'Novo veículo'}
      </DialogTitle>
      <DialogContent>
        <FormDefault onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <Grid container spacing={1}>
            <InputText formik={formik}
              keyName='placa'
              label="Informe a placa"
              isDisabled={fetching || editMode}
              sm={4}
            />
            <InputText formik={formik}
              keyName='marcaModelo'
              label="Informe a marca e modelo"
              isDisabled={fetching}
              sm={8}
            />
            <InputNumber
              formik={formik}
              keyName='anoFabricacao'
              label="Informe o ano de fabricação"
              isDisabled={fetching}
              sm={4}
            />
            <InputNumber
              formik={formik}
              keyName='kmAtual'
              label="Informe a quilometragem"
              isDisabled={fetching}
              sm={4}
            />
            <Grid item xs={12} sm={4}>
              <ItemGrid sx={{ height: '100%' }} justify="center">
                <Button
                  type='submit'
                  startIcon={<Save />}
                  sx={{ height: '100%' }}
                  fullWidth
                  variant="outlined">
                  Salvar dados
                </Button>
              </ItemGrid>
            </Grid>
          </Grid>
        </FormDefault>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVehicle;
