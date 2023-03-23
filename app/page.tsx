"use client"

import Editor from '@/components/Editor'
import ElementList from '@/components/ElementList'
import Selector from '@/components/Selector'
import Stage from '@/components/Stage'
import styles from './page.module.css'

export default function Home() {


  return (
    <main className={styles.main}>
        <ElementList/>
        <Stage/>
        <Editor/>
    </main>
  )
}
