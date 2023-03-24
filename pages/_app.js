import Head from 'next/head';
import { AppProvider } from './context/AppConfig';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <>
<<<<<<< Updated upstream
    <Head>
      <title>KAVACH | Team Bitcakes</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </Head>
    <Component {...pageProps} />
=======
    <AppProvider>
      <Head>
        <title>KAVACH</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://stijndv.com" />
        <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
      </Head>
      <Component {...pageProps} />
    </AppProvider>
>>>>>>> Stashed changes
  </>
);

export default MyApp;