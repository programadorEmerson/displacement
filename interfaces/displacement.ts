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

export default Displacement;

export interface DisplacementContextProps {
  displacements: Displacement[];
  fetching: boolean;
  displacement: { id: number } & Displacement | null;
  getDisplacements: () => Promise<void>;
  createDisplacement: (displacement: Displacement) => Promise<void>;
  getDisplacement: (id: number) => Promise<void>;
  deleteDisplacement: (id: number) => Promise<void>;
  updateDisplacement: (id: number, displacement: Displacement) => Promise<void>;
}
