import { useContext } from 'react';

import { ClientsContext } from '@/contexts/client';

import { ClientContextProps } from '@/interfaces/client';

const useClientContext = (): ClientContextProps => {
  return useContext(ClientsContext);
};

export default useClientContext;
