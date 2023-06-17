import React, { type FC, memo } from 'react';

import Head from 'next/head';

import Images from '@/enums/images';

const TitleApp: FC<{ title: string }> = ({ title }) => (
  <Head>
    <title>{`${String(process.env.NEXT_PUBLIC_APP_NAME)} | ${title}`}</title>
    <meta name="description"
      content="App"
    />
    <meta name="viewport"
      content="initial-scale=1, width=device-width" />
    <link rel="icon"
      href={Images.LOGO}
    />
  </Head>
);

export default memo(TitleApp);
