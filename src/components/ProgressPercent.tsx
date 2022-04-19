import React from "react";
import Image from "next/image";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

import { getRerenderSpeed } from "./Progress";
import sparkles from "./images/sparkles.gif";
import styles from "./ProgressPercent.module.css";
import Head from "next/head";

interface Props {
  feelingProgress: number;
  secondsToHelg: number;
}

const ProgressPercent = ({ feelingProgress, secondsToHelg }: Props): JSX.Element => {
  const isHelg = secondsToHelg < 0;
  const { progressText, progressTextSize } = getProgressText(feelingProgress);

  return (
    <div className={styles.root}>
      <Head>
        <meta property="og:description" content={`Det er ${progressText} helg`} />
      </Head>
      {isHelg && (
        <div className={styles.sparklesContainer}>
          <Image src={sparkles} alt="forverkeri" />
        </div>
      )}
      {!isHelg ? (
        <div className={styles.dayName}>Det er {format(new Date(), "EEEE", { locale: nb })}</div>
      ) : (
        <div className={styles.dayName}>Det er HELG!</div>
      )}
      <CircularProgressbar
        className={styles.progressGraph}
        value={feelingProgress}
        text={progressText}
        styles={buildStyles({
          textColor: "#ff99ff",
          textSize: progressTextSize,
          pathColor: "#ff99ff",
        })}
      />
      <div>Helgefølelse</div>
    </div>
  );
};

function getProgressText(feelingProgress: number): { progressText: string; progressTextSize: string } {
  if (feelingProgress === 100) {
    return {
      progressText: "100%",
      progressTextSize: "1.2rem",
    };
  } else if (feelingProgress < 99) {
    return {
      progressText: `${feelingProgress.toFixed(getDigits())}%`,
      progressTextSize: getDigits() < 4 ? "1.1rem" : "0.8rem",
    };
  } else {
    return {
      progressText: `${feelingProgress.toFixed(5)}%`,
      progressTextSize: "0.8rem",
    };
  }
}

function getDigits(): number {
  const speed = getRerenderSpeed();
  if (speed > 60000) {
    return 1;
  } else if (speed > 1000) {
    return 3;
  } else {
    return 5;
  }
}

export default ProgressPercent;
