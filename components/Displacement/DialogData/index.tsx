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
import InputSelect from '@/components/Inputs/InputSelect';
import InputText from '@/components/Inputs/InputText';

import { FormDefault, ItemGrid } from '@/styles/pages/shared.styles';

import { Displacement } from '@/contexts/displacement';

import useDisplacementContext from '@/hooks/useDisplacementContext';

import { useFormik } from 'formik';
import * as yup from 'yup';

type ComplementType = {
  condutorNome: string;
  veiculoPlaca: string;
  clienteNome: string;
  kmFinal: number;
  fimDeslocamento: string;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initDisplacement: Displacement & ComplementType = {
  id: 0,
  kmInicial: 0,
  inicioDeslocamento: '',
  checkList: '',
  motivo: '',
  observacao: '',
  idCondutor: 0,
  idVeiculo: 0,
  idCliente: 0,
  clienteNome: '',
  condutorNome: '',
  veiculoPlaca: '',
  kmFinal: 0,
  fimDeslocamento: '',
};

const DialogDisplacement: FC = () => {
  const {
    openDialogDisplacement, handleShowDialogDisplacement,
    displacement, fetching, createDisplacement, clients,
    updateDisplacement, vehicles, conductors
  } = useDisplacementContext();

  const editMode = Boolean(displacement);

  const schemaInitDisplacement = yup.object<Displacement>({
    kmInicial: yup.number().min(1, 'Informe a quilometragem inicial')
      .required('Informe a quilometragem inicial'),
    inicioDeslocamento: yup.string().required('Informe a data de início'),
    checkList: yup.string().required('Informe o check list'),
    motivo: yup.string().required('Informe o motivo'),
    idCondutor: yup.number().min(1, 'Informe o condutor'),
    idVeiculo: yup.number().min(1, 'Informe o veículo'),
    idCliente: yup.number().min(1, 'Informe o cliente'),
    kmFinal: yup.number().min(editMode ? 1 : 0, 'Informe a quilometragem final'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: schemaInitDisplacement,
    initialValues: initDisplacement,
    onSubmit: (values) => {
      if (editMode) {
        values.fimDeslocamento = new Date().toISOString();
        return updateDisplacement(values.id, values);
      }
      createDisplacement(values);
    }
  });

  useEffect(() => {
    if (displacement) {
      formik.setValues(displacement);
    }
  }, [displacement]);

  useEffect(() => {
    if (formik.values.condutorNome) {
      const conductor = conductors.find((item) => item.nome === formik.values.condutorNome);
      if (conductor) {
        formik.setFieldValue('idCondutor', conductor.id);
      }
    } else {
      formik.setFieldValue('idCondutor', 0);
    }
  }, [formik.values.clienteNome]);

  useEffect(() => {
    if (formik.values.veiculoPlaca) {
      const vehicle = vehicles.find((item) => item.placa === formik.values.veiculoPlaca);
      if (vehicle) {
        formik.setFieldValue('idVeiculo', vehicle.id);
      }
    } else {
      formik.setFieldValue('idVeiculo', 0);
    }
  }, [formik.values.veiculoPlaca]);

  useEffect(() => {
    if (formik.values.clienteNome) {
      const client = clients.find((item) => item.nome === formik.values.clienteNome);
      if (client) {
        formik.setFieldValue('idCliente', client.id);
      }
    } else {
      formik.setFieldValue('idCliente', 0);
    }
  }, [formik.values.clienteNome]);

  useEffect(() => {
    if (!openDialogDisplacement) formik.resetForm();
  }, [openDialogDisplacement]);

  return (
    <Dialog
      keepMounted
      fullWidth
      maxWidth="md"
      open={openDialogDisplacement}
      TransitionComponent={Transition}
      onClose={() => handleShowDialogDisplacement(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {editMode ? 'Finalizar deslocamento' : 'Novo deslocamento'}
      </DialogTitle>
      <DialogContent>
        <FormDefault onSubmit={formik.handleSubmit} onBlur={(e) => {
          const { name, value } = e.target;
          if (name === 'kmFinal' && !value) {
            formik.setFieldValue('kmFinal', 0);
          }
          formik.handleBlur(e);
        }}>
          <Grid container spacing={1}>
            <InputSelect formik={formik}
              keyName='veiculoPlaca'
              label="Veículo"
              items={vehicles.map((client) => (client.placa))}
              isDisabled={fetching || editMode}
              sm={4}
            />
            <InputSelect formik={formik}
              keyName='condutorNome'
              label="Condutor"
              items={conductors.map((client) => (client.nome))}
              isDisabled={fetching || editMode}
              sm={4}
            />
            <InputSelect formik={formik}
              keyName='clienteNome'
              label="Cliente"
              items={clients.map((client) => (client.nome))}
              isDisabled={fetching || editMode}
              sm={4}
            />
            <InputNumber
              formik={formik}
              keyName='kmInicial'
              label="Km inicial"
              isDisabled={fetching || editMode}
              sm={3}
            />
            <InputDate
              formik={formik}
              keyName='inicioDeslocamento'
              label="Data de início"
              enableFutureDates
              isDisabled={fetching || editMode}
              sm={3}
            />
            <InputText formik={formik}
              keyName='motivo'
              label="Informe o motivo"
              isDisabled={fetching || editMode}
              sm={6}
            />
            <InputText formik={formik}
              keyName='checkList'
              label="Informe o check list"
              isDisabled={fetching || editMode}
              sm={editMode ? 6 : 3}
            />
            {editMode && (
              <>
                <InputNumber
                  formik={formik}
                  keyName='kmFinal'
                  label="Km final"
                  isDisabled={fetching}
                  sm={6}
                />
              </>
            )}
            <InputText formik={formik}
              keyName='observacao'
              label="Observação"
              isDisabled={fetching}
              sm={editMode ? 9 : 6}
            />
            <Grid item xs={12} sm={3}>
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

export default DialogDisplacement;
