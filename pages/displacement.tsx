import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { CheckCircle, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { CustomNoResultsOverlay } from '@/components/DataGrid/CustomNoResultsOverlay';
import { CustomToolbar } from '@/components/DataGrid/CustomToolbar';
import LoadingProgress from '@/components/DataGrid/LoadingProgress';
import PaginationFooter from '@/components/DataGrid/Pagination';
import { TooltipCustom } from '@/components/DataGrid/styled';
import DialogDisplacement from '@/components/Displacement/DialogData';
import Layout from '@/components/Layout';
import { Loading } from '@/components/Loading';
import TitleSection from '@/components/TitleSection';

import { StyledPaper } from '@/styles/pages/displacement';
import {
  StyledButtonContainer, StyledContainerPage,
  StyledDataGrid, StyledLimitPage
} from '@/styles/pages/shared.styles';

import { Displacement } from '@/contexts/displacement';

import useDisplacementContext from '@/hooks/useDisplacementContext';

import { format } from 'date-fns';
import returnColorRow from 'utils/returnColorRow';

const itemPerPage = 10;

const Displacement: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    getDisplacements, displacements, handleSelectDisplacement,
    dataExport, fetching, deleteDisplacement, handleShowDialogDisplacement
  } = useDisplacementContext();

  useEffect(() => {
    getDisplacements();
  }, [getDisplacements]);

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
        const { id } = row as Displacement;
        return (
          <StyledButtonContainer>
            <IconButton onClick={() => {
              handleSelectDisplacement(id);
            }} >
              <TooltipCustom
                title="Finalizar"
                placement="right"
                disableHoverListener={false}
              >
                <CheckCircle />
              </TooltipCustom>
            </IconButton>
            <IconButton onClick={() => deleteDisplacement(id)} >
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
      field: 'fimDeslocamento',
      headerName: 'Status',
      width: 250,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ({ value }) => {
        const date = new Date(value as string);
        if (value) {
          return `Encerrado: ${format(new Date(date), 'dd/MM/yyyy HH:mm:ss')}`;
        }
        return 'Em deslocamento';
      },
    },
    {
      field: 'veiculoPlaca',
      headerName: 'Placa',
      width: 150,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'condutorNome',
      headerName: 'Condutor',
      width: 250,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'clienteNome',
      headerName: 'Cliente',
      width: 250,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'inicioDeslocamento',
      headerName: 'Inicio Deslocamento',
      width: 230,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ({ value }) => {
        const date = new Date(value as string);
        return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
      },
    },
    {
      field: 'kmInicial',
      headerName: 'KM Inicial',
      width: 130,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'kmFinal',
      headerName: 'KM final',
      width: 150,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ({ value }) => {
        if (value) {
          return value;
        }
        return 'Em deslocamento';
      },
    },
    {
      field: 'checkList',
      headerName: 'Checklist',
      width: 150,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'motivo',
      headerName: 'Motivo',
      width: 200,
      type: 'number',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'observacao',
      headerName: 'Observação',
      width: 250,
      type: 'number',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
  ];

  return (
    <Layout title='Deslocamentos'>
      <Loading trigger={fetching} message="Por favor aguarde..." />
      <StyledContainerPage>
        <StyledLimitPage>
          <DialogDisplacement />
          <TitleSection title='Deslocamentos' showDialog={handleShowDialogDisplacement} />
          <StyledPaper elevation={3}>
            <StyledDataGrid
              rows={displacements}
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
                    exportFileName: 'Lista de deslocamentos',
                  });
                },
                Footer: () => {
                  return (
                    <PaginationFooter
                      currentPage={currentPage}
                      numberOfPages={Math.ceil(displacements.length / itemPerPage)}
                      setCurrentPage={setCurrentPage}
                    />
                  );
                },
                NoResultsOverlay: () => {
                  if (fetching) return <LoadingProgress />;
                  return <CustomNoResultsOverlay label="Nenhum deslocamento localizado" />;
                },
                NoRowsOverlay: () => {
                  if (fetching) return <LoadingProgress />;
                  return <CustomNoResultsOverlay label="Nenhum deslocamento localizado" />;
                }
              }}
            />
          </StyledPaper>
        </StyledLimitPage>
      </StyledContainerPage>
    </Layout>
  );
};

export default Displacement;
