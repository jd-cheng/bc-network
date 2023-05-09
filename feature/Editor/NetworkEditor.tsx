import { NetworkAttributes } from '@/lib/graph'
import { graphs, networkTypes, useNetworkStore } from '@/store/networks'
import { DeleteIcon } from '@chakra-ui/icons'
import { 
  Button,
  Card,
  CardBody,
  FormControl, 
  FormLabel, 
  IconButton, 
  Input, 
  Select, 
  useDisclosure} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import NetworkDeleteAlert from './NetworkDeleteAlert'
import { NumberField } from './NumberField'

export default function NetworkEditor() {


  const [network,updateNetwork,deleteNetwork] = useNetworkStore((state)=>[state.selected,state.updateNetwork,state.deleteNetwork])
  const { control, register, watch ,formState:{errors}, setValue } = useForm<Partial<NetworkAttributes>>({
    mode:"onChange",
  })
  const {isOpen, onClose, onOpen} = useDisclosure()

  const dimension = watch("dimension")
  const type = watch("type")
  const name = watch("name")

  useEffect(()=>{
    setValue("dimension", network?.attributes.dimension)
    setValue("type", network?.attributes.type)
    setValue("name", network?.attributes.name)
  }, [network?.key])

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



  return (
    <>
        <form>
          <FormControl>
            <FormLabel display="flex" mr="0" alignItems="center" justifyContent="space-between">
              Name
              <IconButton
                aria-label=''
                icon={<DeleteIcon/>}
                size="xs"
                variant="outline"
                colorScheme="red"
                isDisabled={!network}
                onClick={onOpen}
              />
            </FormLabel>
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
        <NetworkDeleteAlert isOpen={isOpen} onClose={onClose}/>
    </>

  )
}
