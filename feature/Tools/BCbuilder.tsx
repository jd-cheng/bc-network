import { buildNetwork } from '@/lib/network'
import { useNetworkBuilderStore } from '@/store/networkBuilder'
import { 
  NetworkType, 
  useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { 
  ToolType, 
  useToolStore } from '@/store/tools'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { 
  Button,  
  Menu, 
  MenuButton, 
  MenuItemOption, 
  MenuList, 
  MenuOptionGroup } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export default function BCuilder() {
  

  const [network,setNetwork] = useNetworkStore((state)=>[state.selected, state.setSelected])
  const node = useNodeStore((state)=>state.selected)
  const tool = useToolStore((state)=>state.selected)
  const [builders, selected, setSelected] = useNetworkBuilderStore((state)=>[state.builders, state.selected, state.setSelected])
  const dimension = 4

  const handleBuilder = (nextBuilder:NetworkType)=>{
    console.log('build network', nextBuilder)
    setSelected(selected === nextBuilder? null: nextBuilder)

    

  }

  useEffect(()=>{
    if(!network || !node) { return }

   if(tool === ToolType.BC && selected){
    buildNetwork(network, selected, dimension, node.key)
    setNetwork({...network})

   } 

    return ()=>{
      console.log('unmount network builder')
    }
  }, [node, tool])

  
  return (

    <Menu>
      <MenuButton as={Button}  leftIcon={<ChevronDownIcon/>} minWidth='240px' hidden={tool !== ToolType.BC || !network}>
        {selected? selected: 'Select Type' }
      </MenuButton>
      <MenuList >
        <MenuOptionGroup type="radio" value={selected?selected: undefined} >
          {builders.map((builder)=>(
            <MenuItemOption
              as={Button} 
              key={builder}
              value={builder}
              onClick={()=>handleBuilder(builder)}
            >
              {builder}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>

      </MenuList>
    </Menu>
  )
}
