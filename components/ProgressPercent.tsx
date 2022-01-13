import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

import styles from "./ProgressPercent.module.css";

interface Props {
  feelingProgress: number;
}

const ProgressPercent = ({ feelingProgress }: Props): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.dayName}>Det er {format(new Date(), 'EEEE', { locale: nb})}</div>
      <CircularProgressbar
        className={styles.progressGraph}
        value={feelingProgress}
        text={`${Math.round(feelingProgress)}%`}
        styles={buildStyles({
          textColor: '#ff99ff',
          pathColor: '#ff99ff',
        })}
      />
      <div>Helgefølelse</div>
    </div>
  );
};

export default ProgressPercent;
