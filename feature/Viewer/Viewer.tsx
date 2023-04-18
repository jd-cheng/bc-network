import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { DragHandleIcon } from '@chakra-ui/icons'
import { 
  Card, 
  CardBody, 
  Divider, 
  Heading, 
  IconButton, 
  Stack, 
  useDisclosure } from '@chakra-ui/react'
import { Attributes } from 'graphology-types'
import React, { useEffect, useState } from 'react'
import AttributesViewer from './AttributesViewer'
import DimensionViewer from './DimensionViewer'

export default function Viewer() {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const { isOpen, onToggle } = useDisclosure()
  const [dimensions, setDimensions] = useState<number[]>([])
  const [attributes, setAttributes] = useState<Attributes>(()=>network?.graph.getAttributes())

  useEffect(()=>{
    if(!network) { return }
    console.log('render dimension viewers')

    const newAttributes = network.graph.getAttributes()
    const dimension = newAttributes['dimension']
    const newDimensions = Array.from({length: dimension}, (value, index)=>{
      return index+1
    })
  
    setAttributes(newAttributes)
    setDimensions(newDimensions)

    return ()=>{
      console.log('unmount dimension viewers')
    }

  }, [network])
  


  return (
    <>
      <IconButton 
        icon={<DragHandleIcon/>} 
        aria-label='' 
        onClick={onToggle}       
        position='fixed' 
        top='16px' 
        right='16px' 
        zIndex='overlay'
        variant='outline'
      />
      {network && 
        <Card 
          hidden={!isOpen} 
          maxW='sm'
          position='fixed' 
          top='64px' 
          right='16px' 
          zIndex='overlay'
          variant="outline"
        >
          <CardBody>
          <Heading size='sm'>Network Attributes</Heading>
          <Stack my='8px'>
            {attributes && Object.entries(attributes).map(([name, value])=>(
              <AttributesViewer key={name} name={name} value={value}/>
            ))}
          </Stack>
          <Divider/>
          <Heading size='sm' my='8px' >
            {node?'Node Dimension': 'Network Dimension'}
          </Heading>
          <Stack 
            direction='column' 
            align='center' 
            justify='space-between' 
          >
            {dimensions.map((dimension)=>(
              <DimensionViewer key={dimension} dimension={dimension} />
            ))}
          </Stack>
          </CardBody>
        </Card>
      }
    </>
  )
}
