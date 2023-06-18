interface Client {
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export default Client;

export interface ClientContextProps {
  clients: Client[];
  fetching: boolean;
  client: { id: number } & Client | null;
  getClients: () => Promise<void>;
  createClient: (client: Client) => Promise<void>;
  getClient: (id: number) => Promise<void>;
  deleteClient: (id: number) => Promise<void>;
  updateClient: (id: number, client: Client) => Promise<void>;
}
