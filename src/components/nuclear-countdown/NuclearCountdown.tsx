import styles from "./NuclearCountdown.module.css";
import { useIntervalToWeekend } from "../../hooks/useTime";

function NuclearCountdown(): JSX.Element | null {
  const { isHelg, interval } = useIntervalToWeekend();

  return (
    <div className={styles.nuclearWrapper}>
      <div className={styles.nuclearCountdown}>
        {!isHelg ? (
          <>
            <div className={styles.countElement}>
              <div>{interval.days?.toString().padStart(2, "0")}</div>
              <div>days</div>
            </div>
            <div className={styles.countElement}>
              <div>{interval.hours?.toString().padStart(2, "0")}</div>
              <div>hours</div>
            </div>
            <div className={styles.countElement}>
              <div>{interval.minutes?.toString().padStart(2, "0")}</div>
              <div>minutes</div>
            </div>
            <div className={styles.countElement}>
              <div>{interval.seconds?.toString().padStart(2, "0")}</div>
              <div>seconds</div>
            </div>
          </>
        ) : (
          <div className={styles.countElement}>
            <div className={styles.itIsHelg}>it is helg</div>
          </div>
        )}
      </div>
      {!isHelg && <div className={styles.text}>until helg</div>}
    </div>
  );
}

export default NuclearCountdown;
