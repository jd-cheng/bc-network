import Sigma from "sigma";
import { useEffect, useRef, useState } from 'react'
import { graph } from "@/libs/BCnetwork";
import styles from './Display.module.css'
import { EdgeDisplayData, NodeDisplayData } from "sigma/types";
import Menu from "./Menu";

interface State {
  selectedNode?: string;
  // State derived from hovered node:
  selectedNeighbors?: Set<string>;
}

export default function Display() {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [sigma, setSigma] = useState<Sigma | null>(null)

  const state: State = {};

  // const handleClick = (evt:MouseEvent<HTMLDivElement, MouseEvent>)=>{

  // }

  useEffect(()=>{
    let sigmaIns: Sigma | null = null

    function setSelectedNode(node?: string) {
      if (node) {
        state.selectedNode = node;
        state.selectedNeighbors = new Set(graph.neighbors(node));
      } else {
        state.selectedNode = undefined;
        state.selectedNeighbors = undefined;
      }
    
      // Refresh rendering:
      sigmaIns && sigmaIns.refresh();
    }

    if(containerRef.current){
      sigmaIns = new Sigma(graph, containerRef.current)  

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

        // if(node === state.selectedNode){
        //   console.log(data)
        // }

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
        if (state.selectedNode && !graph.hasExtremity(edge, state.selectedNode)) {
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
    <div className={styles.container} ref={containerRef}>
    </div>
  )
}