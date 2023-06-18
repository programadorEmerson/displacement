interface Vehicle {
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export default Vehicle;

export interface VehicleContextProps {
  vehicles: Vehicle[];
  fetching: boolean;
  vehicle: { id: number } & Vehicle | null;
  getVehicles: () => Promise<void>;
  createVehicle: (vehicle: Vehicle) => Promise<void>;
  getVehicle: (id: number) => Promise<void>;
  deleteVehicle: (id: number) => Promise<void>;
  updateVehicle: (id: number, vehicle: Vehicle) => Promise<void>;
}
