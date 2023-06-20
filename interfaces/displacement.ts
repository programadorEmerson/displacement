import { ClientContext } from '@/contexts/client';
import { ConductorContext } from '@/contexts/conductor';
import { VehicleContext } from '@/contexts/vehicle';

interface Displacement {
  kmInicial: number;
  inicioDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export interface DisplacemenGrid extends Displacement {
  id: number;
  condutorNome: string;
  veiculoPlaca: string;
  clienteNome: string;
  kmFinal: number;
  fimDeslocamento: string;
}

export default Displacement;

export interface DisplacementContextProps {
  displacements: Displacement[];
  fetching: boolean;
  displacement: DisplacemenGrid | null;
  dataExport: Record<string, string>[];
  openDialogDisplacement: boolean;
  clients: ClientContext[];
  conductors: ConductorContext[];
  vehicles: VehicleContext[];
  getDisplacements: () => Promise<void>;
  createDisplacement: (displacement: Displacement) => Promise<void>;
  getDisplacement: (id: number) => Promise<void>;
  deleteDisplacement: (id: number) => Promise<void>;
  updateDisplacement: (id: number, displacement: Displacement) => Promise<void>;
  handleShowDialogDisplacement: (value: boolean) => void;
  handleSelectDisplacement: (id: number) => void;
}
