import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import styles from "./ProgressPercent.module.css";

interface Props {
  feelingProgress: number;
}

const ProgressPercent = ({ feelingProgress }: Props): JSX.Element => {
  return (
    <div className={styles.root}>
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
