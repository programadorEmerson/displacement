interface Conductor {
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export default Conductor;

export interface ConductorContextProps {
  conductors: Conductor[];
  fetching: boolean;
  conductor: { id: number } & Conductor | null;
  getConductors: () => Promise<void>;
  createConductor: (conductor: Conductor) => Promise<void>;
  getConductor: (id: number) => Promise<void>;
  deleteConductor: (id: number) => Promise<void>;
  updateConductor: (id: number, conductor: Conductor) => Promise<void>;
}
