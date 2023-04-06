import { Label } from '@radix-ui/react-label';
import React from 'react'

export interface NetworkFormValues {
  type: string;
  name: string;
  nodeColor: string
  nodeSize: number
  edgeColor: string
  edgeSize: number
  graph: File
};

interface IProp {
  register: any
}

export default function NetworkForm({register}: IProp) {

  return (
    <form>
      <Label>Name</Label>
      <input {...register('name')}/>
      <Label>Type</Label>
      <select {...register('type')}>
        <option value="hyper">hypecube</option>
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
      <input {...register('graph')} type='file'/>
    </form>
  )
}


