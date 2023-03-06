"use client"

import styles from './page.module.css'
import Network from '@/components/Network'
import Controller from '@/components/Controller'

export default function Home() {
  return (
    <main className={styles.main}>
      <Controller/>
      <Network/>
    </main>
  )
}
