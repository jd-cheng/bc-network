import {  NodeAttributes } from '@/lib/graph'
import { graphs, networkTypes, useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { 
  Card,
  CardBody,
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
  const {register, watch, setValue, handleSubmit } = useForm<NodeAttributes>({
    mode:"onChange",
  })

  const label = watch("label")

  useEffect(()=>{
    handleSubmit(()=>{})()
  },[])

  useEffect(()=>{
    if(!network || !node) return

    const attributes = graphs.get(network)?.getNodeAttributes(node) as NodeAttributes
    setValue("label",attributes.label)
  }, [network,node])

  useEffect(()=>{
    if(!network || !node) return
    console.log("update label",node, label)
    updateNode(network, node, {label})
  }, [label])

  return (
    <Card position='fixed' bottom="16px" right="16px" zIndex='overlay'>
      <CardBody>
        <form>
          <Stack direction='column' >
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Input {...register('label')}/>
            </FormControl>
          </Stack>
        </form>
      </CardBody>
    </Card>
  )
}
