import { NetworkAttributes } from '@/lib/graph'
import { graphs, networkTypes, useNetworkStore } from '@/store/networks'
import { 
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormControl, 
  FormErrorMessage, 
  FormLabel, 
  Input, 
  Select, 
  Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Builder from '../Builder/Builder'
import { NumberField } from './NumberField'

export default function NetworkEditor() {


  const [network,updateNetwork] = useNetworkStore((state)=>[state.selected,state.updateNetwork])
  const { control, register,  watch ,formState:{errors}, handleSubmit } = useForm<NetworkAttributes>({
    mode:"onChange",
    values: network?.attributes
  })

  const dimension = watch("dimension")
  const type = watch("type")
  const name = watch("name")

  useEffect(()=>{
    if(!network) return
    updateNetwork(network.key,  {name})
  }, [name])

  useEffect(()=>{
    if(!network) return
    updateNetwork(network.key,  {type})
  }, [type])

  useEffect(()=>{
    if(!network) return
    updateNetwork(network.key,  {dimension})
  }, [dimension])

  // useEffect(()=>{
  //   if(!network) return
  //   const attributes = {} as NetworkAttributes
  //   if (name) attributes.name = name
  //   if(type) attributes.type = type
  //   if(dimension) attributes.dimension = dimension
  //   console.log(attributes)
  //   updateNetwork(network.key, attributes)
  // }, [name,type, dimension])

  return (
    <Card position='fixed' top="16px" right="16px" zIndex='overlay' maxW='224px'>
      <CardBody>
        <form>
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

            <FormControl>
              <FormLabel>Dimension</FormLabel>
              <NumberField control={control} name="dimension"/>
            </FormControl>
        </form>
        {/* <ButtonGroup isAttached variant='outline'>
          <Button onClick={handleSubmit(onSubmit)}>Build</Button>
          <Button>Reset</Button>
        </ButtonGroup> */}
      </CardBody>
      <Builder/>
    </Card>
  )
}
