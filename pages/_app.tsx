import * as React from 'react';

import 'dayjs/locale/pt-br';
import Head from 'next/head';

import { CssBaseline } from '@mui/material';

import { MyAppProps, ProvidersApp } from '../providers';

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  return (
    <ProvidersApp props={props}>
      <CssBaseline />
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </ProvidersApp>
  );
}
