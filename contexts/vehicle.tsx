import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

import AlertNotification from '@/components/Notification/AlertNotificationCenter';

import RawVehicle, { VehicleContextProps } from '@/interfaces/vehicle';

import generateCsvValues from '@/utils/generateCsvValues';

import ApiService from '../services/api';

export type VehicleContext = { id: number } & RawVehicle;

const VehiclesContext = createContext({} as VehicleContextProps);

const VehiclesProvider = ({ children }: { children: ReactNode }) => {
  const [fetching, setFetching] = useState(false);
  const [vehicles, setVehicles] = useState<VehicleContext[]>([]);
  const [vehicle, setVehicle] = useState<VehicleContext | null>(null);
  const [dataExport, setDataExport] = useState<Record<string, string>[]>([]);
  const [openDialogVehicle, setOpenDialogVehicle] = useState(false);

  const handleShowDialogVehicle = useCallback((value: boolean) => {
    setOpenDialogVehicle(value);
  }, []);

  const handleSelectVehicle = useCallback((id: number) => {
    const selected = vehicles.find((item) => item.id === id);
    setVehicle(selected || null);
    handleShowDialogVehicle(true);
  }, [handleShowDialogVehicle, vehicles]);

  const getVehicles = useCallback(async () => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<VehicleContext[]>('Veiculo');
      setVehicles(response);
      const exportData = response.map((client) => {
        const updated = generateCsvValues(client);
        return updated;
      });
      setDataExport(exportData);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar os veívulos.'
      });
    } finally {
      setFetching(false);
    }
  }, []);

  const createVehicle = useCallback(async (vehicle: RawVehicle) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.post<RawVehicle>('Veiculo', vehicle);
      await getVehicles();
      AlertNotification({
        icon: 'success',
        text: 'Veículo cadastrado com sucesso.'
      });
      setOpenDialogVehicle(false);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao criar o veículo.'
      });
    } finally {
      setFetching(false);
    }
  }, [getVehicles]);

  const getVehicle = useCallback(async (id: number): Promise<VehicleContext | null> => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<VehicleContext>(`Veiculo/${id}`);
      setVehicle(response);
      return response;
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar o veículo.'
      });
      return null;
    } finally {
      setFetching(false);
    }
  }, []);

  const updateVehicle = useCallback(async (id: number, vehicle: RawVehicle) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.put<RawVehicle>(`Veiculo/${id}`, vehicle);
      const updated = vehicles.map((item) => {
        if (item.id === id) {
          return { ...item, ...vehicle };
        }
        return item;
      });
      setVehicles(updated);
      AlertNotification({
        icon: 'success',
        text: 'Veículo editado com sucesso.'
      });
      setOpenDialogVehicle(false);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao atualizar o veículo.'
      });
    } finally {
      setFetching(false);
    }
  }, [vehicles]);

  const deleteVehicle = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.delete(`Veiculo/${id}`, id);
      const updated = vehicles.filter((item) => item.id !== id);
      setVehicles(updated);
      AlertNotification({
        icon: 'success',
        text: 'Veiculo deletado com sucesso.'
      });
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao deletar o veículo.'
      });
    } finally {
      setFetching(false);
    }
  }, [vehicles]);

  useEffect(() => {
    if (!openDialogVehicle) {
      setVehicle(null);
    }
  }, [openDialogVehicle]);

  const values = useMemo(() => ({
    vehicles, getVehicles, getVehicle, deleteVehicle,
    dataExport, handleShowDialogVehicle, vehicle, openDialogVehicle,
    createVehicle, updateVehicle, fetching, handleSelectVehicle
  }), [
    vehicles, getVehicles, getVehicle, deleteVehicle,
    dataExport, handleShowDialogVehicle, vehicle, openDialogVehicle,
    createVehicle, updateVehicle, fetching, handleSelectVehicle
  ]);

  return (
    <VehiclesContext.Provider value={values}>
      {children}
    </VehiclesContext.Provider>
  );
};

export { VehiclesContext, VehiclesProvider };
