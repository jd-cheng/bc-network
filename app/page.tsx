"use client"


import Network from '@/components/Network'
import NetworkForm from '@/components/NetworkForm'
import Sidebar from '@/components/Sidebar/Sidebar'
import Dimension from '@/feature/Dimension/Dimension'
import Editor from '@/feature/Editor/Editor'

import Stage from '@/refactor/Stage'


export default function Home() {



  return (
    <main className='flex flex-row w-full h-full'>
      <Sidebar/>
      <NetworkForm/>
    </main>

  )
}
