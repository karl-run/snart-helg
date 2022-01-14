import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import no from "date-fns/locale/nb";
import { add, differenceInSeconds, endOfWeek, startOfWeek } from "date-fns";

import ProgressCat from "./ProgressCat";
import Chart from "./Chart";
import ProgressPercent from "./ProgressPercent";
import styles from "./Progress.module.css";
import useInterval from "../hooks/useInterval";

const Progress = (): JSX.Element => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { diffBetweenTuesdayAndEow, diffFromStart, diffFromTuesday, diffToEow, diffBetweenStartAndEnd, fridayEow } =
    useTime();

  useLayoutEffect(() => {
    if (rootRef.current == null || containerRef.current == null) return;

    rootRef.current.scrollLeft =
      (diffFromStart / diffBetweenStartAndEnd) * containerRef.current.getBoundingClientRect().width -
      rootRef.current.getBoundingClientRect().width / 2;
  });

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={containerRef} className={styles.scrollArea}>
        <ProgressPercent feelingProgress={clamp((diffFromTuesday / diffBetweenTuesdayAndEow) * 100)} />
        <ProgressCat progress={(diffFromStart / diffBetweenStartAndEnd) * 100} fridayEow={fridayEow} />
        <Chart weekEnd={(diffToEow / diffBetweenStartAndEnd) * 100} />
      </div>
    </div>
  );
};

function useTime() {
  const [rerenderCount, setState] = useState(0);

  useInterval(
    () => {
      setState((i) => i + 1);
    },
    // Rerender every 5 minutes
    300000,
  );

  return useMemo(() => {
    console.log(`Recalculating: ${rerenderCount}`);

    const now = new Date();
    const start = startOfWeek(now, { locale: no });
    const end = endOfWeek(now, { locale: no });
    const tuesday = add(start, { days: 1 });

    const fridayEow = add(start, { days: 4, hours: getEowHours() });
    const diffBetweenTuesdayAndEow = differenceInSeconds(fridayEow, tuesday);
    const diffFromStart = differenceInSeconds(now, start);
    const diffFromTuesday = differenceInSeconds(now, tuesday);
    const diffToEow = differenceInSeconds(fridayEow, start);
    const diffBetweenStartAndEnd = differenceInSeconds(end, start);

    return {
      diffBetweenTuesdayAndEow,
      diffFromStart,
      diffFromTuesday,
      diffToEow,
      diffBetweenStartAndEnd,
      fridayEow,
    };
  }, [rerenderCount]);
}

function getEowHours(): number {
  const eowLocalStorage: "15" | "16" | "17" | string | undefined | null = localStorage.getItem("eow");
  switch (eowLocalStorage) {
    case "15":
    case "16":
    case "17":
      return +eowLocalStorage;
    default:
      return 16;
  }
}

function clamp(value: number) {
  return Math.max(Math.min(value, 100), 0);
}

export default Progress;
