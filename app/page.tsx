"use client"

import Editor from '@/components/Editor'
import Selector from '@/components/Selector'
import Stage from '@/components/Stage'
import styles from './page.module.css'

export default function Home() {


  return (
    <main className={styles.main}>
      <Selector>
        <Editor/>
        <Stage/>

      </Selector>
    </main>
  )
}
