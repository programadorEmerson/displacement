import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

import AlertNotification from '@/components/Notification/AlertNotificationCenter';

import RawConductor, { ConductorContextProps, UpdateConductor } from '@/interfaces/conductor';

import generateCsvValues from '@/utils/generateCsvValues';

import ApiService from '../services/api';

export type Conductor = { id: number } & RawConductor;

const ConductorsContext = createContext({} as ConductorContextProps);

const ConductorsProvider = ({ children }: { children: ReactNode }) => {
  const [fetching, setFetching] = useState(false);
  const [conductors, setConductors] = useState<Conductor[]>([]);
  const [conductor, setConductor] = useState<Conductor | null>(null);
  const [dataExport, setDataExport] = useState<Record<string, string>[]>([]);
  const [openDialogConductor, setOpenDialogConductor] = useState(false);

  const handleShowDialogConductor = useCallback((value: boolean) => {
    setOpenDialogConductor(value);
  }, []);

  const handleSelectConductor = useCallback((id: number) => {
    const selected = conductors.find((item) => item.id === id);
    setConductor(selected || null);
    handleShowDialogConductor(true);
  }, [conductors, handleShowDialogConductor]);

  const getConductors = useCallback(async () => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Conductor[]>('Condutor');
      const exportData = response.map((client) => {
        const updated = generateCsvValues(client);
        return updated;
      });
      setDataExport(exportData);
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
      // modificado devido ao erro do retorno da api (catergoriaHabilitacao) r a mais
      const modifiedData = { ...conductor, categoriaHabilitacao: conductor.catergoriaHabilitacao };
      await api.post<RawConductor>('Condutor', modifiedData);
      await getConductors();
      AlertNotification({
        icon: 'success',
        text: 'Condutor cadastrado com sucesso.'
      });
      setOpenDialogConductor(false);
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

  const updateConductor = useCallback(async (id: number, conductor: UpdateConductor) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.put(`Condutor/${id}`, conductor);
      const updated = conductors.map((item) => {
        if (item.id === id) {
          return { ...item, ...conductor };
        }
        return item;
      });
      setConductors(updated);
      AlertNotification({
        icon: 'success',
        text: 'Condutor editado com sucesso.'
      });
      setOpenDialogConductor(false);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao atualizar o condutor.'
      });
    } finally {
      setFetching(false);
    }
  }, [conductors]);

  const deleteConductor = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.delete(`Condutor/${id}`, id);
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

  useEffect(() => {
    if (!openDialogConductor) {
      setConductor(null);
    }
  }, [openDialogConductor]);

  const values = useMemo(() => ({
    conductors, getConductors, getConductor, handleShowDialogConductor,
    deleteConductor, conductor, createConductor, openDialogConductor,
    updateConductor, fetching, dataExport, handleSelectConductor
  }), [
    conductors, getConductors, getConductor, handleShowDialogConductor,
    deleteConductor, conductor, createConductor, openDialogConductor,
    updateConductor, fetching, dataExport, handleSelectConductor
  ]);

  return (
    <ConductorsContext.Provider value={values}>
      {children}
    </ConductorsContext.Provider>
  );
};

export { ConductorsContext, ConductorsProvider };
