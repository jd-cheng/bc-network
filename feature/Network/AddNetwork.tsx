import { GraphAttributes } from '@/lib/graph';
import { NetworkType, networkTypes, useNetworkStore } from '@/store/networks';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Button, 
  FormLabel,
  Input,
  Select,
  Divider,
  useToast} from '@chakra-ui/react'
import Graph from 'graphology';
import React, { 
  useEffect, 
  useState } from 'react'
import { 
  SubmitHandler, 
  useForm } from 'react-hook-form';
import FileInput from './FileInput';
import { NetworkMenuType } from './NetworkMenu';



interface NetworkFormValues {
  type: string;
  name: string;
  dimension: number
};

interface IProp {
  type: NetworkMenuType | null
  onClose: ()=>void
}



export default function AddNetwork({type, onClose}:IProp) {

  const { register, setValue, setError , handleSubmit } = useForm<GraphAttributes>();
  const [addNetwork, setNetwork] = useNetworkStore((state)=>[state.addNetwork,state.setSelected])
  const [graphData, setGraphData] = useState<any>()
  const toast = useToast()

  useEffect(()=>{

    if(!graphData) { return }
    const attributes = graphData.attributes
      
    if('dimension' in attributes){
      setValue("dimension", attributes['dimension'])
    } else {

    }
    if('type' in attributes){
      setValue("type", attributes['type'])
    } else {
      
    }
    if('name' in attributes){
      setValue("name", attributes['name'])
    } else {
      
    }
  }, [graphData])

  const showToast = ()=>{
    toast({
      description: 'network successfully added',
      position: 'top',
      status: 'success',
      isClosable: true,
    })
  }

  const onSubmit: SubmitHandler<GraphAttributes> = (data)=>{
    console.log('submit network')
    console.log(data)
    console.log(graphData)
    const graph = new Graph()
    const network = {key: crypto.randomUUID(), graph}

    if(graphData){
      graph.import(graphData)
      addNetwork(network)
    } else {
      const { name, type, dimension } = data
    }

    showToast()
    onClose()
    setNetwork(network)

  }

  const handleAdd = ()=>{
  }


  return (
    <Modal isOpen={type === NetworkMenuType.ADD} onClose={onClose} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Network</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <form>

          <FormLabel>Name</FormLabel>
          <Input {...register('name')}/>
          <FormLabel>Type</FormLabel>
          <Select {...register('type')}>
            { networkTypes.map((netowrkType)=>(
              <option key={netowrkType.value} value={netowrkType.value} >{netowrkType.text}</option>
            ))}
          </Select>
          <FormLabel>Dimension</FormLabel>
          <Input {...register('dimension')}/>

        </form>
        <Divider/>
        <FormLabel>Graph</FormLabel>
        <FileInput setGraphData={setGraphData}/>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSubmit(onSubmit)}>
            Add
          </Button>
          <Button variant='ghost' onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
