import { INode, NodeAttributes } from '@/lib/graph';
import { Label } from '@radix-ui/react-label';
import React from 'react'


export interface NodeFormValues {
  key: string;
  label: string;
  color: string
  x: number
  y: number
}


interface IProp {
  register: any
  defaultValues: NodeAttributes
}


export default function NodeForm ({register, defaultValues}:IProp) {
  
  return(
    <form>
      <Label>Label</Label>
      <input {...register('label')} value={defaultValues.label}/>
      <Label>Size</Label>
      <input {...register('size')} value={defaultValues.size}/>
      <Label>Color</Label>
      <input {...register('color')} value={defaultValues.color}/>
      <Label>X</Label>
      <input {...register('x')} value={defaultValues.x}/>
      <Label>Y</Label>
      <input {...register('y')} value={defaultValues.y}/>
    </form>
  )
}

