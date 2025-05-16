import type { JSX } from 'react'

import Image from 'next/image'

import nyanHead from '../images/nyan_head.gif'
import Countdown from '../countdown/Countdown'

import styles from './ProgressCat.module.css'

type Props = {
  progress: number
  fridayEow: Date
  isHelg: boolean
  now: Date
}

function ProgressCat({ progress, fridayEow, isHelg, now }: Props): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.nyanTail} style={{ right: `${100 - progress}%` }} />
      <div
        className={styles.line}
        style={{
          left: `${progress}%`,
        }}
      />
      <div
        className={styles.positioning}
        style={{
          left: `${progress}%`,
        }}
      >
        <div className={styles.cat}>
          <div className={styles.nyanHead}>
            <Image src={nyanHead} alt="nyan cat" width={70} height={41} unoptimized />
            <Countdown className={styles.countdown} isHelg={isHelg} fridayEow={fridayEow} now={now} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressCat
