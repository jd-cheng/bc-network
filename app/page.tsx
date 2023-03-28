"use client"

import Drawer from '@/components/Drawer'
import Editor from '@/components/Editor'
import Selector from '@/components/Selector'
import Stage from '@/components/Stage'
import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {

  const [mode, setMode] = useState('editor')

  return (
    <main className={styles.main}>
      <button onClick={()=>setMode(mode === 'editor'?'drawer': 'editor')}> change mode </button>
      <Selector/>
      <Stage/>
      {mode === 'editor' && <Editor/>}
      {mode === 'drawer' && <Drawer/>}
    </main>
  )
}
