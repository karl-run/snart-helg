import Image from "next/image";

import nyanHead from "./images/nyan_head.gif";

import styles from "./ProgressCat.module.css";

type Props = {
  progress: number;
};

function ProgressCat({ progress }: Props): JSX.Element {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCat;
