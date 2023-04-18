const fs = require('fs')
function degreeToRadian(degree){
  return degree * (Math.PI/180)
}
const sin45 = Math.sin(45 * (Math.PI/180))
function createNodes(nodes, arm, dimension) {  
  return nodes.map((n,i)=>{
    return {
      key: "node-" + i,
      attributes:{
        x: n[0]*arm,
        y: n[1]*arm,
        size: 20,
        color: "#B30000",
        label: "node-" + i,
        highlighted: false
      }

    }
  });
}


function createEdges(edges) {
  return edges.map((edge)=>{
    return {
      key:"edge-"+edge[0]+'-'+edge[1],
      source: 'node-'+edge[0],
      target: 'node-'+edge[1],
      attributes:{
        size: 10
      }
    }
  });
}



/**
 * {
 *  attributes: {name:},
 *  nodes: {},
 *  edges: {},
 * }
 */

function gen_hypercube(){

  const nodes = [
    //inner
    [0,-1],
    [sin45, -sin45],
    [1, 0],
    [sin45, sin45],
    [0, 1],
    [-sin45, sin45],
    [-1,0],
    [-sin45, -sin45],
    //outer
    [0,-2],
    [sin45*2, -sin45*2],
    [2, 0],
    [sin45*2, sin45*2],
    [0, 2],
    [-sin45*2, sin45*2],
    [-2,0],
    [-sin45*2, -sin45*2]
  ]

  const edges = [
    [0,3],
    [0,5],
    [0,9],
    [0,15],
    [1,4],
    [1,6],
    [1,8],
    [1,10],
    [2,5],
    [2,7],
    [2,9],
    [2,11],
    [3,6],
    [3,10],
    [3,12],
    [4,7],
    [4,11],
    [4,13],
    [5,12],
    [5,14],
    [6,13],
    [6,15],
    [7,14],
    [7,8],
    [8,9],
    [8,15],
    [9,10],
    [10,11],
    [11,12],
    [12,13],
    [13,14],
    [14,15],
  ];

  const networkObj = {
    type: "hyper-cube",
    nodes: createNodes(nodes,300),
    edges: createEdges(edges)
  }
  const networkStr = JSON.stringify(networkObj,null,2)


  fs.writeFile(__dirname+'/hypercube.json',networkStr,err=>{
    if (err) {
        console.log('Error writing edges', err)
    } else {
        console.log('Successfully wrote edges')
    }
  })
}

function gen_crossedcube(){
  const sin60 = Math.sin(60 * (Math.PI/180))
  const sin30 = Math.sin(30* (Math.PI/180))
  const arm = 200
  const nodes = [
    [0,0],
    [1, 0],
    [sin30, sin60],
    [1+sin30, sin60],
    [0, 1],
    [1, 1],
    [sin30, 1+sin60],
    [1+sin30, 1+sin60]
  ]

  const edges = [
    [0, 1],
    [0, 2],
    [0, 4],
    [1, 3],
    [1, 7],
    [2, 3],
    [2, 6],
    [3, 5],
    [4, 5],
    [4, 6],
    [5, 7],
    [6, 7],

  ]

  const networkObj = {
    attributes:{
      type:'crossed',
      name: 'crossed cube',
      dimension: 3
    },
    nodes: createNodes(nodes, arm),
    edges: createEdges(edges)
  }

  const networkStr = JSON.stringify(networkObj,null,2)

  fs.writeFile(__dirname+'/crossedcube.json',networkStr,err=>{
    if (err) {
        console.log('Error writing edges', err)
    } else {
        console.log('Successfully wrote edges')
    }
  })
}


function createData(){

  const graph = JSON.stringify({
    attributes: {
      name: 'BC Networks',
      networks: [
        {
          key: 'hypercube',
          type: 'hypercube',
        }
      ]
    },
    nodes: createNodes(),
    edges: createEdges(),
  },null,2)

  fs.writeFile(__dirname+'/data.json',graph,err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
}

gen_crossedcube()