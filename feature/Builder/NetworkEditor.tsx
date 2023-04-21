import { NetworkAttributes } from '@/lib/graph'
import { isValidDimension, validateDimension } from '@/lib/network'
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
import { NumberField } from './NumberField'

export default function NetworkEditor() {


  const nodes = useNodeStore((state)=>state.nodes)
  const [network,updateNetwork] = useNetworkStore((state)=>[state.selected,state.updateNetwork])
  const { control, register, watch, setValue,setError,clearErrors, getFieldState ,formState:{errors}, handleSubmit } = useForm<NetworkAttributes>({
    mode:"onChange",
    defaultValues:{
      type:""
    }
  })

  const dimension = watch("dimension")
  const type = watch("type")
  const name = watch("name")

  useEffect(()=>{
    handleSubmit(()=>{})()
  },[])

  useEffect(()=>{
    if(!network) return

    const attributes = graphs.get(network)?.getAttributes() as NetworkAttributes
    setValue("name",attributes.name)
    setValue("dimension",attributes.dimension)
    setValue("type",attributes.type)
  }, [network])

  useEffect(()=>{
    if(!network || !name) return
    updateNetwork(network, {name})
  }, [name])

  useEffect(()=>{
    if(!network || !type) return
    updateNetwork(network, {type})
  }, [type])

  useEffect(()=>{
    console.log("update dimension")
    if(!network || !dimension) return
    updateNetwork(network, {dimension})
    const result = validateDimension(network)

    result < 0 && setError("dimension",{message:"Exceed "+Math.abs(result)+" nodes"})
    result > 0 && setError("dimension", {message:`Need ${result} more nodes`})

    return ()=>{
      errors.dimension&&clearErrors("dimension")
    }

  }, [nodes,dimension])

  return (
    <form>
      <Stack direction='column' position='fixed' top="16px" right="16px" zIndex='overlay'>

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input {...register('name')}/>
        </FormControl>

        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select {...register("type")}>
            {networkTypes.map((type)=>(
              <option key={type.value} value={type.value}>{type.text}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isInvalid={!!errors.dimension}>
          <FormLabel>Dimension</FormLabel>
          <NumberField control={control} name="dimension"/>
          <FormErrorMessage>
            {errors.dimension && errors.dimension.message}
          </FormErrorMessage>
        </FormControl>

      </Stack>
    </form>
  )
}
