"use client"

import Sidebar from '@/components/Sidebar'
import Dimension from '@/feature/Dimension'
import Editor from '@/feature/Editor/Editor'

import Stage from '@/refactor/Stage'
import styles from './page.module.css'

export default function Home() {



  return (
    <main className={styles.main}>
      <Sidebar/>
      <Stage/>
      {/* <Dimension/> */}
    </main>

  )
}
