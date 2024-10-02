import React from 'react';
import Algorithms from './sorting-navbar/algorithms';
import { BiInfoCircle, BiX, BiLayer } from "react-icons/bi";
import Size from './sorting-navbar/size';
import Speed from './sorting-navbar/speed';

class SortType extends React.Component {
    state = {
        algorithms: [
            { value: 1, type: 'Bubble Sort' },
            { value: 2, type: 'Insertion Sort' },
            { value: 3, type: 'Merge Sort' },
            { value: 4, type: 'Quick Sort' },
            { value: 5, type: 'Heap Sort' },
        ],
        lengths: [10, 20, 30],
        speeds: [0.50, 0.75, 1.00, 2.00, 4.00, 8.00, 16.00, 32.00, 64.00, 128.00],
    };

    handleClick = (e) => {
        e.preventDefault();
        this.props.response();
    }

    renderSortInfo() {
        const selectedAlgorithm = this.props.algorithm;
        if (!selectedAlgorithm) return null;
        const sortInfo = {
            1: {
                name: "Bubble Sort",
                best: "Ω(n)",
                worst: "O(n^2)",
                description: "Bubble sort compares two adjacent elements and swaps them until they are in the intended order.",
                code: `function bubbleSort(arr, n) {
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
}`
            },
            2: {
                name: "Insertion Sort",
                best: "Ω(n)",
                worst: "O(n^2)",
                description: "Insertion sort works by virtually splitting the array into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.",
                code: `function insertionSort(arr, n) {
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
            },
            3: {
                name: "Merge Sort",
                best: "Ω(n log(n))",
                worst: "O(n log(n))",
                description: "Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
                code: `function mergeSort(array) {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`
            },
            4: {
                name: "Quick Sort",
                best: "Ω(n log(n))",
                worst: "O(n^2)",
                description: "QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.",
                code: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`
            },
            5: {
                name: "Heap Sort",
                best: "Ω(n log(n))",
                worst: "O(n log(n))",
                description: "Heap sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the minimum element and place the minimum element at the beginning.",
                code: `function heapSort(arr) {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
}

function heapify(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest])
        largest = l;
    if (r < n && arr[r] > arr[largest])
        largest = r;
    if (largest != i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}`
            }
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

    render() {
        return (
            <>
                <div className="settingArea">
                    <div className="settingLabel">
                        <p>No. of Items</p>
                    </div>
                    <div className="settingSelect">
                        <Size 
                            onChange={this.props.onChange}
                            lengths={this.state.lengths}
                        />
                    </div>
                    <div className="settingLabel">
                        <p>Sort Speed</p>
                    </div>
                    <div className="settingSelect">
                        <Speed 
                            onChange={this.props.onChange}
                            speeds={this.state.speeds}
                        />
                    </div>
                </div>
                <div className="navbar-algorithms" id="navbar">
                    <div className="navbarInfo">
                        <button onClick={() => this.setState({ algoInfoModal: true })}>
                            <BiInfoCircle/>
                        </button>
                    </div>
                    <div className="navbarSelect">
                        <BiLayer className="selectIcon"/>
                        <Algorithms 
                            onChange={this.props.onChange}
                            algorithms={this.state.algorithms}
                        />
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
                </div>
            </>
        );
    }
}
 
export default SortType;