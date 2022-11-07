import { add, differenceInSeconds, endOfWeek, intervalToDuration, startOfWeek, Duration, parseISO } from "date-fns";
import useInterval from "./useInterval";
import { getEowHours, getRerenderSpeed } from "../utils/localStorage";
import { useEffect, useMemo, useState } from "react";
import no from "date-fns/locale/nb";

interface UseTime {
  now: Date;
  endDate: Date;
  isHelg: boolean;
  interval: Duration;
  secondsToHelg: number;
  progressFridayClamped: number;
  progressEndOfWeek: number;
  weekEndPercent: number;
}

export function useTime(invalidateMemoCount: number = 0): UseTime {
  const [rerenderCount, setState] = useState(0);

  useInterval(() => {
    setState((i) => i + 1);
  }, getRerenderSpeed());

  const memoizedValues: UseTime = useMemo(() => {
    const time = timeValues();
    const end: Date = endOfWeek(time.now, { locale: no });

    const diffFromStart: number = differenceInSeconds(time.now, time.start);
    const diffToEow: number = differenceInSeconds(time.fridayEow, time.start);
    const diffBetweenStartAndEnd: number = differenceInSeconds(end, time.start);

    const interval: Duration = intervalToDuration({ start: time.now, end: time.fridayEow });
    const secondsToHelg: number = time.diffBetweenMondayWorkdayAndEow - time.diffFromTuesday;

    return {
      now: time.now,
      interval,
      secondsToHelg: secondsToHelg,
      progressFridayClamped: clamp((time.diffFromTuesday / time.diffBetweenMondayWorkdayAndEow) * 100),
      progressEndOfWeek: (diffFromStart / diffBetweenStartAndEnd) * 100,
      weekEndPercent: (diffToEow / diffBetweenStartAndEnd) * 100,
      isHelg: secondsToHelg < 0,
      endDate: time.fridayEow,
    };
    //  Use rerender count to trigger a new render when it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderCount, invalidateMemoCount]);

  useIncreasedRerenderSpeed(memoizedValues.secondsToHelg, setState);

  return memoizedValues;
}

export function useIntervalToWeekend(): {
  isHelg: boolean;
  interval: Duration;
} {
  const [rerenderCount, setState] = useState(0);

  useInterval(() => {
    setState((i) => i + 1);
  }, 0.5);

  const memoizedValues = useMemo(() => {
    const time = timeValues();
    const interval: Duration = intervalToDuration({ start: time.now, end: time.fridayEow });
    const secondsToHelg: number = time.diffBetweenMondayWorkdayAndEow - time.diffFromTuesday;

    return {
      isHelg: secondsToHelg < 0,
      interval,
    };
    //  Use rerender count to trigger a new render when it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderCount]);

  return memoizedValues;
}

function useIncreasedRerenderSpeed(
  secondsToHelg: number,
  setRerender: (setState: (count: number) => number) => void,
): void {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (secondsToHelg < 3000 && secondsToHelg > -10) {
      timeoutId = setTimeout(
        () => {
          setRerender((i) => i + 1);
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
}

function timeValues() {
  const now: Date = new Date();
  const start: Date = startOfWeek(now, { locale: no });
  const mondayWorkday: Date = add(start, { hours: 8 });
  const fridayEow: Date = add(start, { days: 4, hours: getEowHours() });

  const diffBetweenMondayWorkdayAndEow: number = differenceInSeconds(fridayEow, mondayWorkday);
  const diffFromTuesday: number = differenceInSeconds(now, mondayWorkday);

  return {
    now,
    start,
    fridayEow,
    diffBetweenMondayWorkdayAndEow,
    diffFromTuesday,
  };
}

function clamp(value: number) {
  return Math.max(Math.min(value, 100), 0);
}
