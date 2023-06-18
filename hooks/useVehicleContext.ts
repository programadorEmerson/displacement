import { useContext } from 'react';

import { VehiclesContext } from '@/contexts/vehicle';

import { VehicleContextProps } from '@/interfaces/vehicle';

const useVehicleContext = (): VehicleContextProps => {
  return useContext(VehiclesContext);
};

export default useVehicleContext;
