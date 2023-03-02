import {sin45 } from '@/utils/degree';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;


function createNodes(centerX : number = 0, centerY:number = 0,count: number = 16, arm: number = 300) {
  
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
      id: i + '',
      name: "Node"+ i,
      x: n[0]*arm,
      y: n[1]*arm
    }
  });
}

function createEdges(count: number) {
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
      source: edge[0] + '',
      target: edge[1] + ''
    }
  });
}

export const BCnetworkOption: EChartsOption = {
  title: { 
    text:'BC Network'
  },
  type: 'graph',
  layout: 'force',
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      name: 'bcnetwork',
      layout: 'none',
      symbolSize: 25,
      roam: true,
      //nodes
      data: createNodes(16),
   
      // edges: [],
      links: createEdges(8),
      emphasis: {
        focus: 'adjacency',
        lineStyle: {
          width: 10
        }
      }
    }
  ]
};


// const data: NonNullable<echarts.GraphSeriesOption['data']> = [
//   {
//     fixed: true,
//     x: myChart.getWidth() / 2,
//     y: myChart.getHeight() / 2,
//     symbolSize: 20,
//     id: '-1'
//   }
// ];

// const edges: NonNullable<echarts.GraphSeriesOption['edges']> = [];

// option = {
//   series: [
//     {
//       type: 'graph',
//       layout: 'force',
//       animation: false,
//       data: data,
//       force: {
//         // initLayout: 'circular'
//         // gravity: 0
//         repulsion: 100,
//         edgeLength: 5
//       },
//       edges: edges
//     }
//   ]
// };

// setInterval(function () {
//   data.push({
//     id: data.length + ''
//   });
//   var source = Math.round((data.length - 1) * Math.random());
//   var target = Math.round((data.length - 1) * Math.random());
//   if (source !== target) {
//     edges.push({
//       source: source,
//       target: target
//     });
//   }
//   myChart.setOption({
//     series: [
//       {
//         roam: true,
//         data: data,
//         edges: edges
//       }
//     ]
//   });

//   // console.log('nodes: ' + data.length);
//   // console.log('links: ' + data.length);
// }, 200);

// option && myChart.setOption(option);



