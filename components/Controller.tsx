import { 
  useContext,
  useEffect, 
  useState } from "react"
import { 
  SigmaContext, 
  sigmaState } from "@/lib/sigma"
import styles from './Controller.module.css'
import NetworkController from "./NetworkController"
import NodeController from "./NodeController"
import EdgeController from "./EdgeController"
import TabPanel from "./TabPanel"

export default function Controller(){

  const sigma = useContext(SigmaContext)
  const [tab, setTab] = useState<string>('network')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null)

  const handleNode = (node: string | null)=>{
    if (!sigma) { return }
    console.log('node:'+ node)
    const preNode = sigmaState.selectedNode
    const network = sigma.getGraph()

    if(preNode){
      network.setNodeAttribute(preNode, 'highlighted', false)
    }

    if(node){
      network.setNodeAttribute(node, 'highlighted', true)
    }

    sigmaState.selectedNode = node;
    sigma.refresh()
    setTab('node')
    setSelectedNode(node)

  }

  const handleEdge = (edge: string | null)=>{
    if (!sigma) { return }
    console.log('edge:'+ edge)
    const preEdge = sigmaState.selectedEdge
    const network = sigma.getGraph()

    if(preEdge){
      network.setEdgeAttribute(preEdge, 'color', '')
    }

    if(edge){
      network.setEdgeAttribute(edge,'color', '#B30000')
    }

    sigmaState.selectedEdge = edge;
    sigma.refresh()
    setTab('edge')
    setSelectedEdge(edge)

  }

  useEffect(() => {
    if (!sigma) { return }
    // Bind graph interactions:
    sigma.on("clickNode", ({node})=>{
      handleNode(node);
    });

    sigma.on("clickEdge",({edge})=>{
      handleEdge(edge)
    })

    sigma.on("clickStage", ()=>{
      if(sigmaState.selectedEdge) handleEdge(null)
      if(sigmaState.selectedNode) handleNode(null)
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
          <NetworkController/>
        </TabPanel>
        <TabPanel value={tab} index="node">
          <NodeController 

            selectedNode={selectedNode} 
            setSelectedNode={setSelectedNode}
          />
        </TabPanel>
        <TabPanel value={tab} index="edge">
          <EdgeController 

            selectedEdge={selectedEdge} 
            setSeletedEdge={setSelectedEdge}
          />
        </TabPanel>
      </div>
  )

}