import { 
  useEffect, 
  useState } from "react"
import { sigmaState } from "@/lib/sigma"
import Sigma from "sigma"
import styles from './Controller.module.css'
import NetworkController from "./NetworkController"
import NodeController from "./NodeController"
interface IProp {
  sigma: Sigma | null
}

export default function Controller({sigma}:IProp){

  const [tab, setTab] = useState<string>('network')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const handleSelectNode = (node: string)=>{
    if (!sigma) { return }

    const preNode = sigmaState.selectedNode
    if(preNode){
      sigma.getGraph().setNodeAttribute(preNode, 'highlighted', false)
    }
    sigmaState.selectedNode = node;
    sigma.getGraph().setNodeAttribute(node, 'highlighted', true)

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

  useEffect(() => {
    if (!sigma) { return }
    // Bind graph interactions:
    sigma.on("clickNode", ({ node }) => {
      handleSelectNode(node);
    });

    sigma.on("clickStage", handleDropNode);

    return () => {
      console.log("unmount node controller")
    }
  }, [sigma])


  return(
      <div className={styles.main}>
        <button onClick={()=>setTab('network')}>network</button>
        <button onClick={()=>setTab('node')}>node</button>
        {selectedNode || tab === 'node'? 
          <NodeController 
          sigma={sigma} 
          selectedNode={selectedNode} 
          setSelectedNode={setSelectedNode}/>
          :
          <NetworkController sigma={sigma}/>

        }
      </div>
  )

}