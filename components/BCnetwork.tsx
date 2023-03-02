import { BCnetworkOption } from '@/libs/BCnetwork';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react'
import styles from './BCnetwork.module.css'

const nodeQuery = {
  dataType: 'node'
}

function handleNodeClick(params: any){
  console.log(params)
}


export default function BCnetwork() {

  const container = useRef<HTMLDivElement | null>(null)

  let BCnetwork: echarts.ECharts | null = null

  function init(container: any){
    BCnetwork = echarts.init(container);
    BCnetworkOption && BCnetwork.setOption(BCnetworkOption);
    BCnetwork.on('click', nodeQuery, (params)=>{
      console.log(params)
      BCnetwork && BCnetwork.setOption({
        series: [
          {
            name: 'bcnetwork',
          }
        ]

      })
    })
  }

  
  useEffect(()=>{
    init(container.current)
  }, [])

  return (
    <div className= {styles.container} ref={container}></div>
  )
}