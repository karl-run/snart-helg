import type { NextPage } from 'next'
import Head from 'next/head'
import Chart from '../components/Chart'
import ProgressMan from '../components/ProgressMan'
import styles from './index.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

      <Head>
        <title>Snart Helg?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ProgressMan />
        <Chart />
      </main>
    </div>
  )
}

export default Home
