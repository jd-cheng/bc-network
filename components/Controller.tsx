import { 
  useEffect, 
  useState } from "react"
import { 
  sigma,
  sigmaState } from "@/lib/sigma"
import styles from './Controller.module.css'
import NetworkController from "./NetworkController"
import NodeController from "./NodeController"
import EdgeController from "./EdgeController"
import TabPanel from "./TabPanel"

export default function Controller(){

  const [tab, setTab] = useState<string>('network')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null)

  const handleNode = (node: string | null)=>{
    setTab('node')
    setSelectedNode(node)

  }

  const handleEdge = (edge: string | null)=>{
    if (!sigma.render) { return }
    console.log('edge:'+ edge)
    const { selectedNode, selectedEdge } = sigmaState
    const network = sigma.render.getGraph()

    if(selectedNode){
      network.setNodeAttribute(selectedNode, 'highlighted', false)
    }
    
    if(selectedEdge){
      network.setEdgeAttribute(selectedEdge, 'color', '')
    }

    if(edge){
      network.setEdgeAttribute(edge,'color', '#B30000')
    }

    sigmaState.selectedEdge = edge;
    sigma.render.refresh()
    setTab('edge')
    setSelectedEdge(edge)

  }


  return(
      <div className={styles.main}>
        <button onClick={()=>setTab('network')}>network</button>
        <button onClick={()=>setTab('node')}>node</button>
        <button onClick={()=>setTab('edge')}>edge</button>
        <TabPanel value={tab} index="network">
          <NetworkController/>
        </TabPanel>
        <TabPanel value={tab} index="node">
          <NodeController 
            selectedNode={selectedNode} 
          />
        </TabPanel>
        <TabPanel value={tab} index="edge">
          <EdgeController 
            selectedEdge={selectedEdge} 

          />
        </TabPanel>
      </div>
  )

}