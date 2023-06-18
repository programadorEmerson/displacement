import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';

import AlertNotification from '@/components/Notification/AlertNotificationCenter';

import RawVehicle, { VehicleContextProps } from '@/interfaces/vehicle';

import ApiService from '../services/api';

type Vehicle = { id: number } & RawVehicle;

const VehiclesContext = createContext({} as VehicleContextProps);

const VehiclesProvider = ({ children }: { children: ReactNode }) => {
  const [fetching, setFetching] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const getVehicles = useCallback(async () => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Vehicle[]>('Veiculo');
      setVehicles(response);
      console.log(response);
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
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao criar o veículo.'
      });
    } finally {
      setFetching(false);
    }
  }, [getVehicles]);

  const getVehicle = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Vehicle>(`Veiculo/${id}`);
      setVehicle(response);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar o veículo.'
      });
    } finally {
      setFetching(false);
    }
  }, []);

  const updateVehicle = useCallback(async (id: number, vehicle: RawVehicle) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.put<RawVehicle>(`Veiculo/${id}`, vehicle);
      await getVehicles();
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao atualizar o veículo.'
      });
    } finally {
      setFetching(false);
    }
  }, [getVehicles]);

  const deleteVehicle = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.delete(`Veiculo/${id}`);
      await getVehicles();
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao deletar o veículo.'
      });
    } finally {
      setFetching(false);
    }
  }, [getVehicles]);

  const values = useMemo(() => ({
    vehicles, getVehicles, getVehicle, deleteVehicle,
    vehicle, createVehicle, updateVehicle, fetching
  }), [
    vehicles, getVehicles, getVehicle, deleteVehicle,
    vehicle, createVehicle, updateVehicle, fetching
  ]);

  return (
    <VehiclesContext.Provider value={values}>
      {children}
    </VehiclesContext.Provider>
  );
};

export { VehiclesContext, VehiclesProvider };
