import Head from 'next/head';
import { AppProvider } from './context/AppConfig';

import '../styles/globals.css';
//const app = require('..//app/app');
const colors = require("colors");

//const port = process.env.PORT || 5000;


const connectDB = require("..//models/db")
connectDB();

// home page route added
// app.get("/", function (request, response) {
//   response.sendFile("home.html", { root: __dirname });
// });

// adding api routes
//app.use("/api", routes);

// app.listen(port, () => {
//   console.log(`Server is running on ${port}`);
// });


const MyApp = ({ Component, pageProps }) => (
  <>
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
  </>
);

export default MyApp;

