import { differenceInSeconds, intervalToDuration } from "date-fns";

import { safeGet } from "../localStorageUtils";

import styles from "./NuclearCountdown.module.css";

interface Props {
  fridayEow: Date;
  secondsToHelg: number;
}

function NuclearCountdown({ fridayEow, secondsToHelg }: Props): JSX.Element | null {
  if (safeGet("secret-timer", "no") !== "yes") return null;
  const isHelg = secondsToHelg < 0;

  const interval = intervalToDuration({ start: new Date(), end: fridayEow });

  return (
    <div className={styles.nuclearWrapper}>
      <div className={styles.nuclearCountdown}>
        {!isHelg ? (
          <>
            <div className={styles.countElement}>
              <div>{interval.days?.toString().padStart(2, "0")}:</div>
              <div>days</div>
            </div>
            <div className={styles.countElement}>
              <div>{interval.hours?.toString().padStart(2, "0")}:</div>
              <div>hours</div>
            </div>
            <div className={styles.countElement}>
              <div>{interval.minutes?.toString().padStart(2, "0")}:</div>
              <div>minutes</div>
            </div>
            <div className={styles.countElement}>
              <div>{interval.seconds?.toString().padStart(2, "0")}</div>
              <div>seconds</div>
            </div>
          </>
        ) : (
          <div className={styles.countElement}>
            <div>it is helg</div>
          </div>
        )}
      </div>
      {!isHelg && <div className={styles.text}>until helg</div>}
    </div>
  );
}

export default NuclearCountdown;
