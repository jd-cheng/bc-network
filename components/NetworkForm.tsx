import { Label } from '@radix-ui/react-label';
import Graph from 'graphology';
import React from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';



export interface NetworkFormValues {
  type: string;
  name: string;
  nodeColor: string
  nodeSize: number
  edgeColor: string
  edgeSize: number
  file: File
};

const resolver: Resolver<NetworkFormValues> = async (values) => {
  return {
    values: values,
    errors: {}
  };
};

export default function NetworkForm() {
  const { register, handleSubmit } = useForm<NetworkFormValues>({ resolver });

  const onSubmit: SubmitHandler<NetworkFormValues> = (data)=>{
    console.log('submit network')
    const { file, name, type, nodeColor, nodeSize, edgeColor, edgeSize } = data
    const fileReader = new FileReader()
    const key = uuidv1()
    const graph = new Graph()

    const network = {
      key,
      name,
      type,
      graph
    }


    const readFile = ()=>{
      console.log('read file')
      const  result  = fileReader.result as string
      const data = JSON.parse(result)
      graph.import(data)
      // addGraph(key, graph)
    }
    fileReader.onloadend = readFile
    fileReader.readAsText(file)
    // addNetwork({key, type, name})

  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Name</Label>
        <input {...register('name')}/>
        <Label>Type</Label>
        <select {...register('type')}>
          <option value="hyper">hypercube</option>
          <option value="crossed">crossed cube</option>
        </select>
        <Label>Node Color</Label>
        <input {...register('nodeColor')} />
        <Label>Node Size</Label>
        <input {...register('nodeSize')} />
        <Label>Edge Color</Label>
        <input {...register('edgeColor')} />
        <Label>Edge Size </Label>
        <input {...register('edgeSize')} />
        <Label>Graph</Label>
        <input {...register('file')} type='file'/>
        <button type='submit'>Submit</button>
      </form>


  )
}


function uuidv1() {
  throw new Error('Function not implemented.');
}

