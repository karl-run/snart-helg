import type { NextPage } from "next";
import Head from "next/head";

import styles from "./index.module.css";
import dynamic from "next/dynamic";

const Progress = dynamic(() => import("../components/Progress"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Snart Helg?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Progress />
      </main>
    </div>
  );
};

export default Home;
