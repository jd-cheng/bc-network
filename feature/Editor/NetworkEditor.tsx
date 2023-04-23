import { NetworkAttributes } from '@/lib/graph'
import { graphs, networkTypes, useNetworkStore } from '@/store/networks'
import { 
  Button,
  Card,
  CardBody,
  FormControl, 
  FormLabel, 
  Input, 
  Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ISTList from '../IST/ISTList'
import { NumberField } from './NumberField'

export default function NetworkEditor() {


  const [network,updateNetwork] = useNetworkStore((state)=>[state.selected,state.updateNetwork])
  const { control, register,  watch ,formState:{errors}, handleSubmit, setValue } = useForm<NetworkAttributes>({
    mode:"onChange",
  })

  const dimension = watch("dimension")
  const type = watch("type")
  const name = watch("name")

  useEffect(()=>{
    if(!network) return
    setValue("dimension", network.attributes.dimension)
    setValue("type", network.attributes.type)
    setValue("name", network.attributes.name)
  }, [network?.key])

  useEffect(()=>{
    if(!network) return
    updateNetwork(network.key,  {name})
  }, [name])

  // useEffect(()=>{
  //   if(!network) return
  //   updateNetwork(network.key,  {type})
  // }, [type])

  // useEffect(()=>{
  //   if(!network) return
  //   updateNetwork(network.key,  {dimension})
  // }, [dimension])



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
        <ISTList/>
      </CardBody>
    </Card>
  )
}
