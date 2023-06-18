import { AppProps } from 'next/app';
import Head from 'next/head';

import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import createEmotionCache from '@/styles/createEmotionCache';
import theme from '@/styles/theme';

import { ClientsProvider } from '@/contexts/client';

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
      <CacheProvider
        value={emotionCache}
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="pt-br"
        >
          <ThemeProvider
            theme={theme}
          >
            <CssBaseline />
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            {children}
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>

    </ClientsProvider>
  );
};
