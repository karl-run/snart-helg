import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import nyanThumb from "../thumbnails/nyan.png";
import timerThumb from "../thumbnails/timer.png";

import styles from "./index.page.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Snart Helg?</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="description" content="Er det snart helg? Kanskje." />
        <meta property="og:url" content="https://helg.karl.run" />
        <meta property="og:title" content="Er det snart helg?" />
        <meta property="og:site_name" content="Snart Helg?" />
      </Head>
      <main className={styles.container}>
        <Link href="/nyan">
          <Image src={nyanThumb} alt="Nyan cat countdown" width={300} placeholder="blur" />
          <h1>Nyan</h1>
        </Link>
        <Link href="/timer">
          <Image src={timerThumb} alt="Timer countdown" width={300} placeholder="blur" />
          <h1>Timer</h1>
        </Link>
      </main>
    </div>
  );
};

export default Home;
