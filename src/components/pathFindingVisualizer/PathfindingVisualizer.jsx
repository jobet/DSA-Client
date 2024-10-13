import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra} from '../pathFindingAlgorithms/dijkstra';
import {dfs} from '../pathFindingAlgorithms/dfs';
import {bfs} from '../pathFindingAlgorithms/bfs';
import { BiInfoCircle, BiStop, BiHelpCircle, BiX, BiTrash, BiPlayCircle, BiChevronDown, BiExpand, BiSubdirectoryLeft } from "react-icons/bi";
import shortPath from '../images/shortPath.PNG';
import clearWall from '../images/clearWall.PNG';
import start from '../images/start.PNG';
import wall from '../images/wall.PNG';
import { PiLinkBreakLight } from 'react-icons/pi';

let distancestr='Shortest Distance: 0 cells';
let visited_nodes =-2;
let visiNode='Cells Visited: 0 cells';

// main component for the path finding visualizer
export default class PathfindingVisualizer extends Component {
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
      isDragging: false,
      touchStartTime: 0,
      algoName: "Dijkstra",
      selected: "Dijkstra",
      algoDropdown: false,
      algoIcon: <BiExpand className="itemIcon"/>,
      animationFrameId: null,
      speed: 1,
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
          touchStartTime: Date.now(),
        });
      } else if (node.isFinish) {
        this.setState({
          isFinishNode: true,
          mouseIsPressed: true,
          currRow: row,
          currCol: col,
          touchStartTime: Date.now(),
        });
      } else {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({
          grid: newGrid,
          isWallNode: true,
          mouseIsPressed: true,
          isDrawing: true,
          currRow: row,
          currCol: col,
          touchStartTime: Date.now(),
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
          const newRow = parseInt(row);
          const newCol = parseInt(col);
          if (this.state.isStartNode) {
            const newGrid = getNewGridWithMovedStart(this.state.grid, newRow, newCol, this.state.currRow, this.state.currCol);
            this.setState({
              grid: newGrid,
              currRow: newRow,
              currCol: newCol,
              START_NODE_ROW: newRow,
              START_NODE_COL: newCol,
            });
          } else if (this.state.isFinishNode) {
            const newGrid = getNewGridWithMovedFinish(this.state.grid, newRow, newCol, this.state.currRow, this.state.currCol);
            this.setState({
              grid: newGrid,
              currRow: newRow,
              currCol: newCol,
              FINISH_NODE_ROW: newRow,
              FINISH_NODE_COL: newCol,
            });
          } else if (this.state.isWallNode) {
            const newGrid = getNewGridWithWallToggled(this.state.grid, newRow, newCol);
            this.setState({grid: newGrid});
          }
          this.setState({
            lastTouchedNode: nodeKey,
            isDragging: true,
          });
        }
      }
    }
  }
  handleTouchEnd() {
    const touchDuration = Date.now() - this.state.touchStartTime;
    if (!this.state.isDragging && touchDuration < 200) {
      // This was a tap, toggle the wall
      const newGrid = getNewGridWithWallToggled(this.state.grid, this.state.currRow, this.state.currCol);
      this.setState({
        grid: newGrid,
      });
    }
    this.setState({
      mouseIsPressed: false,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false,
      isDrawing: false,
      lastTouchedNode: null,
      isDragging: false,
      touchStartTime: 0,
    });
  }

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
  async visualize(algo) {
    if (!this.state.isRunning) {
      this.clearGrid();
      await this.toggleIsRunning();
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
    } else {
      this.stopVisualization();
    }
  }

  stopVisualization() {
    this.toggleIsRunning();
  }

  // draws a path from the start to the end node
  async animateShortestPath(nodesInShortestPathOrder) {
    distancestr="Shortest Distance: "+(nodesInShortestPathOrder.length-3).toString()+" cells"
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if(this.state.isRunning){
        if(i === nodesInShortestPathOrder.length - 1) {
          visiNode="Cells Visited: "+(visited_nodes-1).toString()+" cells";
          await this.stopVisualization();
          break;
        }
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
        if (i % 10 === 0) {
          await this.updateSpeed(this.state.speed);
        }
      }
    }
  }

  async animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    if(visited_nodes>0)
      visited_nodes=-2;
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if(this.state.isRunning){
        visited_nodes+=1;
        if (i === visitedNodesInOrder.length){
          await this.animateShortestPath(nodesInShortestPathOrder);
        }
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
        if (i % 10 === 0) {
          await this.updateSpeed(this.state.speed);
        }
      }
      else{
        break;
      }
    }
  }

  updateSpeed(speed) {
    return new Promise(resolve => {
      setTimeout(() => {
          resolve();
      }, Math.round(300 * Math.pow(0.778, speed - 1)));
    });
  }
  
  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <div className="pathfindcontent">
        <h1 className="siteTitle">Shortest Path Algorithms</h1>
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
          <p><strong>{distancestr}</strong></p>
          <p><strong>{visiNode}</strong></p>
          <div className='slidercontainer'> 
                <div className="sliderlabel">
                    <p>Speed</p>
                    <p>{this.state.speed}x</p>
                </div>
                <input 
                    type='range' 
                    min={1} 
                    max={16} 
                    value={this.state.speed} 
                    onChange={async e => await this.setState({ speed: e.target.value })}
                    className='slider' 
                />
          </div>
          <div className="buttonArea">
            <button className="info-button" onClick={() => this.setState({ algoInfoModal: true })}>
              <BiInfoCircle/>
            </button>
            <div className="dropdown-container">
              <button 
              className='algorithm-button'
              onClick={() => this.setState({ algoDropdown: true })}
              disabled={this.state.isRunning}>
                {this.state.algoIcon} {this.state.algoName} <BiChevronDown className="dropDownIcon"/>
              </button>
              {this.state.algoDropdown && (
              <>
                <div onClick={() => this.setState({ algoDropdown: false })} className="overlay2"></div>
                <div className='appDropdown'>
                  <button onClick={() => this.setState({ algoDropdown: false, selected: "Dijkstra", algoName: "Dijkstra", selectedAlgorithm: 1, algoIcon: <BiExpand className="itemIcon"/> })}>Dijkstra</button>
                  <button onClick={() => this.setState({ algoDropdown: false, selected: "BFS", algoName: "Breadth First Search",selectedAlgorithm: 2, algoIcon: <BiExpand className="itemIcon"/>})}>Breadth First Search</button>
                  <button onClick={() => this.setState({ algoDropdown: false, selected: "DFS", algoName: "Depth First Search", selectedAlgorithm: 3, algoIcon: <BiSubdirectoryLeft className="itemIcon"/>,})}>Depth First Search</button>
                </div>
              </>
              )}
            </div>
          </div>
          <div className="buttonArea">
            <button id="help" onClick={() => this.setState({ modal: true })}>
              <BiHelpCircle/> Help
            </button>
            <button
              disabled={this.state.isRunning}
              type="button"
              onClick={() => this.clearGrid()}>
              <BiTrash /> Clear Grid
            </button>
            <button
              disabled={this.state.isRunning}
              type="button"
              onClick={() => this.clearWalls()}>
              <BiTrash /> Clear Walls
            </button>
            <button
            type="button"
            onClick={() => this.visualize(this.state.selected)}>
              {this.state.isRunning ? (
                <>
                <BiStop/> Stop
                </>
              ) : (
                <>
                <BiPlayCircle/> Start
                </>
              )}
            </button>
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
          <div id="modal-instruction" className="modal-content">
              <h1>Path Finding Instructions</h1>
              <div className="modalSeparator">
                <p>
                  Select the path finding algorithm you want to visualize.
                </p>
                <img src={shortPath}></img>
              </div>
              <div className="modalSeparator">
                <p>Drag the starting point (blue) and the ending point (red) to change their positions.</p>
                <img src={start}></img>
              </div>
              <div className="modalSeparator">
                <p>
                  Click an empty cell to create a wall.
                </p>
                <img src={wall}></img>
              </div>
              <div className="modalSeparator">
                <p>
                  The Clear grid button will remove the previous path.
                </p>
                <p>
                  The Clear wall button will remove all walls.
                </p>
                <p>
                  The Start button will begin the path finding process.
                </p>
                <img src={clearWall}></img>
              </div>
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