import * as React from 'react';

import 'dayjs/locale/pt-br';
import { MyAppProps, ProvidersApp } from '../providers';

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  return (
    <ProvidersApp props={props}>
      <Component {...pageProps} />
    </ProvidersApp>
  );
}
