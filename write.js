const fs = require('fs')
function degreeToRadian(degree){
  return degree * (Math.PI/180)
}
const sin45 = Math.sin(degreeToRadian(45))
function createNodes() {  
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

  return nodes.map((n,i)=>{
    return {
      key: "node-" + i,
      attributes:{
        x: n[0]*300,
        y: n[1]*300
      }

    }
  });
}


function createEdges() {
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


  return edges.map((edge)=>{
    return {
      key:"edge-"+edge[0]+'-'+edge[1],
      source: 'node-'+edge[0],
      target: 'node-'+edge[1],
      attributes:{

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

function createData(){

  const network = JSON.stringify({
    attributes: {
      name: 'BC Network'
    },
    nodes: createNodes(),
    edges: createEdges(),
  })

  fs.writeFile(__dirname+'/data.json',network,err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
}

createData()