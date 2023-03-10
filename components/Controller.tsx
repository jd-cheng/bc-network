import { 
  useEffect, 
  useState } from "react"
import { sigmaState } from "@/lib/sigma"
import Sigma from "sigma"
import styles from './Controller.module.css'
import NetworkController from "./NetworkController"
import NodeController from "./NodeController"
import EdgeController from "./EdgeController"
import TabPanel from "./TabPanel"
interface IProp {
  sigma: Sigma | null
}

export default function Controller({sigma}:IProp){

  const [tab, setTab] = useState<string>('network')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null)

  const handleSelectNode = (node: string)=>{
    if (!sigma) { return }

    const preNode = sigmaState.selectedNode
    const network = sigma.getGraph()
    if(preNode){
      network.setNodeAttribute(preNode, 'highlighted', false)
    }
    sigmaState.selectedNode = node;
    network.setNodeAttribute(node, 'highlighted', true)

    sigma.refresh()
    setTab('node')
    setSelectedNode(node)
  }

  const handleDropNode = ()=>{
    if (!sigma) { return }
    
    sigma.getGraph().setNodeAttribute(sigmaState.selectedNode, 'highlighted', false)
    sigmaState.selectedNode = undefined;    

    sigma.refresh()
    setSelectedNode(null)
  }

  const handleSelectEdge = (edge:string)=>{
    if (!sigma) { return }

    const preEdge = sigmaState.selectedEdge
    if(preEdge){
      sigma.getGraph().setEdgeAttribute(preEdge, 'highlighted', false)
    }
    sigmaState.selectedEdge = edge;
    sigma.getGraph().setNodeAttribute(edge, 'highlighted', true)

    sigma.refresh()
    setTab('edge')
    setSelectedNode(edge)

  }

  const handleDropEdge = ()=>{
    if (!sigma) { return }
    
    sigma.getGraph().setEdgeAttribute(sigmaState.selectedEdge, 'highlighted', false)
    sigmaState.selectedEdge = undefined;    

    sigma.refresh()
    setSelectedEdge(null)
  }


  useEffect(() => {
    if (!sigma) { return }
    // Bind graph interactions:
    sigma.on("clickNode", ({node})=>{
      handleSelectNode(node);
    });

    sigma.on("clickEdge",({edge})=>{
      handleSelectEdge(edge)
    })

    sigma.on("clickStage", ()=>{
      handleDropNode()
      // handleDropEdge()
    });

    return () => {
      console.log("unmount node controller")
    }
  }, [sigma])


  return(
      <div className={styles.main}>
        <button onClick={()=>setTab('network')}>network</button>
        <button onClick={()=>setTab('node')}>node</button>
        <button onClick={()=>setTab('edge')}>edge</button>
        <TabPanel value={tab} index="network">
          <NetworkController sigma={sigma}/>
        </TabPanel>
        <TabPanel value={tab} index="node">
          <NodeController 
            sigma={sigma} 
            selectedNode={selectedNode} 
            setSelectedNode={setSelectedNode}
          />
        </TabPanel>
        <TabPanel value={tab} index="edge">
          <EdgeController 
            sigma={sigma} 
            selectedEdge={selectedEdge} 
            setSeletedEdge={setSelectedEdge}
          />
        </TabPanel>
      </div>
  )

}