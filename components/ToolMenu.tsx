import { 
  IconButton, 
  Popover, 
  PopoverContent, 
  PopoverTrigger, 
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs, 
  useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {  RxDashboard as ToolbarIcon } from "react-icons/rx";
import { useNetworkStore } from '@/store/networks';
import ToolPanel from './ToolPanel';
import NetworkEditor from '@/feature/Editor/NetworkEditor';
import NodeEditor from '@/feature/Editor/NodeEditor';
import NetworkPanel from './NetworkPanel';
import NodePanel from './NodePanel';




export default function ToolMenu() {

  const network = useNetworkStore((state)=>state.selected)
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure()
  const [tabIndex, setTabIndex] = useState(0)
  // const node = useNodeStore((state)=>state.selected)
  // useEffect(()=>{
  //   if(!network || !node) return
  //   setTabIndex(1)
  // }, [node?.key])

  return (
    <Popover placement="bottom-start" closeOnBlur={false} isLazy isOpen={isOpen}>
      <PopoverTrigger>
        <IconButton
          position='fixed' 
          top='16px' 
          right='16px' 
          zIndex='overlay'
          icon={<ToolbarIcon/>}
          aria-label=''
          variant='outline'
          onClick={onToggle}
          isDisabled={!network}
        />
      </PopoverTrigger>
      <PopoverContent width="min-content" px="3" py="2">
        <Tabs 
          index={tabIndex}
          onChange={(index)=>setTabIndex(index)}
          isFitted 
          isLazy 
          size="sm" 
          minW="224px"
        >
          <TabList mb='1em'>
            <Tab>Network</Tab>
            <Tab>Node</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <NetworkPanel/>
            </TabPanel>
            <TabPanel p={0}>
              <NodePanel/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PopoverContent>
    </Popover> 
  )
}
