import { ConductorContext } from '@/contexts/conductor';

interface Conductor {
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export default Conductor;

export type UpdateConductor = {
  id: number;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export interface ConductorContextProps {
  conductors: ConductorContext[];
  fetching: boolean;
  conductor: { id: number } & Conductor | null;
  dataExport: Record<string, string>[],
  openDialogConductor: boolean;
  getConductors: () => Promise<void>;
  createConductor: (conductor: Conductor) => Promise<void>;
  getConductor: (id: number) => Promise<Conductor & { id: number } | null>;
  deleteConductor: (id: number) => Promise<void>;
  updateConductor: (id: number, conductor: UpdateConductor) => Promise<void>;
  handleSelectConductor: (id: number) => void;
  handleShowDialogConductor: (value: boolean) => void;
}
