import { renderDragNode, renderSelectedNode } from '@/lib/sigma'
import {  graphs, useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Box } from '@chakra-ui/react'
import Graph from 'graphology'
import React, { useEffect, useRef } from 'react'
import Sigma from 'sigma'
import { 
  SigmaNodeEventPayload, 
  SigmaStageEventPayload } from 'sigma/sigma'
import { MouseCoords } from 'sigma/types'
import {v4 as uuidv4} from 'uuid';

let isDragging = false

export default function Network() {

  const rendererRef = useRef<Sigma>()
  const containerRef = useRef<HTMLDivElement>(null)
  const network = useNetworkStore((state) =>state.selected)
  const [node, setNode, setNodes, addNode] = useNodeStore((state) => [ state.selected, state.setSelected, state.setNodes,state.addNode])

  const clickNode = ({node: nextNode}: SigmaNodeEventPayload ) => {
    if(!network || node === nextNode) { return } 
    console.log("select:",nextNode)
  
    renderSelectedNode(network,nextNode,node)
    setNode(nextNode)

  }

  const clickStage = ({event:{x, y}}: SigmaStageEventPayload)=>{
    if(!network || !rendererRef.current) { return }

    const coordinates = rendererRef.current.viewportToGraph({ x,y });
    const newNode = {
      key: uuidv4(),
      attributes:{
        ...coordinates,
        size:10,
        color: "#B30000"
      }
    }

    addNode(network, newNode)
    renderSelectedNode(network, newNode.key,node)
    setNode(newNode.key)
  } 

  const downNode = ({node: nextNode}: SigmaNodeEventPayload) =>{
    if(!network) {return}
    console.log('down node', nextNode)
    if(nextNode === node) {
      isDragging = true;
    }
  }

  const mouseMoveBody = (coordinates: MouseCoords)=>{
    if (!isDragging || !node || !network || !rendererRef.current) return;
    // Get new position of node
    const renderer = rendererRef.current
    const newCoord = renderer.viewportToGraph(coordinates);
    renderDragNode(network, node, newCoord)
  
    // Prevent sigma to move camera:
    coordinates.preventSigmaDefault();
    coordinates.original.preventDefault();
    coordinates.original.stopPropagation();
  }

  const mouseUp = ()=>{
    console.log('mouse up')
    isDragging = false;
  }

  const mouseDown = ()=>{
    console.log('mouse down')
    if(!rendererRef.current) return
    const renderer = rendererRef.current
    if (!renderer.getCustomBBox()) renderer.setCustomBBox(renderer.getBBox());

  }

  useEffect(() => {
    if(!containerRef.current || !network) { return }
    console.log('render network')
    
    const graph = graphs.get(network) as Graph
    const renderer = new Sigma(graph, containerRef.current)
    setNodes(graph.nodes())

    rendererRef.current = renderer
    
    return () => {
      console.log("unmount network")
      renderer.kill()
    }
  }, [network,containerRef])

  useEffect(()=>{
    if(!rendererRef.current || !network) { return }
    console.log('mount listener')
    const renderer = rendererRef.current
    const mouseCaptor = renderer.getMouseCaptor()
    renderer.on("clickNode", clickNode);
    renderer.on("clickStage",clickStage);
    renderer.on("downNode", downNode)
    mouseCaptor.on('mousemovebody', mouseMoveBody)
    mouseCaptor.on('mouseup', mouseUp)
    mouseCaptor.on('mousedown',mouseDown)

    return ()=>{
      console.log('unmount listener')
      renderer.removeListener("clickNode", clickNode);
      renderer.removeListener("clickStage",clickStage);
      renderer.removeListener("downNode", downNode)
      mouseCaptor.removeListener('mousemovebody', mouseMoveBody)
      mouseCaptor.removeListener('mouseup', mouseUp)
      mouseCaptor.removeListener('mousedown',mouseDown)
    }

  }, [network,node])

  return (
    <Box top='0' left='0' w='100%' h='100%' ref={containerRef}></Box>
  )
}
