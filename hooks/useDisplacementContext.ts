import { useContext } from 'react';

import { DisplacementsContext } from '@/contexts/displacement';

import { DisplacementContextProps } from '@/interfaces/displacement';

const useDisplacementContext = (): DisplacementContextProps => {
  return useContext(DisplacementsContext);
};

export default useDisplacementContext;
