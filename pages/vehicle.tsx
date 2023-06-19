import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { CustomNoResultsOverlay } from '@/components/DataGrid/CustomNoResultsOverlay';
import { CustomToolbar } from '@/components/DataGrid/CustomToolbar';
import LoadingProgress from '@/components/DataGrid/LoadingProgress';
import PaginationFooter from '@/components/DataGrid/Pagination';
import { TooltipCustom } from '@/components/DataGrid/styled';
import Layout from '@/components/Layout';
import { Loading } from '@/components/Loading';
import TitleSection from '@/components/TitleSection';
import DialogVehicle from '@/components/Vehicle/DialogData';

import {
  StyledButtonContainer, StyledContainerPage,
  StyledDataGrid, StyledLimitPage
} from '@/styles/pages/shared.styles';
import { StyledPaper } from '@/styles/pages/vehicle';

import { Vehicle } from '@/contexts/vehicle';

import useVehicleContext from '@/hooks/useVehicleContext';

import returnColorRow from 'utils/returnColorRow';

const itemPerPage = 10;

const Vehicle: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    getVehicles, vehicles, handleSelectVehicle,
    dataExport, fetching, deleteVehicle, handleShowDialogVehicle
  } = useVehicleContext();

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

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
        const { id } = row as Vehicle;
        return (
          <StyledButtonContainer>
            <IconButton onClick={() => handleSelectVehicle(id)} >
              <TooltipCustom
                title="Editar"
                placement="right"
                disableHoverListener={false}
              >
                <Edit />
              </TooltipCustom>
            </IconButton>
            <IconButton onClick={() => deleteVehicle(id)} >
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
      field: 'placa',
      headerName: 'Placa',
      width: 330,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'marcaModelo',
      headerName: 'Marca/Modelo',
      width: 330,
      type: 'string',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'anoFabricacao',
      headerName: 'Ano',
      width: 250,
      type: 'number',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'kmAtual',
      headerName: 'KM Atual',
      width: 250,
      type: 'number',
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
  ];

  return (
    <Layout title='Condutores'>
      <Loading trigger={fetching} message="Por favor aguarde..." />
      <StyledContainerPage>
        <StyledLimitPage>
          <DialogVehicle />
          <TitleSection title='Condutores' showDialog={handleShowDialogVehicle} />
          <StyledPaper elevation={3}>
            <StyledDataGrid
              rows={vehicles}
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
                    exportFileName: 'Lista de veículos',
                  });
                },
                Footer: () => {
                  return (
                    <PaginationFooter
                      currentPage={currentPage}
                      numberOfPages={Math.ceil(vehicles.length / itemPerPage)}
                      setCurrentPage={setCurrentPage}
                    />
                  );
                },
                NoResultsOverlay: () => {
                  if (fetching) return <LoadingProgress />;
                  return <CustomNoResultsOverlay label="Nenhum veículo localizado" />;
                },
                NoRowsOverlay: () => {
                  if (fetching) return <LoadingProgress />;
                  return <CustomNoResultsOverlay label="Nenhum veículo localizado" />;
                }
              }}
            />
          </StyledPaper>
        </StyledLimitPage>
      </StyledContainerPage>
    </Layout>
  );
};

export default Vehicle;
