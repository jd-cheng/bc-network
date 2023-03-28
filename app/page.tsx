"use client"

import Drawer from '@/components/Drawer'
import Editor from '@/components/Editor'
import Selector from '@/components/Selector'
import Stage from '@/components/Stage'
import styles from './page.module.css'

export default function Home() {


  return (
    <main className={styles.main}>

      <Selector/>
      <Stage/>
      <Editor/>
      <Drawer/>
    </main>
  )
}
