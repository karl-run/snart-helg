import React, { useLayoutEffect, useRef, type JSX } from 'react'

import ProgressCat from './progress-cat/ProgressCat.tsx'
import Chart from './chart/Chart.tsx'
import ProgressPercent from './progress-percent/ProgressPercent.tsx'
import styles from './NyanProgress.module.css'
import { useTime } from '../../../hooks/useTime.ts'

interface Props {
  settingsChanged: number
}

const NyanProgress = ({ settingsChanged }: Props): JSX.Element => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const captureScrollAction = useRef(false)

  const { now, secondsToHelg, progressFridayClamped, progressEndOfWeek, endDate, weekEndPercent, isHelg } =
    useTime(settingsChanged)

  useLayoutEffect(() => {
    if (rootRef.current == null || containerRef.current == null || captureScrollAction.current) return

    rootRef.current.scrollLeft =
      (progressEndOfWeek / 100) * containerRef.current.getBoundingClientRect().width -
      rootRef.current.getBoundingClientRect().width / 2

    captureScrollAction.current = true
  })

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
  )
}

export default NyanProgress
