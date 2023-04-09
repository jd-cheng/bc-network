import { useNetworkStore } from '@/store/networks'
import { useSelectedStore } from '@/store/selected'
import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, ButtonGroup, Card, CardBody, CardHeader, Flex, Heading, IconButton, Popover, PopoverTrigger, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import DimensionItem from './DimensionItem'



export default function Dimension() {
  console.log('render dimension')
  // const selected = useSelectedStore((state)=>state.selected)
  // const network = useNetworkStore((state)=>state.openedNetwork)

  const [dimensionColors, setDimensionColors] = useState<string[]>([])

  
  return (
    <Card size='md' direction='column' align="center">
      <CardHeader>
        <Heading>Dimension</Heading>
      </CardHeader>

        <CardBody>
          <Popover>
            <DimensionItem dimension={1}/>
            {/* {Array(network?.dimension).map((value, index)=>(
              <div></div>
              ))
            } */}
          </Popover>
        </CardBody>


    </Card>
  )
}
