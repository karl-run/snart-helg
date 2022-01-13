import React from "react";
import cn from "classnames";

import styles from "./Chart.module.css";

type Props = {
  weekEnd: number;
};

function Chart({ weekEnd }: Props): JSX.Element {
  return (
    <div className={styles.chartContainer}>
      <div className={cn(styles.day, styles.monday)}>Mandag</div>
      <div className={cn(styles.day, styles.tuesday)}>Tirsdag</div>
      <div className={cn(styles.day, styles.wednesday)}>Onsdag</div>
      <div className={cn(styles.day, styles.thursday)}>Torsdag</div>
      <div className={cn(styles.day, styles.friday)}>Fredag</div>
      <div
        className={styles.weekend}
        style={{
          left: `${weekEnd}%`,
        }}
      >
        Det er HELG
      </div>
      <div className={styles.day} />
      <div className={styles.day} />
    </div>
  );
}

export default Chart;
