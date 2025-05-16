import React, { type JSX } from 'react'
import dynamic from 'next/dynamic'

const NuclearCountdown = dynamic(() => import('../components/nuclear-countdown/NuclearCountdown'), {
  ssr: false,
})

function TimerPage(): JSX.Element {
  return <NuclearCountdown />
}

export default TimerPage
