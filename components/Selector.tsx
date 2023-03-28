import { networksState } from '@/store/networks'
import { selectedState } from '@/store/selected'
import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import styles from './Selector.module.css'




export default function Selector() {

  const networkList = useRecoilValue(networksState)
  const setSelelted = useSetRecoilState(selectedState)

  const select = ()=> {
    
  }

  

  return (
    <div>
      <div>
        <p>networks</p>
        {networkList && networkList.map(network=>
          <p key={network.key} >
            {network.key}         
          </p>
          )}
      </div>
    </div>
  )
}
