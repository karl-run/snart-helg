import { differenceInSeconds, intervalToDuration } from "date-fns";

import { safeGet } from "../localStorageUtils";

import styles from "./NuclearCountdown.module.css";

interface Props {
  fridayEow: Date;
}

function NuclearCountdown({ fridayEow }: Props): JSX.Element | null {
  if (safeGet("secret-timer", "no") !== "yes") return null;

  const interval = intervalToDuration({ start: new Date(), end: fridayEow });

  return (
    <div className={styles.nuclearWrapper}>
      <dl className={styles.nuclearCountdown}>
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
      </dl>
      <div className={styles.text}>until helg</div>
    </div>
  );
}

export default NuclearCountdown;
