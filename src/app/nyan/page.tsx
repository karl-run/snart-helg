'use client'

import React, { ReactElement, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

import styles from './page.module.css'

const NyanProgress = dynamic(() => import('../../components/nyan-progress/NyanProgress'), {
  ssr: false,
})
const NyanSettings = dynamic(() => import('../../components/nyan-progress/settings/NyanSettings'), {
  ssr: false,
})

function NyanPage(): ReactElement {
  const [settingsChanged, setSettingsChanged] = useState(0)
  const handleOnSettingsChanged = useCallback(() => {
    setSettingsChanged((i) => i + 1)
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NyanProgress settingsChanged={settingsChanged} />
        <NyanSettings onSettingsChanged={handleOnSettingsChanged} />
      </main>
    </div>
  )
}

export default NyanPage
