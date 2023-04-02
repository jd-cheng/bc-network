"use client"

import Stage from '@/components/Stage'
import Editor from '@/feature/Editor/Editor'
import NetworkDrawer from '@/feature/NetworkDrawer/NetworkDrawer'
import Selector from '@/feature/Selector/Selector'
import styles from './page.module.css'

export default function Home() {

  return (
    <main className={styles.main}>
      <Selector/>
      <Stage/>
      <NetworkDrawer/>
    </main>

  )
}
