'use client'

import React, { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import nyanThumb from '../thumbnails/nyan.png'
import timerThumb from '../thumbnails/timer.png'

import styles from './page.module.css'

function Home(): ReactElement {
  return (
    <div>
      <main className={styles.container}>
        <Link href="/nyan">
          <Image src={nyanThumb} alt="Nyan cat countdown" width={300} placeholder="blur" />
          <h1>Nyan</h1>
        </Link>
        <Link href="/timer">
          <Image src={timerThumb} alt="Timer countdown" width={300} placeholder="blur" />
          <h1>Timer</h1>
        </Link>
      </main>
    </div>
  )
}

export default Home
