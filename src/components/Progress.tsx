import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import no from "date-fns/locale/nb";
import { add, differenceInSeconds, endOfWeek, startOfWeek } from "date-fns";

import ProgressCat from "./ProgressCat";
import Chart from "./Chart";
import ProgressPercent from "./ProgressPercent";
import styles from "./Progress.module.css";
import useInterval from "../hooks/useInterval";
import { safeGet } from "../localStorageUtils";

interface Props {
  settingsChanged: number;
}

const Progress = ({ settingsChanged }: Props): JSX.Element => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const captureScrollAction = useRef(false);

  const { diffBetweenTuesdayAndEow, diffFromStart, diffFromTuesday, diffToEow, diffBetweenStartAndEnd, fridayEow } =
    useTime(settingsChanged);

  useLayoutEffect(() => {
    if (rootRef.current == null || containerRef.current == null || captureScrollAction.current) return;

    rootRef.current.scrollLeft =
      (diffFromStart / diffBetweenStartAndEnd) * containerRef.current.getBoundingClientRect().width -
      rootRef.current.getBoundingClientRect().width / 2;

    captureScrollAction.current = true;
  });

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={containerRef} className={styles.scrollArea}>
        <ProgressPercent
          feelingProgress={clamp((diffFromTuesday / diffBetweenTuesdayAndEow) * 100)}
          secondsToHelg={diffBetweenTuesdayAndEow - diffFromTuesday}
        />
        <ProgressCat progress={(diffFromStart / diffBetweenStartAndEnd) * 100} fridayEow={fridayEow} />
        <Chart weekEnd={(diffToEow / diffBetweenStartAndEnd) * 100} />
      </div>
    </div>
  );
};

function useTime(settingsChanged: number) {
  const [rerenderCount, setState] = useState(0);

  useInterval(() => {
    setState((i) => i + 1);
  }, getRerenderSpeed());

  const memoizedValues = useMemo(() => {
    const now = new Date();
    const start = startOfWeek(now, { locale: no });
    const end = endOfWeek(now, { locale: no });
    const tuesday = add(start, { hours: 8 });
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
    //  Use rerender count to trigger a new render when it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderCount, settingsChanged]);

  useEffect(() => {
    const secondsToHelg = memoizedValues.diffBetweenTuesdayAndEow - memoizedValues.diffFromTuesday;

    let timeoutId: NodeJS.Timeout;
    if (secondsToHelg < 3000 && secondsToHelg > -10) {
      timeoutId = setTimeout(
        () => {
          setState((i) => i + 1);
        },
        // During the last 50 minutes to helg, rerender every second
        1000,
      );
    }

    return () => {
      if (!timeoutId) return;

      clearTimeout(timeoutId);
    };
  });

  return memoizedValues;
}

export function getRerenderSpeed(): number {
  if (!process.browser) return 1;

  const speed = +safeGet("speed", "1");

  if (speed === 150) return 300;

  return 300000 / speed;
}

function getEowHours(): number {
  const eowLocalStorage: "15" | "16" | "17" | string | undefined | null = safeGet("eow", "16");
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
