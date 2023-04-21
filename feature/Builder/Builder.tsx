import { 
  NetworkType, 
  networkTypes, 
  useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function Builder() {
  
  const [network,updateNetwork] = useNetworkStore((state)=>[state.selected, state.updateNetwork])
  const node = useNodeStore((state)=>state.selected)
  const [type, setType] = useState<NetworkType>()
  
  const handleType = (evt: React.ChangeEvent<HTMLSelectElement>)=>{
    console.log(evt)
    const nextType = evt.target.value as NetworkType
    setType(type === nextType? undefined: nextType)
  }

  
  return (
    <Tabs isFitted variant='line' size='sm' isLazy>
    <TabList >
      <Tab>Node</Tab>
      <Tab>Label</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>

      </TabPanel>
      <TabPanel>
        
      </TabPanel>
    </TabPanels>
  </Tabs>
  )
}
