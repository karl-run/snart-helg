import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
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

      <main className={styles.main}>
        <Progress />
        <HelgEndPicker />
      </main>
    </div>
  );
};

export default Home;
