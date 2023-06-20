import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import DialogConductor from '@/components/Conductor/DialogData';
import { CustomNoResultsOverlay } from '@/components/DataGrid/CustomNoResultsOverlay';
import { CustomToolbar } from '@/components/DataGrid/CustomToolbar';
import LoadingProgress from '@/components/DataGrid/LoadingProgress';
import PaginationFooter from '@/components/DataGrid/Pagination';
import { TooltipCustom } from '@/components/DataGrid/styled';
import Layout from '@/components/Layout';
import { Loading } from '@/components/Loading';
import TitleSection from '@/components/TitleSection';

import { StyledPaper } from '@/styles/pages/conductor';
import {
  StyledButtonContainer, StyledContainerPage,
  StyledDataGrid, StyledLimitPage
} from '@/styles/pages/shared.styles';

import { ConductorContext } from '@/contexts/conductor';

import useConductorContext from '@/hooks/useConductorContext';

import { format } from 'date-fns';
import returnColorRow from 'utils/returnColorRow';

const itemPerPage = 10;

const Conductor: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    getConductors, conductors, handleSelectConductor,
    dataExport, fetching, deleteConductor, handleShowDialogConductor
  } = useConductorContext();

  useEffect(() => {
    getConductors();
  }, [getConductors]);

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
        const { id } = row as ConductorContext;
        return (
          <StyledButtonContainer>
            <IconButton onClick={() => handleSelectConductor(id)} >
              <TooltipCustom
                title="Editar"
                placement="right"
                disableHoverListener={false}
              >
                <Edit />
              </TooltipCustom>
            </IconButton>
            <IconButton onClick={() => deleteConductor(id)} >
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
      headerName: 'Conductor',
      width: 330,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'numeroHabilitacao',
      headerName: 'Nro. Habilitação',
      width: 330,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'catergoriaHabilitacao',
      headerName: 'Categoria',
      width: 250,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'vencimentoHabilitacao',
      headerName: 'Vencimento',
      width: 250,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ({ value }) => {
        const date = new Date(value as string);
        return format(new Date(date), 'dd/MM/yyyy');
      },
    },
  ];

  return (
    <Layout title='Condutores'>
      <Loading trigger={fetching} message="Por favor aguarde..." />
      <StyledContainerPage>
        <StyledLimitPage>
          <DialogConductor />
          <TitleSection title='Condutores' showDialog={handleShowDialogConductor} />
          <StyledPaper elevation={3}>
            <StyledDataGrid
              rows={conductors}
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
                    exportFileName: 'Lista de condutores',
                  });
                },
                Footer: () => {
                  return (
                    <PaginationFooter
                      currentPage={currentPage}
                      numberOfPages={Math.ceil(conductors.length / itemPerPage)}
                      setCurrentPage={setCurrentPage}
                    />
                  );
                },
                NoResultsOverlay: () => {
                  if (fetching) return <LoadingProgress />;
                  return <CustomNoResultsOverlay label="Nenhum condutor localizado" />;
                },
                NoRowsOverlay: () => {
                  if (fetching) return <LoadingProgress />;
                  return <CustomNoResultsOverlay label="Nenhum condutor localizado" />;
                }
              }}
            />
          </StyledPaper>
        </StyledLimitPage>
      </StyledContainerPage>
    </Layout>
  );
};

export default Conductor;
