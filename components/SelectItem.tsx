import React from 'react'
import * as Select from '@radix-ui/react-select';
import { CheckIcon } from '@radix-ui/react-icons';



interface IProp {
  value: any
  children?: React.ReactNode
}

export const SelectItem = ({value, children}: IProp)=>{
  return (
    <Select.Item   
      className='text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'
      value={value}
    >
      <Select.ItemText>
        {children}
      </Select.ItemText>
      <Select.ItemIndicator
        className="absolute left-0 w-[25px] inline-flex items-center justify-center"
      >
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  )
}