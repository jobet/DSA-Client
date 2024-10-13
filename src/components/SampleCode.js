import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { BiInfoCircle, BiX, BiChevronDown } from "react-icons/bi";
import { TbBinaryTree } from "react-icons/tb";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

// component that allows for sample code to be performed within the data structure visualizer
class SampleCode extends Component {

  arr = null;

  generateArray = (size) => {
    var arr = [];
    while(arr.length < size){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }
  constructor() {
    super()
    this.state = {
      open: false,
      selected: "Set Tree",
      algoInfoModal: false,
      selectedAlgorithm: 1,
      algoIcon: <TbBinaryTree className="itemIcon"/>,
    }
  }

  renderSortInfo() {
    const selectedAlgorithm = this.state.selectedAlgorithm;
    const sortInfo = {
        1: {
          name: "Tree",
          best: "O(log(n))",
          worst: "O(log(n))",
          description: "A binary tree is a tree where each node has at most two children. The common operations such as search, insertion, and deletion have a time complexity of O(log n) in a balanced tree.",
          code: `
//General Tree

function Node(value) {

    this.value = value;
    this.children = [];
    this.parent = null;

    this.setParentNode = function(node) {
        this.parent = node;
    }

    this.getParentNode = function() {
        return this.parent;
    }

    this.addChild = function(node) {
    node.setParentNode(this);
    this.children[this.children.length]=node;
    }

    this.getChildren = function() {
        return this.children;
    }

    this.removeChildren = function() {
        this.children = [];
    }
}

var root = new Node('root');
root.addChild(new Node('child 0'));
root.addChild(new Node('child 1'));
var children = root.getChildren();
for(var i = 0; i < children.length; i++) {
    for(var j = 0; j < 5; j++) {
        children[i].addChild(new Node(
            'second level child ' + j));
    }
}
console.log(root);
children[0].removeChildren();
console.log(root);
console.log(root.getParentNode());
console.log(children[1].getParentNode());

//Red & Black Tree

const RED = true;
const BLACK = false;
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.color = RED;
    }
}
class RBT {
    constructor() {
        this.root = null;
        this.size = 0;
    }
    isRed(node) {
        if (!node) return BLACK;
        return node.color;
    }
    // Left right red left black
    leftRotate(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        tmp.color = node.color;
        node.color = RED;
        return tmp;
    }
    // Right rotation left red left sub red
    rightRoate(node) {
        let tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        tmp.color = node.color;
        node.color = RED;
        return tmp;
    }
    // Color reversal
    flipColors(node) {
        node.color = RED;
        node.left.color = BLACK;
        node.right.color = BLACK;
    }
    add(key, value) {
        this.root = this.addRoot(this.root,
             key, value);
        this.root.color = BLACK; 
        // Root node is always black
    }
    addRoot(node, key, value) {
        if (!node) {
            this.size++;
            return new Node(key, value);
        }
        if (key < node.key) {
        node.left = this.addRoot(node.left, 
                key, value);
        } else if (key > node.key) {
        node.right = this.addRoot(node.right, 
                key, value);
        } else {
            node.value = value;
        }
        if (this.isRed(node.right) && 
        !this.isRed((node.left))) {
            node = this.leftRotate(node);
        }
        if (this.isRed(node.left) && 
        this.isRed((node.left.left))) {
            node = this.rightRoate(node);
        }
        if (this.isRed(node.left) && 
        this.isRed(node.right)) {
            this.flipColors(node);
        }
        return node;
    }
    isEmpty() {
        return this.size == 0 ? true : false;
    }
    getSize() {
        return this.size;
    }
    contains(key) {
        let ans = '';
        !(function getNode(node, key) {
            if (!node || key == node.key) {
                ans = node;
                return node;
            } else if (key > node.key) {
            return getNode(node.right, key);
            } else {
            return getNode(node.right, key);
            }
        })(this.root, key);
        return !!ans;
    }
    // bst preamble traversal 
    (recursive version)
    preOrder(node = this.root) {
        if (node == null) return;
        console.log(node.key);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
    preOrderNR() {
        if (this.root == null) return;
        let stack = [];
        stack.push(this.root);
        while (stack.length > 0) {
            let curNode = stack.pop();
            console.log(curNode.key);
            if (curNode.right != null) 
                stack.push(curNode.right);
            if (curNode.left != null) 
                curNode.push(curNode.left);
        }
    }
    // bst middle order traversal
    inOrder(node = this.root) {
        if (node == null) return;
        this.inOrder(node.left);
        console.log(node.key);
        this.inOrder(node.right);
    }
    // bst subsequent traversal
    postOrder(node = this.root) {
        if (node == null) return;
        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.key);
    }
    // The way of bsf + queue to 
    // realize hierarchical traversal
    generateDepthString1() {
        let queue = [];
        queue.unshift(this.root);
        while (queue.length > 0) {
        let tmpqueue = []; let ans = [];
        queue.forEach(item => {
            ans.push(item.key);
        item.left ? 
        tmpqueue.push(item.left):'';
        item.right ? 
        tmpqueue.push(item.right):'';
        });
        console.log(...ans);
        queue = tmpqueue;
        }
    }
    minmun(node = this.root) {
        if (node.left == null) return node;
        return this.minmun(node.left);
    }
    maximum(node = this.root) {
        if (node.right == null) return node;
        return this.maximum(node.right);
    }
}
`},
        2: {
          name: "Map Tree",
          best: "O(log(n))",
          worst: "O(log(n))",
          description: "An AVL tree is a self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most one. This property ensures that operations such as search, insertion, and deletion are O(log n).",
          code: `
      class AVLNode {
        constructor(key) {
          this.key = key;
          this.height = 1;
          this.left = null;
          this.right = null;
        }
      }
      class AVLTree {
        // AVL tree methods such as insertion, rotation, etc.
      }`
        },
        3: {
          name: "Doubly Linked List",
          best: "O(1)",
          worst: "O(n)",
          description: "A doubly linked list allows traversal in both directions as each node has pointers to both the next and previous nodes. Operations such as insertion and deletion are efficient with a time complexity of O(1). However, searching or accessing a node takes O(n).",
          code: `
class Node {
    // constructor
    constructor(element) {
        this.element = element;
        this.next = null
    }
}
// linkedlist class
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
 
    // adds an element at the end
    // of list
    add(element) {
        // creates a new node
        var node = new Node(element);
 
        // to store current node
        var current;
 
        // if list is Empty add the
        // element and make it head
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
 
            // iterate to the end of the
            // list
            while (current.next) {
                current = current.next;
            }
 
            // add node
            current.next = node;
        }
        this.size++;
    }
 
    // insert element at the position index
    // of the list
    insertAt(element, index) {
        if (index < 0 || index > this.size)
            return console.log("Please enter 
            a valid index.");
        else {
            // creates a new node
            var node = new Node(element);
            var curr, prev;
 
            curr = this.head;
 
            // add the element to the
            // first index
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                curr = this.head;
                var it = 0;
 
                // iterate over the list 
                // to find the position 
                // to insert
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // adding an element
                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }
 
    // removes an element from the
    // specified location
    removeFrom(index) {
        if (index < 0 || index >= this.size)
            return console.log("Please Enter 
            a valid index");
        else {
            var curr, prev, it = 0;
            curr = this.head;
            prev = curr;
 
            // deleting first element
            if (index === 0) {
                this.head = curr.next;
            } else {
                // iterate over the list 
                // to the position to 
                // remove an element
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // remove the element
                prev.next = curr.next;
            }
            this.size--;
 
            // return the remove element
            return curr.element;
        }
    }
 
    // removes a given element from the
    // list
    removeElement(element) {
        var current = this.head;
        var prev = null;
 
        // iterate over the list
        while (current != null) {
            // comparing element with 
            // current element if found 
            // then remove the and 
            // return true
            if (current.element === element) 
            {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }
 
 
    // finds the index of element
    indexOf(element) {
        var count = 0;
        var current = this.head;
 
        // iterate over the list
        while (current != null) {
            // compare each element of 
            // the list with given element
            if (current.element === element)
                return count;
            count++;
            current = current.next;
        }
 
        // not found
        return -1;
    }
 
    // checks the list for empty
    isEmpty() {
        return this.size == 0;
    }
 
    // gives the size of the list
    size_of_list() {
        console.log(this.size);
    }
`
        },
        4: {
          name: "Queue",
          best: "O(1)",
          worst: "O(n)",
          description: "A queue follows the First In First Out (FIFO) principle. Items are added at the back and removed from the front. Insertion and deletion operations have O(1) complexity, while accessing or searching takes O(n).",
          code: `
class Queue {
    constructor() {
      this.items = {};
      this.headIndex = 0;
      this.tailIndex = 0;
    }
    enqueue(item) {
      this.items[this.tailIndex] = item;
      this.tailIndex++;
    }
    dequeue() {
      const item = this.items[this.headIndex];
      delete this.items[this.headIndex];
      this.headIndex++;
      return item;
    }
    peek() {
      return this.items[this.headIndex];
    }
    get length() {
      return this.tailIndex - this.headIndex;
    }
  }
`
        },
        5: {
          name: "Priority Queue",
          best: "O(log(n))",
          worst: "O(log(n))",
          description: "A priority queue is a special type of queue where each element is associated with a priority, and the highest priority elements are dequeued first. Insertion and deletion have O(log n) complexity.",
          code: `
const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], 
        this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = 
    [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && 
        this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && 
      this._greater(left(node), node)) ||
      (right(node) < this.size() && 
      this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < 
      this.size() && 
      this._greater(right(node), 
      left(node))) ? right(node):left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
`} 
    }
    const info = sortInfo[selectedAlgorithm];
    return (
      <div>
          <h1>{info.name}</h1>
          <p>{info.description}</p>
          <h2>Complexity</h2>
          <table className='complexity-table'>
              <tbody>
                  <tr>
                      <th>Best</th>
                      <th>Worst</th>
                  </tr>
                  <tr>
                      <td>{info.best}</td>
                      <td>{info.worst}</td>
                  </tr>
              </tbody>
          </table>
          <h2>Code</h2>
          <pre><code>{info.code}</code></pre>
      </div>
    );
  }

  setSetTree = () => {
    this.setState({selected: "Set Tree", selectedAlgorithm: 1,  algoIcon: <TbBinaryTree className="itemIcon"/>});
    this.props.changeSample(
      `let tree = new std.SetTree();
      data.Set_Tree_Keys.map(n => tree.insert(n));
      `,
`{
  Set_Tree_Keys:[`+this.generateArray(5)+`]
}`
    );
    this.closeButton();
  }

  setMapTree = () => {
    this.setState({selected: "Map Tree", selectedAlgorithm: 2,  algoIcon: <TbBinaryTree className="itemIcon"/>});
    this.props.changeSample(
      `let tree = new std.MapTree();
      data.Map_Tree_Keys.map(
        n=>tree.insert(n, 'number' + n.toString())
      );
      `,
`{
  Map_Tree_Keys:[`+this.generateArray(5)+`]
}`
    );
    this.closeButton();
  }

  setList = () => {
    this.setState({selected: "Doubly Linked List", selectedAlgorithm: 3,  algoIcon: <PiDotsThreeOutlineFill className="itemIcon"/>});
    this.props.changeSample(
      `let li = new std.List();
      data.Doubly_Linked_List.map(d => li.pushBack(d));
      [1,1,1].map(x => li.popFront());
      data.Doubly_Linked_List.map(n => li.pushFront(n));
      [1,1,1].map(x => li.popBack());
      `,
`{
  Doubly_Linked_List:[`+this.generateArray(5)+`]
}`
    );
    this.closeButton();
  }

  setQueue = () => {
    this.setState({selected: "Queue", selectedAlgorithm: 4,  algoIcon: <PiDotsThreeOutlineFill className="itemIcon"/>});
    this.props.changeSample(
      `let qu = new std.Queue(data.Queue_base);
      data.Queue_push.map(d => qu.push(d));
      [1,1,1].map(n=>qu.pop());
      `,
`{
  Queue_base:[`+this.generateArray(3)+`],
  Queue_push:[`+this.generateArray(5)+`]
}`
    );
    this.closeButton();
  }

  setPriorityQueue = () => {
    this.setState({selected: "Priority Queue", selectedAlgorithm: 5,  algoIcon: <PiDotsThreeOutlineFill className="itemIcon"/>});
    this.props.changeSample(
      `let pq = new std.PriorityQueue();
      data.Priority_Queue.map(d => pq.push(d));
      [1,1,1,1,1].map(k => pq.pop());
      `,
`{
  Priority_Queue:[`+this.generateArray(5)+`]
}`
    );
    this.closeButton();
  }
  
  closeButton = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <button className="info-button" onClick={() => this.setState({ algoInfoModal: true })}>
          <BiInfoCircle/>
        </button>
        <div className="dropdown-container">
        <button disabled={this.props.stopShow} className='algorithm-button' onClick={this.closeButton}>
          {this.state.algoIcon}{this.state.selected} <BiChevronDown className="dropDownIcon"/>
        </button>
        {this.state.open && (
          <>
            <div onClick={this.closeButton} className="overlay2"></div>
            <div className='appDropdown'>
              <button onClick={() => this.setSetTree()}>Set Tree</button>
              <button onClick={() => this.setMapTree()}>Map Tree</button>
              <button onClick={() => this.setList()}>Doubly Linked List</button>
              <button onClick={() => this.setQueue()}>Queue</button>
              <button onClick={() => this.setPriorityQueue()}>Priority Queue</button>
            </div>
          </>
        )}
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
        </div>
      </>
    )
  }
}

SampleCode.propTypes = {
  changeSample : PropTypes.func,
  stopShow : PropTypes.bool,
}

SampleCode.defaultProps = {
  changeSample: f=>f
}

export default SampleCode;