import { AppProps } from 'next/app';

import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import createEmotionCache from '@/styles/createEmotionCache';
import theme from '@/styles/theme';

import { ClientsProvider } from '@/contexts/client';
import { ConductorsProvider } from '@/contexts/conductor';
import { DisplacementsProvider } from '@/contexts/displacement';
import { VehiclesProvider } from '@/contexts/vehicle';

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type ProvidersAppProps = {
  children: React.ReactNode
  props: MyAppProps
}

const clientSideEmotionCache = createEmotionCache();

export const ProvidersApp = ({ children, props }: ProvidersAppProps) => {
  const { emotionCache = clientSideEmotionCache } = props;

  return (
    <ClientsProvider>
      <ConductorsProvider>
        <DisplacementsProvider>
          <VehiclesProvider>
            <CacheProvider value={emotionCache}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <ThemeProvider theme={theme}>
                  {children}
                </ThemeProvider>
              </LocalizationProvider>
            </CacheProvider>
          </VehiclesProvider>
        </DisplacementsProvider>
      </ConductorsProvider>
    </ClientsProvider>
  );
};
