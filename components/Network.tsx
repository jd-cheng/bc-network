import Sigma from "sigma";
import { useEffect, useRef, useState } from 'react'
import styles from './Network.module.css'
import { EdgeDisplayData, NodeDisplayData } from "sigma/types";
import Graph from "graphology";
import { createHypercube } from "@/lib/BCnetwork";

interface State {
  selectedNode?: string;
  // State derived from hovered node:
  selectedNeighbors?: Set<string>;
}


export default function Network() {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [sigma, setSigma] = useState<Sigma | null>(null)
  const [network, setGraph] = useState<Graph>(createHypercube())
  const state: State = {};

  useEffect(()=>{
    let sigmaIns: Sigma | null = null

    function setSelectedNode(node?: string) {
      if (node) {
        state.selectedNode = node;
        state.selectedNeighbors = new Set(network.neighbors(node));
      } else {
        state.selectedNode = undefined;
        state.selectedNeighbors = undefined;
      }
    
      // Refresh rendering:
      sigmaIns && sigmaIns.refresh();
    }

    if(containerRef.current){
      sigmaIns = new Sigma(network, containerRef.current)  

      // Bind graph interactions:
      sigmaIns.on("clickNode", ({ node }) => {
        console.log("click"+node)
        setSelectedNode(node);
      });

      sigmaIns.on("clickStage", (data) => {
        console.log(data)
        setSelectedNode();
      });

      // Render nodes accordingly to the internal state:
      // 1. If a node is selected, it is highlighted
      // 3. If there is a hovered node, all non-neighbor nodes are greyed
      sigmaIns.setSetting("nodeReducer", (node, data) => {
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
      sigmaIns.setSetting("edgeReducer", (edge, data) => {
        const res: Partial<EdgeDisplayData> = { ...data };

        if (state.selectedNode && !network.hasExtremity(edge, state.selectedNode)) {
          res.hidden = true;
        }

        return res;
      });

    }

    setSigma(sigmaIns)

    return ()=>{
      if(sigmaIns){
        sigmaIns.kill()
      }
      setSigma(null)
    }
  }
  ,[containerRef])

  return (
    <div className={styles.container} ref={containerRef}></div>
  )
}