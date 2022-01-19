import React from "react";
import Image from "next/image";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import sparkles from "./images/sparkles.gif";

import styles from "./ProgressPercent.module.css";

interface Props {
  feelingProgress: number;
  secondsToHelg: number;
}

const ProgressPercent = ({ feelingProgress, secondsToHelg }: Props): JSX.Element => {
  const isHelg = secondsToHelg < 0;
  return (
    <div className={styles.root}>
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
        text={feelingProgress < 99 ? `${Math.round(feelingProgress)}%` : `${feelingProgress.toFixed(4)}%`}
        styles={buildStyles({
          textColor: "#ff99ff",
          textSize: '1.1rem',
          pathColor: "#ff99ff",
        })}
      />
      <div>Helgefølelse</div>
    </div>
  );
};

export default ProgressPercent;
