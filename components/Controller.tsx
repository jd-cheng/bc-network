import { createCrossedcube } from "@/lib/BCnetwork"
import { state } from "@/lib/sigma"
import { 
  ReactNode, 
  useEffect, 
  useState } from "react"
import Sigma from "sigma"
import { EdgeDisplayData, NodeDisplayData } from "sigma/types"
import styles from './Controller.module.css'

interface IProp {
  sigma: Sigma | null

}

export default function Controller({sigma}:IProp){


  const [networkType, setNetworkType] = useState<string>('hyper')
  const [networkDimension, setNetworkDimension] = useState<string>('4')
  const [node, setNode] = useState<string | null>(null)
  const [nodeDimension, setNodeDimension] = useState<string>('4')

  const handleChangeNetworkType = (evt:React.ChangeEvent<HTMLSelectElement>)=>{
    sigma?.setGraph(createCrossedcube())
    setNetworkType(evt.target.value)

  }

  const handleChangeNetworkDimension = (evt:React.ChangeEvent<HTMLSelectElement>)=>{
    setNetworkDimension(evt.target.value)

  }

  const setSelectedNode = (node?: string)=>{
    if (node) {
      state.selectedNode = node;
      state.selectedNeighbors = new Set(sigma?.getGraph().neighbors(node));
    } else {
      state.selectedNode = undefined;
      state.selectedNeighbors = undefined;
    }
    // Refresh rendering:
    sigma?.refresh();
    node && setNode(node);
  }

  const handleChangeNodeDimension = (evt:React.ChangeEvent<HTMLSelectElement>) =>{
    setNodeDimension(evt.target.value)
  }

  useEffect(() => {
      console.log('render controller')
      // Bind graph interactions:
      sigma?.on("clickNode", ({ node }) => {
        setSelectedNode(node);
      });

      sigma?.on("clickStage", () => {
        setSelectedNode();
      });

      // Render nodes accordingly to the internal state:
      // 1. If a node is selected, it is highlighted
      // 3. If there is a hovered node, all non-neighbor nodes are greyed
      sigma?.setSetting("nodeReducer", (node, data) => {
        const res: Partial<NodeDisplayData> = { ...data };
        
        if (state.selectedNeighbors && !state.selectedNeighbors.has(node) && state.selectedNode !== node) {
          res.label = "";
          res.color = "#f6f6f6";
        }

        return res;
      });

      // Render edges accordingly to the internal state:
      // 1. If a node is hovered, the edge is hidden if it is not connected to the
      //    node
      sigma?.setSetting("edgeReducer", (edge, data) => {
        const res: Partial<EdgeDisplayData> = { ...data };

        if (state.selectedNode && !sigma?.getGraph().hasExtremity(edge, state.selectedNode)) {
          res.hidden = true;
        }

        return res;
      });
  
    return () => {
      console.log("unmount controller")
    }
  }, [sigma])
  

  return(
      <div className={styles.main}>
        <div className={styles.header}>
          BC Network
        </div>
        <div className={styles.network_controller}>
          <p> current network type {networkType}</p>
          <label>choose network type</label>
          <select value={networkType} onChange={handleChangeNetworkType}>
            <option value='hyper'> hypercube </option>
            <option value='crossed'> crossed cube </option>
            <option value='twisted'> locally twisted cube </option>
          </select>
          <p> current network dimension {networkDimension}</p>
          <label>choose network dimension</label>
          <select value={networkDimension} onChange={handleChangeNetworkDimension}>
            <option value='1'> 1 dimension </option>
            <option value='2'> 2 dimension</option>
            <option value='3'> 3 dimension</option>
            <option value='4'> 4 dimension</option>
          </select>
        </div>
        <div className={styles.node_controller}>
          <p> selected node {node}</p>
          <p> current node dimension {nodeDimension}</p>
          <select value={nodeDimension} onChange={handleChangeNodeDimension}>
            <option value='1'> 1 dimension </option>
            <option value='2'> 2 dimension</option>
            <option value='3'> 3 dimension</option>
            <option value='4'> 4 dimension</option>
          </select>
        </div>
      </div>
  )

}