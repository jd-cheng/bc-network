import { GraphAttributes } from '@/lib/graph';
import { NetworkType } from '@/store/networks';
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
  Divider} from '@chakra-ui/react'
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

const networkTypes = [
  {text: 'Hypercube', value: NetworkType.HYPER},
  {text: 'Crossed Cube', value: NetworkType.CROSSED},
  {text: 'Twisted Cube', value: NetworkType.TWISTED},
]

export default function AddNetwork({type, onClose}:IProp) {

  const { register, setValue, setError , handleSubmit } = useForm<GraphAttributes>();
  const [file, setFile] = useState<File>() 
  const [graphData, setGraphData] = useState<any>()

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

  const onSubmit: SubmitHandler<GraphAttributes> = (data)=>{
    console.log('submit network')
    console.log(data)
    const { name, type, dimension } = data

  }

  const handleAdd = ()=>{
    if(file){

    }
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
