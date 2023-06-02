import { NodeAttributes } from '@/lib/graph'
import { renderDragNode, renderSelectedEdge, renderSelectedNode } from '@/lib/sigma'
import { useCursorStore, CursorType } from '@/store/cursors'
import { useEdgeStore } from '@/store/edges'
import { graphs, useNetworkStore } from '@/store/networks'
import { INode, useNodeStore } from '@/store/nodes'
import { Box, Text } from '@chakra-ui/react'
import Graph from 'graphology'
import React, { useEffect, useRef } from 'react'
import Sigma from 'sigma'
import { 
  SigmaEdgeEventPayload,
  SigmaNodeEventPayload, 
  SigmaStageEventPayload } from 'sigma/sigma'
import { MouseCoords } from 'sigma/types'
import {v4 as uuidv4} from 'uuid';

let isDragging = false

export default function Network() {

  const rendererRef = useRef<Sigma>()
  const containerRef = useRef<HTMLDivElement>(null)
  const network = useNetworkStore((state) =>state.selected)
  const cursor = useCursorStore((state)=>state.cursor)
  const [node, setNode, setNodes, addNode,deleteNode] = useNodeStore((state) => [ state.selected, state.setSelected, state.setNodes,state.addNode,state.deleteNode])
  const [edge, setEdge] = useEdgeStore((state)=>[state.selected,state.setSelected])
  
  const clickNode = ({node: nextNode}: SigmaNodeEventPayload ) => {
    if(!network) { return } 
    console.log("select:",nextNode)

    if(cursor === CursorType.DELETE && nextNode){
      deleteNode(network.key, nextNode)
    } else{

      if(cursor === CursorType.ADDEDGE && node && nextNode){
        const graph = graphs.get(network.key) as Graph
        graph.addEdge(node.key,nextNode,{size:5})
      } 
  
      renderSelectedNode(network.key,nextNode,node?.key)
      setNode(nextNode)
    }

  }

  const clickEdge = ({edge:nextEdge}: SigmaEdgeEventPayload)=>{
    if(!network) { return } 
    console.log("select:",nextEdge)

    if(cursor === CursorType.DELETE&& nextEdge){
      const graph = graphs.get(network.key) as Graph
        graph.dropEdge(nextEdge)
    }
  }

  const clickStage = ({event:{x, y}}: SigmaStageEventPayload)=>{
    if(!network || !rendererRef.current) { return }

    const newNode = {} as INode
    if(cursor === CursorType.ADDNODE){
      const coordinates = rendererRef.current.viewportToGraph({ x,y });
      newNode.key = uuidv4()
      newNode.attributes = {
        ...coordinates,
        size:20,
        color:"#B30000",
      }
      addNode(network.key, newNode)
    }
    //improvment needing
    renderSelectedNode(network.key,newNode.key,node?.key)
    setNode(newNode.key)


  } 

  const downNode = ({node: nextNode}: SigmaNodeEventPayload) =>{
    if(!network || cursor !== CursorType.DRAG) {return}
    isDragging = true;
    renderSelectedNode(network.key,nextNode,node?.key)
    setNode(nextNode)
  }

  const mouseMoveBody = (coordinates: MouseCoords)=>{
    if (!isDragging || !node || !network || !rendererRef.current || cursor !== CursorType.DRAG) return;
    // Get new position of node
    const renderer = rendererRef.current
    const newCoord = renderer.viewportToGraph(coordinates);
    renderDragNode(network.key, node.key, newCoord)
  
    // Prevent sigma to move camera:
    coordinates.preventSigmaDefault();
    coordinates.original.preventDefault();
    coordinates.original.stopPropagation();
  }

  const mouseUp = ()=>{
    isDragging = false;
  }

  const mouseDown = ()=>{
    console.log('mouse down')
    if(!rendererRef.current || cursor !== CursorType.DRAG) return
    const renderer = rendererRef.current
    if (!renderer.getCustomBBox()) renderer.setCustomBBox(renderer.getBBox());

  }

  useEffect(()=> {
    //init renderer
    if(!containerRef.current) return
  
    const renderer = new Sigma(new Graph(), containerRef.current,{
      allowInvalidContainer:true,
      enableEdgeClickEvents:true,
    })
    rendererRef.current = renderer

    return ()=>{
      renderer.kill()
    }
  },[containerRef])

  useEffect(() => {
    if(!containerRef.current || !rendererRef.current) { return }
    console.log('load network')
    
    if(!network){
      rendererRef.current.clear()
      return
    }

    const graph = graphs.get(network.key) as Graph

    const nodes = graph.nodes().map((node)=>{
      const attributes = {} as NodeAttributes
      attributes.label = graph.getNodeAttribute(node,"label")
      attributes.color = graph.getNodeAttribute(node,"color")
      attributes.size = graph.getNodeAttribute(node, "size")
      return {key:node, attributes}
    })

    rendererRef.current.setGraph(graph)
    setNodes(nodes)

  }, [network?.key])

  useEffect(()=>{
    if(!containerRef.current || !rendererRef.current || !network) { return }
    console.log('mount listener')
    
    const renderer = rendererRef.current
    const mouseCaptor = renderer.getMouseCaptor()
    renderer.on("clickNode", clickNode);
    renderer.on("clickEdge", clickEdge);
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

  }, [network?.key,node?.key,cursor])

  return (
    <Box top='0' left='0' w='100%' h='100%' ref={containerRef}></Box>
  )
}
