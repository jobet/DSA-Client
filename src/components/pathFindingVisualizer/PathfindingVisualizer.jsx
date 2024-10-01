import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra} from '../pathFindingAlgorithms/dijkstra';
import {dfs} from '../pathFindingAlgorithms/dfs';
import {bfs} from '../pathFindingAlgorithms/bfs';
import { BiInfoCircle, BiHelpCircle, BiX, BiTrash, BiPlayCircle } from "react-icons/bi";
import './PathfindingVisualizer.css';
import shortPath from '../images/shortPath.PNG';
import clearWall from '../images/clearWall.PNG';
import start from '../images/start.PNG';
import wall from '../images/wall.PNG';

let distancestr='Shortest Distance: 0 cells';
let visited_nodes =-2;
let visiNode='Cells Visited: 0 cells';

// main component for the path finding visualizer
export default class PathfindingVisualizer extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.response();
  }
  handleTouchStart(row, col) {
    if (!this.state.isRunning) {
      const node = this.state.grid[row][col];
      if (node.isStart) {
        this.setState({
          isStartNode: true,
          mouseIsPressed: true,
          currRow: row,
          currCol: col,
        });
      } else if (node.isFinish) {
        this.setState({
          isFinishNode: true,
          mouseIsPressed: true,
          currRow: row,
          currCol: col,
        });
      } else {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({
          grid: newGrid,
          isWallNode: true,
          mouseIsPressed: true,
          currRow: row,
          currCol: col,
        });
      }
    }
  }

  handleTouchMove(e) {
    if (this.state.mouseIsPressed) {
      e.preventDefault();
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element.className.includes('node')) {
        const [, row, col] = element.id.split('-');
        const nodeKey = `${row}-${col}`;
        if (nodeKey !== this.state.lastTouchedNode) {
          this.handleMouseEnter(parseInt(row), parseInt(col));
          this.setState({
            lastTouchedNode: nodeKey,
          });
        }
      }
    }
  }
  handleTouchEnd() {
    this.setState({mouseIsPressed: false, isStartNode: false, isFinishNode: false, isWallNode: false, lastTouchedNode: null});
  }
  renderSortInfo() {
    const selectedAlgorithm = this.state.selectedAlgorithm;
    const sortInfo = {
        1: {
            name: "Dijkstra Algorithm",
            time: "O((|V| + |E|) log V)",
            space: "O(|V| + |E|)",
            description: "Dijkstra's algorithm allows us to find the shortest path between any two vertices of a graph. It differs from the minimum spanning tree because the shortest distance between two vertices might not include all the vertices of the graph.",
            code: `djikstraAlgorithm(startNode) {
    let distances = {};
 
    //Stores the reference to previous nodes
    let prev = {};
    let pq = new PriorityQueue(this.nodes
        .length * this.nodes.length);
 
    // Set distances to all nodes to be 
    // infinite except startNode
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);
    this.nodes.forEach(node => {
       if (node !== startNode) {
           distances[node] = Infinity;
           prev[node] = null;
        }
    });
 
    while (!pq.isEmpty()) {
       let minNode = pq.dequeue();
       let currNode = minNode.data;
       let weight = minNode.priority;
       this.edges[currNode].forEach(neighbor 
        => {let alt = distances[currNode] 
          + neighbor.weight;
        if (alt < distances[neighbor.node]) 
          {
             distances[neighbor.node] = alt;
             prev[neighbor.node] = currNode;
             pq.enqueue(neighbor.node, 
                distances[neighbor.node]);
          }
       });
    }
    return distances;
 }`},
 2: {
  name: "Breadth First Search",
  time: "O(V+E)",
  space: "O(l), l is no. of node in single level",
  description: "BFS is a traversing algorithm where you should start traversing from a selected node (source or starting node) and traverse the graph layerwise thus exploring the neighbour nodes (nodes which are directly connected to source node). You must then move towards the next-level neighbour nodes. As the name BFS suggests, you are required to traverse the graph breadthwise as follows: 1.First move horizontally and visit all the nodes of the current layer 2.Move to the next layer",
  code: `BFS(node) {
// Create a Queue and add 
// our initial node in it
let q = new Queue(this.nodes.length);
let explored = new Set();
q.enqueue(node);

// Mark the first node as 
// explored explored.
add(node);

// We'll continue till our 
// queue gets empty
while (!q.isEmpty()) {
 let t = q.dequeue();

 // Log every element that comes 
 // out of the Queue
 console.log(t);

 // 1. In the edges object, we search  
 // for nodes this node is directly 
 // connected to.
 // 2. We filter out the nodes that 
 // have already been explored.
 // 3. Then we mark each unexplored 
 // node as explored and add it to 
 // the queue.
 this.edges[t]
 .filter(n => !explored.has(n))
 .forEach(n => {
    explored.add(n);
    q.enqueue(n);
 });
}
}
`
 },
 3: {
  name: "Depth First Search",
  time: "O(V+E)",
  space: "O(h), h is max height",
  description: "The DFS algorithm is a recursive algorithm that uses the idea of backtracking. It involves exhaustive searches of all the nodes by going ahead, if possible, else by backtracking. Here, the word backtrack means that when you are moving forward and there are no more nodes along the current path, you move backwards on the same path to find nodes to traverse. All the nodes will be visited on the current path till all the unvisited nodes have been traversed after which the next path will be selected.",
  code: `
DFS(node) {
    // Create a Stack and add our initial 
    // node in it
    let s = new Stack(this.nodes.length);
    let explored = new Set();
    s.push(node);
 
    // Mark the first node as explored
    explored.add(node);
 
    // We'll continue till our Stack
    // gets empty
    while (!s.isEmpty()) {
       let t = s.pop();
 
    // Log every element that comes 
    // out of the Stack
       console.log(t);
 
    // 1. In the edges object, we search for
    // nodes this node is directly 
    // connected to.
    // 2. We filter out the nodes that have
    // already been explored.
    // 3. Then we mark each unexplored node 
    // as explored and push it to the Stack.
    this.edges[t]
    .filter(n => !explored.has(n))
    .forEach(n => {
       explored.add(n);
       s.push(n);
       });
    }
 }
`}
  };
  const info = sortInfo[selectedAlgorithm];
  return (
      <div>
          <h1>{info.name}</h1>
          <p>{info.description}</p>
          <h2>Complexity</h2>
          <table className='complexity-table'>
              <tbody>
                  <tr>
                      <th>Time</th>
                      <th>Space</th>
                  </tr>
                  <tr>
                      <td>{info.time}</td>
                      <td>{info.space}</td>
                  </tr>
              </tbody>
          </table>
          <h2>Code</h2>
          <pre><code>{info.code}</code></pre>
      </div>
  );
}
  constructor() {
    super();
    this.state = {
      grid: [],
      START_NODE_ROW: 2,
      FINISH_NODE_ROW: (this.calculateColumnCount() - 8),
      START_NODE_COL: 2,
      FINISH_NODE_COL: (this.calculateColumnCount() - 3),
      mouseIsPressed: false,
      ROW_COUNT: (this.calculateColumnCount() - (this.calculateColumnCount() / 5)),
      COLUMN_COUNT: this.calculateColumnCount(),
      isRunning: false,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false, 
      currRow: 0,
      currCol: 0,
      modal: false,
      algoInfoModal: false,
      selectedAlgorithm: 1,
      isDrawing: false,
      lastTouchedNode: null,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  // creates the grid
  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({grid});
    window.addEventListener('resize', this.handleResize);
  }  

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    const newColumnCount = this.calculateColumnCount();
    if (newColumnCount !== this.state.COLUMN_COUNT) {
      this.setState({ COLUMN_COUNT: newColumnCount }, () => {
        const newGrid = this.getInitialGrid();
        this.setState({ grid: newGrid });
      });
      this.setState({ ROW_COUNT: newColumnCount - (newColumnCount / 5) }, () => {
        const newGrid = this.getInitialGrid();
        this.setState({ grid: newGrid });
      });
      this.setState({ FINISH_NODE_ROW: (newColumnCount - 8) }, () => {
        const newGrid = this.getInitialGrid();
        this.setState({ grid: newGrid });
      });
      this.setState({ FINISH_NODE_COL: (newColumnCount - 3) }, () => {
        const newGrid = this.getInitialGrid();
        this.setState({ grid: newGrid });
      });
    }
  }  

  calculateColumnCount = () => {
    const width = window.innerWidth;
    if (width <= 480) return 15;
    if (width <= 768) return 20;
    return 25; // default column count
  }

  toggleIsRunning() {
    this.setState({isRunning: !this.state.isRunning});
  }

  // initialization of the grid
  getInitialGrid = (
    rowCount = this.state.ROW_COUNT,
    colCount = this.state.COLUMN_COUNT,
  ) => {
    const initialGrid = [];
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        currentRow.push(this.createNode(row, col));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  // creating nodes
  createNode = (row, col) => {
    return {
      row,
      col,
      isStart:
        row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
      isFinish:
        row === this.state.FINISH_NODE_ROW &&
        col === this.state.FINISH_NODE_COL,
      distance: Infinity,
      distanceToFinishNode:
        Math.abs(this.state.FINISH_NODE_ROW - row) +
        Math.abs(this.state.FINISH_NODE_COL - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };

  //handles the different controls for the mouse (editing walls, changing start and end positions)
  handleMouseDown(row, col) {
    if (!this.state.isRunning) {
      if (this.isGridClear()) {
        const node = this.state.grid[row][col];
        if (node.isStart) {
          this.setState({
            mouseIsPressed: true,
            isStartNode: true,
            currRow: row,
            currCol: col,
          });
        } else if (node.isFinish) {
          this.setState({
            mouseIsPressed: true,
            isFinishNode: true,
            currRow: row,
            currCol: col,
          });
        } else {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({
            grid: newGrid,
            mouseIsPressed: true,
            isWallNode: true,
            currRow: row,
            currCol: col,
          });
        }
      } else {
        this.clearGrid();
      }
    }
  }

  // checks if the grid is clear
  isGridClear() {
    for (const row of this.state.grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`,
        ).className;
        if (
          nodeClassName === 'node node-visited' ||
          nodeClassName === 'node node-shortest-path'
        ) {
          return false;
        }
      }
    }
    return true;
  }

  // when there is a mouse action inside the grid
  handleMouseEnter(row, col) {
    if (!this.state.isRunning) {
      if (this.state.mouseIsPressed) {
        const node = this.state.grid[row][col];
        if (this.state.isStartNode) {
          if (!node.isWall && !node.isFinish) {
            const newGrid = getNewGridWithMovedStart(this.state.grid, row, col, this.state.currRow, this.state.currCol);
            this.setState({
              grid: newGrid,
              currRow: row,
              currCol: col,
              START_NODE_ROW: row,
              START_NODE_COL: col,
            });
          }
        } else if (this.state.isFinishNode) {
          if (!node.isWall && !node.isStart) {
            const newGrid = getNewGridWithMovedFinish(this.state.grid, row, col, this.state.currRow, this.state.currCol);
            this.setState({
              grid: newGrid,
              currRow: row,
              currCol: col,
              FINISH_NODE_ROW: row,
              FINISH_NODE_COL: col,
            });
          }
        } else if (this.state.isWallNode) {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid});
        }
      }
    }
  }

    // when mouse action is outside the grid
    handleMouseLeave() {
      if (this.state.isStartNode) {
        const isStartNode = !this.state.isStartNode;
        this.setState({isStartNode, mouseIsPressed: false});
      } else if (this.state.isFinishNode) {
        const isFinishNode = !this.state.isFinishNode;
        this.setState({isFinishNode, mouseIsPressed: false});
      } else if (this.state.isWallNode) {
        const isWallNode = !this.state.isWallNode;
        this.setState({isWallNode, mouseIsPressed: false});
        this.getInitialGrid();
      }
    }

  // when mouse action is released
  handleMouseUp() {
    this.setState({mouseIsPressed: false, isStartNode: false, isFinishNode: false, isWallNode: false});
  }



  
  // clears grid of walls 
  clearWalls() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (nodeClassName === 'node node-wall') {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node';
            node.isWall = false;
          }
        }
      }
    }
  }

  // clears grid of pathfinding nodes and path nodes
  clearGrid() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (
            nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish' &&
            nodeClassName !== 'node node-wall'
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node';
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) +
              Math.abs(this.state.FINISH_NODE_COL - node.col);
          }
          if (nodeClassName === 'node node-finish') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
          if (nodeClassName === 'node node-start') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) +
              Math.abs(this.state.FINISH_NODE_COL - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
    }
  }


  // main animation for the pathfinding
  visualize(algo) {
    if (!this.state.isRunning) {
      this.clearGrid();
      this.toggleIsRunning();
      const {grid} = this.state;
      const startNode =
        grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode =
        grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
      let visitedNodesInOrder;
      switch (algo) {
        case 'Dijkstra':
          visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
          break;
        case 'BFS':
          visitedNodesInOrder = bfs(grid, startNode, finishNode);
          break;
        case 'DFS':
          visitedNodesInOrder = dfs(grid, startNode, finishNode);
          break;
        default:
          // should never get here
          break;
      }
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      nodesInShortestPathOrder.push('end');
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  // draws a path from the start to the end node
  animateShortestPath(nodesInShortestPathOrder) {
    distancestr="Shortest Distance: "+(nodesInShortestPathOrder.length-3).toString()+" cells"
   
    // visited_nodes="No. of Visited Nodes: "+ visited_nodes.toString() +" Cells";
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === 'end') {
        setTimeout(() => {
          this.toggleIsRunning();
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (
            nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish'
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }
        }, i * 40);
      }
    }
    visiNode="Cells Visited: "+(visited_nodes-1).toString()+" cells";
    document.getElementById('textDistance').style.cssText = "color: white;font-weight:800;font-size: larger;";
    document.getElementById('textDistance1').style.cssText = "color: white;font-weight:800;font-size: larger;";
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    if(visited_nodes>0)
      visited_nodes=-2;
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      visited_nodes+=1;
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`,
        ).className;
        if (
          nodeClassName !== 'node node-start' &&
          nodeClassName !== 'node node-finish'
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }
    
  }
  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <div className="pathfindcontent">
        <h1 style={{textAlign:"center"}}>Shortest Path Algorithms</h1>
        <div 
          className="grid-container"
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <table>
            <tbody className="grid">
              {grid.map((row, rowIdx) => {
                return (
                  <tr key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall} = node;
                      return (
                        <Node
                          key={nodeIdx}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          mouseIsPressed={mouseIsPressed}
                          onMouseDown={(row, col) =>
                            this.handleMouseDown(row, col)
                          }
                          onMouseEnter={(row, col) =>
                            this.handleMouseEnter(row, col)
                          }
                          onMouseUp={() => this.handleMouseUp()}
                          onTouchStart={() => this.handleTouchStart(row, col)}
                          row={row}></Node>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="dashboardArea">
          <h3>{distancestr}</h3>
          <h3>{visiNode}</h3>
          <div className="buttonArea">
            <button id="help" onClick={() => this.setState({ modal: true })}>
              <BiHelpCircle/> Help
            </button>
            <button
              type="button"
              onClick={() => this.clearGrid()}>
              <BiTrash /> Clear Grid
            </button>
            <button
              type="button"
              onClick={() => this.clearWalls()}>
              <BiTrash /> Clear Walls
            </button>
          </div>
          <div className="buttonArea">
            <div className="algorithm-button-group">
              <button
                type="button"
                className="info-button"
                onClick={() => this.setState({ algoInfoModal: true, selectedAlgorithm: 1 })}>
                <BiInfoCircle />
              </button>
              <button
                type="button"
                className="algorithm-button"
                onClick={() => this.visualize('Dijkstra')}>
                <BiPlayCircle/> Dijkstra's
              </button>
            </div>
            <div className="algorithm-button-group">
              <button
                type="button"
                className="info-button"
                onClick={() => this.setState({ algoInfoModal: true, selectedAlgorithm: 2 })}>
                <BiInfoCircle />
              </button>
              <button
                type="button"
                className="algorithm-button"
                onClick={() => this.visualize('BFS')}>
                <BiPlayCircle/> Breadth First Search
              </button>
            </div>
            <div className="algorithm-button-group">
              <button
                type="button"
                className="info-button"
                onClick={() => this.setState({ algoInfoModal: true, selectedAlgorithm: 3 })}>
                <BiInfoCircle />
              </button>
              <button
                type="button"
                className="algorithm-button"
                onClick={() => this.visualize('DFS')}>
                <BiPlayCircle/> Depth First Search
              </button>
            </div>
          </div>
        </div>

        {this.state.algoInfoModal && (
                    <div className="modal">
                        <div onClick={() => this.setState({ algoInfoModal: false })} className="overlay"></div>
                        <div className="modal-content">
                            {this.renderSortInfo()}
                            <button className="close-modal" onClick={() => this.setState({ algoInfoModal: false })}>
                                <BiX/>
                            </button>
                        </div>
                    </div>
                )}
        {this.state.modal && (
        <div className="modal">
          <div onClick={() => this.setState({ modal: false })} className="overlay"></div>
          <div className="modal-content">
              <h1>Path Finding Instructions</h1>
              <img src={start} style={{width:150}}></img>
              <p>Drag the starting point (blue) and the ending point (red) to change their positions.</p>
              <img src={wall} style={{width:150}}></img>
              <p>
                Click an empty cell to create a wall.
              </p>
              <img src={clearWall} style={{width:300}}></img>
              <p>The clear grid button will remove the previous path
                  Clear wall button will remove walls.
              </p>
              <img src={shortPath} style={{width:500}}></img>
              <p>
                Choose from the available algorithm to start the path finding process.
              </p>
              <button className="close-modal" onClick={() => this.setState({ modal: false })}>
                <BiX/>
              </button>
          </div>
        </div>
        )}
      </div>
    );
  }
}
// finds the shortest path by backtracking from the end node
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

// create walls 
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (!node.isStart && !node.isFinish) {
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};

const getNewGridWithMovedStart = (grid, row, col, prevRow, prevCol) => {
  const newGrid = grid.slice();
  const newNode = newGrid[row][col];
  const prevNode = newGrid[prevRow][prevCol];
  newNode.isStart = true;
  newNode.isWall = false;
  prevNode.isStart = false;
  return newGrid;
};

const getNewGridWithMovedFinish = (grid, row, col, prevRow, prevCol) => {
  const newGrid = grid.slice();
  const newNode = newGrid[row][col];
  const prevNode = newGrid[prevRow][prevCol];
  newNode.isFinish = true;
  newNode.isWall = false;
  prevNode.isFinish = false;
  return newGrid;
};