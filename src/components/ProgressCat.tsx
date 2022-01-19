import Image from "next/image";

import nyanHead from "./images/nyan_head.gif";

import styles from "./ProgressCat.module.css";
import Countdown from "./Countdown";

type Props = {
  progress: number;
  fridayEow: Date;
};

function ProgressCat({ progress, fridayEow }: Props): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.nyanTail} style={{ right: `${100 - progress}%` }} />
      <div
        className={styles.positioning}
        style={{
          left: `${progress}%`,
        }}
      >
        <div className={styles.cat}>
          <div className={styles.nyanHead}>
            <Image src={nyanHead} alt="nyan cat" />
            <Countdown className={styles.countdown} fridayEow={fridayEow} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCat;
