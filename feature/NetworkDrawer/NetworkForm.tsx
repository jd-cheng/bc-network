import { Label } from '@radix-ui/react-label';
import React from 'react'
import { Resolver, useForm } from 'react-hook-form';

type NetworkFormValues = {
  key: string;
  type: string;
  label: string;
  nodeColor: string
  nodeSize: string
  edgeColor: string
  edgeSize: string
};

const resolver: Resolver<NetworkFormValues> = async (values) => {
  return {
    values: values,
    errors: {}
  };
};

interface IProp {

  register: any
}

export default function NetworkForm({register}: IProp) {

  // const { register, handleSubmit } = useForm<NetworkFormValues>({ resolver });
  // const onSubmit = (data: NetworkFormValues) => console.log(data);

  return (

      <form>
        <Label>Key</Label>
        <input {...register('key')}/>
        <Label>Type</Label>
        <select {...register('type')}>
          <option value="hyper">hypecube</option>
          <option value="crossed">crossed cube</option>
        </select>
        <Label>Label</Label>
        <input {...register('label')}/>

        <Label>Node Color</Label>
        <input {...register('nodeColor')} />
        <Label>Node Size</Label>
        <input {...register('nodeSize')} />
        <Label>Edge Color</Label>
        <input {...register('edgeColor')} />
        <Label>Edge Size </Label>
        <input {...register('edgeSize')} />
      </form>


  )
}


