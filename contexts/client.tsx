import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

import AlertNotification from '@/components/Notification/AlertNotificationCenter';

import RawClient, { ClientContextProps } from '@/interfaces/client';

import generateCsvValues from '@/utils/generateCsvValues';

import ApiService from '../services/api';

export type Client = { id: number } & RawClient;

const ClientsContext = createContext({} as ClientContextProps);

const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const [fetching, setFetching] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const [openDialogClient, setOpenDialogClient] = useState(false);
  const [dataExport, setDataExport] = useState<Record<string, string>[]>([]);

  const handleShowDialogClient = useCallback((value: boolean) => {
    setOpenDialogClient(value);
  }, []);

  const handleSelectClient = useCallback((id: number) => {
    const selected = clients.find((item) => item.id === id);
    setClient(selected || null);
    handleShowDialogClient(true);
  }, [clients, handleShowDialogClient]);

  const getClients = useCallback(async () => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Client[]>('Cliente');
      const exportData = response.map((client) => {
        const updated = generateCsvValues(client);
        return updated;
      });
      setDataExport(exportData);
      setClients(response);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar os clientes.'
      });
    } finally {
      setFetching(false);
    }
  }, []);

  const createClient = useCallback(async (client: RawClient) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.post<RawClient>('Cliente', client);
      await getClients();
      AlertNotification({
        icon: 'success',
        text: 'Cliente cadastrado com sucesso.'
      });
      setOpenDialogClient(false);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao criar o cliente.'
      });
    } finally {
      setFetching(false);
    }
  }, [getClients]);

  const getClient = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      const response = await api.get<Client>(`Cliente/${id}`);
      setClient(response);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar o cliente.'
      });
    } finally {
      setFetching(false);
    }
  }, []);

  const updateClient = useCallback(async (id: number, client: RawClient) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.put<RawClient>(`Cliente/${id}`, client);
      const updated = clients.map((item) => {
        if (item.id === id) {
          return { ...item, ...client };
        }
        return item;
      });
      setClients(updated);
      AlertNotification({
        icon: 'success',
        text: 'Cliente editado com sucesso.'
      });
      setOpenDialogClient(false);
      console.log('looping');
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao atualizar o cliente.'
      });
    } finally {
      setFetching(false);
    }
  }, [clients]);

  const deleteClient = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.delete(`Cliente/${id}`, id);
      const updatedClients = clients.filter((client) => client.id !== id);
      setClients(updatedClients);
      AlertNotification({
        icon: 'success',
        text: 'Cliente deletado com sucesso.'
      });
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao deletar o cliente.'
      });
    } finally {
      setFetching(false);
    }
  }, [clients]);

  useEffect(() => {
    if (!openDialogClient) {
      setClient(null);
    }
  }, [openDialogClient]);

  const values = useMemo(() => ({
    clients, getClients, getClient, deleteClient,
    openDialogClient, client, createClient, setClient, handleSelectClient,
    updateClient, fetching, dataExport, handleShowDialogClient
  }), [
    clients, getClients, getClient, deleteClient,
    openDialogClient, client, createClient, setClient, handleSelectClient,
    updateClient, fetching, dataExport, handleShowDialogClient
  ]);

  return (
    <ClientsContext.Provider value={values}>
      {children}
    </ClientsContext.Provider>
  );
};

export { ClientsContext, ClientsProvider };
