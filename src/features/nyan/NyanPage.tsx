import { useCallback, useState, type JSX } from 'react'

import NyanProgress from './nyan-progress/NyanProgress'
import NyanSettings from './nyan-progress/settings/NyanSettings'

import styles from './NyanPage.module.css'

function NyanPage(): JSX.Element {
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
