import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';

import AlertNotification from '@/components/Notification/AlertNotificationCenter';

import RawClient, { ClientContextProps } from '@/interfaces/client';

import ApiService from '../services/api';

type Client = { id: number } & RawClient;

const ClientsContext = createContext({} as ClientContextProps);

const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const [fetching, setFetching] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [client, setClient] = useState<Client | null>(null);

  const getClients = useCallback(async () => {
    try {
      const api = new ApiService();
      const response = await api.get<Client[]>('Cliente');
      setClients(response);
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao buscar os clientes.'
      });
    }
  }, []);

  const createClient = useCallback(async (client: RawClient) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.post<RawClient>('Cliente', client);
      await getClients();
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
      await getClients();
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao atualizar o cliente.'
      });
    } finally {
      setFetching(false);
    }
  }, [getClients]);

  const deleteClient = useCallback(async (id: number) => {
    try {
      setFetching(true);
      const api = new ApiService();
      await api.delete(`Cliente/${id}`);
      await getClients();
    } catch (error) {
      AlertNotification({
        icon: 'warning',
        text: 'Ocorreu um erro ao deletar o cliente.'
      });
    } finally {
      setFetching(false);
    }
  }, [getClients]);

  const values = useMemo(() => ({
    clients, getClients, getClient, deleteClient,
    client, createClient, updateClient, fetching
  }), [
    clients, getClients, getClient, deleteClient,
    client, createClient, updateClient, fetching
  ]);

  return (
    <ClientsContext.Provider value={values}>
      {children}
    </ClientsContext.Provider>
  );
};

export { ClientsContext, ClientsProvider };
