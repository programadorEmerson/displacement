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
import InputSelect from '@/components/Inputs/InputSelect';
import InputText from '@/components/Inputs/InputText';

import { FormDefault, ItemGrid } from '@/styles/pages/shared.styles';

import { Client } from '@/contexts/client';

import useClientContext from '@/hooks/useClientContext';
import useGetLocations from '@/hooks/useGetLocation';

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

const initialValues: Client = {
  id: 0,
  numeroDocumento: '',
  tipoDocumento: '',
  nome: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: '',
  uf: '',
};

const validationSchema = yup.object<Client>({
  numeroDocumento: yup.string().required('Informe o número do documento'),
  tipoDocumento: yup.string().required('Informe o tipo do documento'),
  nome: yup.string().required('Informe o nome do cliente'),
  logradouro: yup.string().required('Informe o logradouro'),
  numero: yup.string().required('Informe o número'),
  bairro: yup.string().required('Informe o bairro'),
  cidade: yup.string().required('Informe a cidade'),
  uf: yup.string().required('Informe o estado'),
});

const DialogClient: FC = () => {
  const {
    openDialogClient, handleShowDialogClient,
    client, fetching, createClient, updateClient
  } = useClientContext();

  const editMode = Boolean(client);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      if (editMode) {
        return updateClient(values.id, values);
      }
      createClient(values);
    }
  });

  const { states, cities, defaultCity } = useGetLocations({
    state: formik.values.uf,
    city: formik.values.cidade
  });

  useEffect(() => {
    formik.setFieldValue('cidade', defaultCity);
  }, [defaultCity]);

  useEffect(() => {
    if (client) formik.setValues(client);
  }, [client]);

  useEffect(() => {
    if (!openDialogClient) formik.resetForm();
  }, [openDialogClient]);

  return (
    <Dialog
      keepMounted
      fullWidth
      maxWidth="md"
      open={openDialogClient}
      TransitionComponent={Transition}
      onClose={() => handleShowDialogClient(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {editMode ? `Editar cliente: ${formik.values.nome}` : 'Novo cliente'}
      </DialogTitle>
      <DialogContent>
        <FormDefault onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <Grid container spacing={1}>
            <InputSelect formik={formik}
              keyName='tipoDocumento'
              label="Tipo de documento"
              items={['Cpf', 'Cnpj']}
              isDisabled={fetching}
              sm={3}
            />
            <InputText formik={formik}
              keyName='nome'
              label="Informe seu nome"
              isDisabled={fetching}
              sm={5}
            />
            <InputNumber
              formik={formik}
              keyName='numeroDocumento'
              label="Informe o documento"
              mask={formik.values.tipoDocumento === 'Cpf'
                ? '###.###.###-##'
                : '##.###.###/####-##'}
              fixedDecimalScale
              isDisabled={fetching}
              prefix='R$ '
              sm={4}
            />
            <InputText formik={formik}
              keyName='logradouro'
              label="Informe seu endereço"
              isDisabled={fetching}
              sm={6}
            />
            <InputText formik={formik}
              keyName='numero'
              label="Número"
              isDisabled={fetching}
              sm={2}
            />
            <InputText formik={formik}
              keyName='bairro'
              label="Bairro"
              isDisabled={fetching}
              sm={4}
            />
            <InputSelect formik={formik}
              keyName='uf'
              label="Informe o estado"
              items={states}
              isDisabled={fetching}
              sm={3}
            />
            <InputSelect formik={formik}
              keyName='cidade'
              label="Informe a cidade"
              items={cities}
              isDisabled={fetching}
              sm={5}
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

export default DialogClient;
