import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";

import HelgEndPicker from "../components/HelgEndPicker";
import styles from "./index.module.css";

const Progress = dynamic(() => import("../components/Progress"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Snart Helg?</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="description" content="Er det snart helg? Kanskje." />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HF9Y3XNZQ5"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-HF9Y3XNZQ5');
        `}
      </Script>

      <main className={styles.main}>
        <Progress />
        <HelgEndPicker />
      </main>
    </div>
  );
};

export default Home;
