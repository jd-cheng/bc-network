"use client"

import styles from './page.module.css'
import BCnetwork from '@/components/BCnetwork'


export default function Home() {
  return (
    <main className={styles.main}>
      <BCnetwork/>
    </main>
  )
}
