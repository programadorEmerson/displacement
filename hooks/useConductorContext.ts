import { useContext } from 'react';

import { ConductorsContext } from '@/contexts/conductor';

import { ConductorContextProps } from '@/interfaces/conductor';

const useConductorContext = (): ConductorContextProps => {
  return useContext(ConductorsContext);
};

export default useConductorContext;
