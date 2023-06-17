import { useEffect, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';

type ReturnType = {type: 'desktop' | 'mobile', isMobile: boolean}

const useDeviceType = (): ReturnType => {
  const [type, setType] = useState<'mobile' | 'desktop'>('mobile');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const matches = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    matches ? setType('desktop') : setType('mobile');
    setIsMobile(!matches);
  }, [matches]);

  return { type, isMobile };
};

export default useDeviceType;
