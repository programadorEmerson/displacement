import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import DialogClient from '@/components/Client/DialogData';
import { CustomNoResultsOverlay } from '@/components/DataGrid/CustomNoResultsOverlay';
import { CustomToolbar } from '@/components/DataGrid/CustomToolbar';
import LoadingProgress from '@/components/DataGrid/LoadingProgress';
import PaginationFooter from '@/components/DataGrid/Pagination';
import { TooltipCustom } from '@/components/DataGrid/styled';
import Layout from '@/components/Layout';
import { Loading } from '@/components/Loading';
import TitleSection from '@/components/TitleSection';

import { StyledPaper } from '@/styles/pages/client';
import {
  StyledButtonContainer, StyledContainerPage,
  StyledDataGrid, StyledLimitPage
} from '@/styles/pages/shared.styles';

import { Client } from '@/contexts/client';

import useClientContext from '@/hooks/useClientContext';

import returnColorRow from 'utils/returnColorRow';

const itemPerPage = 5;

const Client: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    getClients, clients, handleSelectClient,
    dataExport, fetching, deleteClient
  } = useClientContext();

  useEffect(() => {
    getClients();
  }, [getClients]);

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Ações',
      align: 'center',
      headerAlign: 'center',
      type: 'string',
      filterable: false,
      sortable: false,
      disableExport: true,
      width: 150,
      renderCell: ({ row }) => {
        const { id } = row as Client;
        return (
          <StyledButtonContainer>
            <IconButton onClick={() => handleSelectClient(id)} >
              <TooltipCustom
                title="Editar"
                placement="right"
                disableHoverListener={false}
              >
                <Edit />
              </TooltipCustom>
            </IconButton>
            <IconButton onClick={() => deleteClient(id)} >
              <TooltipCustom
                title="Excluir"
                placement="right"
                disableHoverListener={false}
              >
                <Delete />
              </TooltipCustom>
            </IconButton>
          </StyledButtonContainer>
        );
      }
    },
    {
      field: 'nome',
      headerName: 'Cliente',
      width: 330,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'logradouro',
      headerName: 'Endereço',
      width: 330,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { logradouro, numero, bairro } = row as Client;
        return (
          <span>
            {`${logradouro}, ${numero} - ${bairro}`}
          </span>
        );
      },
    },
    {
      field: 'cidade',
      headerName: 'Cidade',
      width: 250,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { cidade, uf } = row as Client;
        return (
          <span>
            {`${cidade} - ${uf}`}
          </span>
        );
      },
    },
    {
      field: 'numeroDocumento',
      headerName: 'Documento',
      width: 250,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { numeroDocumento, tipoDocumento } = row as Client;
        return (
          <span>
            {`${tipoDocumento}: ${numeroDocumento}`}
          </span>
        );
      },
    },
  ];

  return (
    <Layout title='Clientes'>
      <Loading trigger={fetching} message="Recuperando clientes..." />
      <StyledContainerPage>
        <StyledLimitPage>
          <DialogClient />
          <TitleSection title='Clientes' />
          <StyledPaper elevation={3}>
            <StyledDataGrid
              rows={clients}
              columns={columns}
              pageSize={itemPerPage}
              page={currentPage}
              rowsPerPageOptions={[itemPerPage]}
              disableSelectionOnClick
              getRowClassName={({ row }) => returnColorRow(row.id)}
              components={{
                Toolbar: () => {
                  return CustomToolbar({
                    data: dataExport,
                    exportFileName: 'Lista de clientes',
                  });
                },
                Footer: () => {
                  return (
                    <PaginationFooter
                      currentPage={currentPage}
                      numberOfPages={Math.ceil(clients.length / itemPerPage)}
                      setCurrentPage={setCurrentPage}
                    />
                  );
                },
                NoResultsOverlay: () => {
                  if (fetching) return <LoadingProgress />;
                  return <CustomNoResultsOverlay label="Nenhum pagamento localizado" />;
                },
                NoRowsOverlay: () => {
                  if (fetching) return <LoadingProgress />;
                  return <CustomNoResultsOverlay label="Nenhum pagamento localizado" />;
                }
              }}
            />
          </StyledPaper>
        </StyledLimitPage>
      </StyledContainerPage>
    </Layout>
  );
};

export default Client;
