import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';

import AlertNotification from '@/components/Notification/AlertNotificationCenter';

import RawDisplacement, { DisplacementContextProps } from '@/interfaces/displacement';

import ApiService from '../services/api';

type Displacement = { id: number } & RawDisplacement;

const DisplacementsContext = createContext({} as DisplacementContextProps);

const DisplacementsProvider = ({ children }: { children: ReactNode }) => {
  const [fetching, setFetching] = useState(false);
  const [displacements, setDisplacements] = useState<Displacement[]>([]);
  const [displacement, setDisplacement] = useState<Displacement | null>(null);

  const getDisplacements = useCallback(async () => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Displacement[]>('Deslocamento');
      setDisplacements(response);
      console.log(response);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar os deslocamentos.'
      });
    } finally {
      setFetching(false);
    }
  }, []);

  const createDisplacement = useCallback(async (displacement: RawDisplacement) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.post<RawDisplacement>('Deslocamento/IniciarDeslocamento', displacement);
      await getDisplacements();
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
      setDisplacement(response);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar o deslocamento.'
      });
    } finally {
      setFetching(false);
    }
  }, []);

  const updateDisplacement = useCallback(async (id: number, displacement: RawDisplacement) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.put<RawDisplacement>(`Deslocamento/${id}`, displacement);
      await getDisplacements();
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao atualizar o deslocamneto.'
      });
    } finally {
      setFetching(false);
    }
  }, [getDisplacements]);

  const deleteDisplacement = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.delete(`Deslocamento/${id}`);
      await getDisplacements();
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao deletar o deslocamento.'
      });
    } finally {
      setFetching(false);
    }
  }, [getDisplacements]);

  const values = useMemo(() => ({
    displacements, getDisplacements, getDisplacement, deleteDisplacement,
    displacement, createDisplacement, updateDisplacement, fetching
  }), [
    displacements, getDisplacements, getDisplacement, deleteDisplacement,
    displacement, createDisplacement, updateDisplacement, fetching
  ]);

  return (
    <DisplacementsContext.Provider value={values}>
      {children}
    </DisplacementsContext.Provider>
  );
};

export { DisplacementsContext, DisplacementsProvider };
