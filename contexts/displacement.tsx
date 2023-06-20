import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import AlertNotification from '@/components/Notification/AlertNotificationCenter';

import useClientContext from '@/hooks/useClientContext';
import useConductorContext from '@/hooks/useConductorContext';
import useVehicleContext from '@/hooks/useVehicleContext';

import RawDisplacement, { DisplacemenGrid, DisplacementContextProps } from '@/interfaces/displacement';

import generateCsvValues from '@/utils/generateCsvValues';

import ApiService from '../services/api';

export type Displacement = { id: number } & RawDisplacement;

const DisplacementsContext = createContext({} as DisplacementContextProps);

const DisplacementsProvider = ({ children }: { children: ReactNode }) => {
  const [fetching, setFetching] = useState(false);
  const [displacements, setDisplacements] = useState<DisplacemenGrid[]>([]);
  const [displacement, setDisplacement] = useState<DisplacemenGrid | null>(null);
  const [dataExport, setDataExport] = useState<Record<string, string>[]>([]);
  const [openDialogDisplacement, setOpenDialogDisplacement] = useState(false);

  const { getClient, getClients, clients } = useClientContext();
  const { getConductor, getConductors, conductors } = useConductorContext();
  const { getVehicle, getVehicles, vehicles } = useVehicleContext();
  const { asPath } = useRouter();

  const handleShowDialogDisplacement = useCallback((value: boolean) => {
    setOpenDialogDisplacement(value);
  }, []);

  const handleSelectDisplacement = useCallback((id: number) => {
    const selected = displacements.find((item) => item.id === id);
    setDisplacement(selected || null);
    handleShowDialogDisplacement(true);
  }, [displacements, handleShowDialogDisplacement]);

  const getDisplacements = useCallback(async () => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Displacement[]>('Deslocamento');

      const promisses = response.map(async (item) => {
        const client = await getClient(item.idCliente);
        const conductor = await getConductor(item.idCondutor);
        const vehicle = await getVehicle(item.idVeiculo);
        return {
          ...item,
          condutorNome: conductor?.nome ?? 'Condutor não encontrado',
          veiculoPlaca: vehicle?.placa ?? 'Veículo não encontrado',
          clienteNome: client?.nome ?? 'Cliente não encontrado'
        } as DisplacemenGrid;
      });

      const updated = await Promise.all(promisses);
      setDisplacements(updated);

      const exportData = response.map((client) => {
        const updated = generateCsvValues(client);
        return updated;
      });
      setDataExport(exportData);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar os deslocamentos.'
      });
    } finally {
      setFetching(false);
    }
  }, [getClient, getConductor, getVehicle]);

  const createDisplacement = useCallback(async (displacement: RawDisplacement) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.post<RawDisplacement>('Deslocamento/IniciarDeslocamento', displacement);
      await getDisplacements();
      AlertNotification({
        icon: 'success',
        text: 'Deslocamento criado com sucesso.'
      });
      setOpenDialogDisplacement(false);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao iniciar o deslocamento.'
      });
    } finally {
      setFetching(false);
    }
  }, [getDisplacements]);

  const getDisplacement = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Displacement>(`Deslocamento/${id}`);
      const client = await getClient(response.idCliente);
      const conductor = await getConductor(response.idCondutor);
      const vehicle = await getVehicle(response.idVeiculo);
      setDisplacement({
        ...response,
        condutorNome: conductor?.nome ?? 'Condutor não encontrado',
        veiculoPlaca: vehicle?.placa ?? 'Veículo não encontrado',
        clienteNome: client?.nome ?? 'Cliente não encontrado'
      } as DisplacemenGrid);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar o deslocamento.'
      });
    } finally {
      setFetching(false);
    }
  }, [getClient, getConductor, getVehicle]);

  const updateDisplacement = useCallback(async (id: number, displacement: RawDisplacement) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.put<RawDisplacement>(`Deslocamento/${id}/EncerrarDeslocamento`, displacement);
      const updated = displacements.map((item) => {
        if (item.id === id) {
          return { ...item, ...displacement };
        }
        return item;
      });
      setDisplacements(updated);
      AlertNotification({
        icon: 'success',
        text: 'Deslocamento editado com sucesso.'
      });
      setOpenDialogDisplacement(false);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao atualizar o deslocamneto.'
      });
    } finally {
      setFetching(false);
    }
  }, [displacements]);

  const deleteDisplacement = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.delete(`Deslocamento/${id}`, id);
      const updated = displacements.filter((item) => item.id !== id);
      setDisplacements(updated);
      AlertNotification({
        icon: 'success',
        text: 'Deslocamednto deletado com sucesso.'
      });
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao deletar o deslocamento.'
      });
    } finally {
      setFetching(false);
    }
  }, [displacements]);

  useEffect(() => {
    if (asPath === '/displacement') {
      getClients();
      getConductors();
      getVehicles();
    }
  }, [asPath, getClients, getConductors, getVehicles]);

  useEffect(() => {
    if (!openDialogDisplacement) {
      setDisplacement(null);
    }
  }, [openDialogDisplacement]);

  const values = useMemo(() => ({
    displacements, getDisplacements, getDisplacement, clients,
    deleteDisplacement, handleShowDialogDisplacement, conductors,
    displacement, createDisplacement, updateDisplacement, vehicles,
    fetching, dataExport, openDialogDisplacement, handleSelectDisplacement
  }), [
    displacements, getDisplacements, getDisplacement, deleteDisplacement, clients,
    handleShowDialogDisplacement, displacement, createDisplacement, conductors, vehicles,
    updateDisplacement, fetching, dataExport, openDialogDisplacement, handleSelectDisplacement
  ]);

  return (
    <DisplacementsContext.Provider value={values}>
      {children}
    </DisplacementsContext.Provider>
  );
};

export { DisplacementsContext, DisplacementsProvider };
