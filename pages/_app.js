import Head from "next/head";
import { AppProvider } from "../context/AppConfig";

import "../styles/globals.css";
//const app = require('..//app/app');
const colors = require("colors");

//const port = process.env.PORT || 5000;

const connectDB = require("..//models/db");
connectDB();

const MyApp = ({ Component, pageProps }) => (
  <>
    <AppProvider>
      <Head>
        <title>KAVACH | Team Bitcake</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://stijndv.com" />
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </Head>
      <Component {...pageProps} />
    </AppProvider>
  </>
);

export default MyApp;
