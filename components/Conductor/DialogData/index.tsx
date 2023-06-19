/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, forwardRef, useEffect } from 'react';

import { Save } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';

import InputDate from '@/components/Inputs/InputDate';
import InputNumber from '@/components/Inputs/InputNumber';
import InputText from '@/components/Inputs/InputText';

import { FormDefault, ItemGrid } from '@/styles/pages/shared.styles';

import { Conductor } from '@/contexts/conductor';

import useConductorContext from '@/hooks/useConductorContext';

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

const initialValues: Conductor = {
  id: 0,
  nome: '',
  numeroHabilitacao: '',
  catergoriaHabilitacao: '',
  vencimentoHabilitacao: new Date().toISOString(),
};

const validationSchema = yup.object<Conductor>({
  nome: yup.string().required('Informe o nome do conductor'),
  numeroHabilitacao: yup.string().required('Informe o número da habilitação'),
  catergoriaHabilitacao: yup.string().required('Informe a categoria da habilitação'),
  vencimentoHabilitacao: yup.string().required('Informe a data de vencimento da habilitação'),
});

const DialogConductor: FC = () => {
  const {
    openDialogConductor, handleShowDialogConductor,
    conductor, fetching, createConductor, updateConductor
  } = useConductorContext();

  const editMode = Boolean(conductor);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      if (editMode) {
        return updateConductor(values.id, values);
      }
      createConductor(values);
    }
  });

  useEffect(() => {
    if (conductor) {
      formik.setValues(conductor);
    }
    console.log(conductor);
  }, [conductor]);

  useEffect(() => {
    if (!openDialogConductor) formik.resetForm();
  }, [openDialogConductor]);

  return (
    <Dialog
      keepMounted
      fullWidth
      maxWidth="md"
      open={openDialogConductor}
      TransitionComponent={Transition}
      onClose={() => handleShowDialogConductor(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {editMode ? `Editar condutor: ${formik.values.nome}` : 'Novo condutor'}
      </DialogTitle>
      <DialogContent>
        <FormDefault onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <Grid container spacing={1}>
            <InputText formik={formik}
              keyName='nome'
              label="Informe seu nome"
              isDisabled={fetching || editMode}
              sm={8}
            />
            <InputNumber
              formik={formik}
              keyName='numeroHabilitacao'
              label="Informe o número da habilitação"
              isDisabled={fetching || editMode}
              sm={4}
            />
            <InputText formik={formik}
              keyName='catergoriaHabilitacao'
              label="Informe a categoria da habilitação"
              isDisabled={fetching}
              sm={4}
            />
            <InputDate
              formik={formik}
              keyName='vencimentoHabilitacao'
              label="Vencimento da habilitação"
              enableFutureDates
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

export default DialogConductor;
