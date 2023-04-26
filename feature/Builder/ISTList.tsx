import { useNetworkStore } from '@/store/networks'
import { Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ISTBuilder from './ISTBuilder'

export default function ISTList() {

  const network = useNetworkStore((state)=>state.selected)
  const [orders, setOrders] = useState<number[]>([])

  useEffect(()=>{
    if(!network) { return }
    console.log('render IST bulider')

    const index = network.attributes.dimension
    const newIndexs = Array.from({length: index}, (value, index)=>{
      return index+1
    })
    console.log(newIndexs)
    setOrders(newIndexs)

  }, [network])
  
  return (
    <Stack 
      direction='column' 
      align='center' 
      justify='space-between' 
    >
      {orders.map((order)=>(
        <ISTBuilder key={order} order={order} />
      ))}
    </Stack>
  )
}
