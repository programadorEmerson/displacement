import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';

import AlertNotification from '@/components/Notification/AlertNotificationCenter';

import RawConductor, { ConductorContextProps } from '@/interfaces/conductor';

import ApiService from '../services/api';

type Conductor = { id: number } & RawConductor;

const ConductorsContext = createContext({} as ConductorContextProps);

const ConductorsProvider = ({ children }: { children: ReactNode }) => {
  const [fetching, setFetching] = useState(false);
  const [conductors, setConductors] = useState<Conductor[]>([]);
  const [conductor, setConductor] = useState<Conductor | null>(null);

  const getConductors = useCallback(async () => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Conductor[]>('Condutor');
      setConductors(response);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar os condutores.'
      });
    } finally {
      setFetching(false);
    }
  }, []);

  const createConductor = useCallback(async (conductor: RawConductor) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.post<RawConductor>('Condutor', conductor);
      await getConductors();
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao criar o condutor.'
      });
    } finally {
      setFetching(false);
    }
  }, [getConductors]);

  const getConductor = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Conductor>(`Condutor/${id}`);
      setConductor(response);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar o condutor.'
      });
    } finally {
      setFetching(false);
    }
  }, []);

  const updateConductor = useCallback(async (id: number, conductor: RawConductor) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.put<RawConductor>(`Condutor/${id}`, conductor);
      await getConductors();
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao atualizar o condutor.'
      });
    } finally {
      setFetching(false);
    }
  }, [getConductors]);

  const deleteConductor = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.delete(`Condutor/${id}`);
      await getConductors();
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao deletar o condutor.'
      });
    } finally {
      setFetching(false);
    }
  }, [getConductors]);

  const values = useMemo(() => ({
    conductors, getConductors, getConductor, deleteConductor,
    conductor, createConductor, updateConductor, fetching
  }), [
    conductors, getConductors, getConductor, deleteConductor,
    conductor, createConductor, updateConductor, fetching
  ]);

  return (
    <ConductorsContext.Provider value={values}>
      {children}
    </ConductorsContext.Provider>
  );
};

export { ConductorsContext, ConductorsProvider };
