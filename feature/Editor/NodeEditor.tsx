import {  NodeAttributes } from '@/lib/graph'
import { useNetworkStore } from '@/store/networks'
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
  const {register, watch, setValue, handleSubmit } = useForm<Partial<NodeAttributes>>({
    mode:"onChange"
  })

  const label = watch("label")

  useEffect(()=>{
    if(!node) return
    setValue("label",node.attributes.label)
  }, [node?.key])


  useEffect(()=>{
    if(!network || !node) return
    console.log("update label",node, label)
    updateNode(network.key, node.key, {label})
  }, [label])

  return (
    <form>
      <FormControl>
        <FormLabel>Label</FormLabel>
        <Input {...register('label')}/>
      </FormControl>
    </form>
  )
}
