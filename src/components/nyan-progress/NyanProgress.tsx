import React, { useLayoutEffect, useRef } from "react";

import ProgressCat from "./progress-cat/ProgressCat";
import Chart from "./chart/Chart";
import ProgressPercent from "./progress-percent/ProgressPercent";
import styles from "./NyanProgress.module.css";
import { useTime } from "../../hooks/useTime";

interface Props {
  settingsChanged: number;
}

const NyanProgress = ({ settingsChanged }: Props): JSX.Element => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const captureScrollAction = useRef(false);

  const { now, secondsToHelg, progressFridayClamped, progressEndOfWeek, endDate, weekEndPercent, isHelg } =
    useTime(settingsChanged);

  useLayoutEffect(() => {
    if (rootRef.current == null || containerRef.current == null || captureScrollAction.current) return;

    rootRef.current.scrollLeft =
      (progressEndOfWeek / 100) * containerRef.current.getBoundingClientRect().width -
      rootRef.current.getBoundingClientRect().width / 2;

    captureScrollAction.current = true;
  });

  return (
    <>
      <div ref={rootRef} className={styles.root}>
        <div ref={containerRef} className={styles.scrollArea}>
          <ProgressPercent feelingProgress={progressFridayClamped} secondsToHelg={secondsToHelg} />
          <ProgressCat progress={progressEndOfWeek} fridayEow={endDate} isHelg={isHelg} now={now} />
          <Chart weekEnd={weekEndPercent} />
        </div>
      </div>
    </>
  );
};

export default NyanProgress;
