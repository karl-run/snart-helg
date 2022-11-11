import React, { useCallback, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "./nyan.module.css";

const NyanProgress = dynamic(() => import("../components/nyan-progress/NyanProgress"), {
  ssr: false,
});
const NyanSettings = dynamic(() => import("../components/nyan-progress/settings/NyanSettings"), {
  ssr: false,
});

function NyanPage(): JSX.Element {
  const [settingsChanged, setSettingsChanged] = useState(0);
  const handleOnSettingsChanged = useCallback(() => {
    setSettingsChanged((i) => i + 1);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Snart Helg?</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="description" content="Er det snart helg? Kanskje." />
        <meta property="og:url" content="https://helg.karl.run/nyan" />
        <meta property="og:title" content="Er det snart helg?" />
        <meta property="og:site_name" content="Snart Helg?" />
      </Head>
      <main className={styles.main}>
        <NyanProgress settingsChanged={settingsChanged} />
        <NyanSettings onSettingsChanged={handleOnSettingsChanged} />
      </main>
    </div>
  );
}

export default NyanPage;
