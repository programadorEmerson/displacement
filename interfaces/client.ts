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
  dataExport: Record<string, string>[],
  openDialogClient: boolean;
  getClients: () => Promise<void>;
  setClient: (client: Client & { id: number } | null) => void;
  createClient: (client: Client) => Promise<void>;
  getClient: (id: number) => Promise<void>;
  deleteClient: (id: number) => Promise<void>;
  updateClient: (id: number, client: Client) => Promise<void>;
  handleShowDialogClient: (value: boolean) => void;
  handleSelectClient: (id: number) => void;
}
