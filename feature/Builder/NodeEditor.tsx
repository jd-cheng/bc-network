import {  NodeAttributes } from '@/lib/graph'
import { graphs, networkTypes, useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { 
  FormControl, 
  FormErrorMessage, 
  FormLabel, 
  Input, 
  Select, 
  Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function NodeEditor() {
  
  const network = useNetworkStore((state)=>state.selected)
  const [node,updateNode] = useNodeStore((state)=>[state.selected,state.updateNode])
  const {register, watch, setValue } = useForm<NodeAttributes>({
    mode:"onChange",
  })

  const label = watch("label")


  useEffect(()=>{
    if(!network || !node) return

    const attributes = graphs.get(network)?.getNodeAttributes(node) as NodeAttributes
    setValue("label",attributes.label)
  }, [network,node])

  useEffect(()=>{
    if(!network || !node) return
    updateNode(network, node, {label})
  }, [label])

  return (
    <form>
      <Stack direction='column' position='fixed' top="16px" right="16px" zIndex='overlay'>
        <FormControl>
          <FormLabel>Label</FormLabel>
          <Input {...register('label')}/>
        </FormControl>
      </Stack>
    </form>
  )
}
