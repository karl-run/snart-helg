'use client'

import React, { ReactElement } from 'react'
import dynamic from 'next/dynamic'

const NuclearCountdown = dynamic(() => import('../../components/nuclear-countdown/NuclearCountdown'), {
  ssr: false,
})

function TimerPage(): ReactElement {
  return <NuclearCountdown />
}

export default TimerPage
