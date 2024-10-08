import React, { useState } from 'react';
import { BiChevronDown, BiLayer } from 'react-icons/bi';

const Algorithms = (props) => {
    const [algoDropdown, setAlgoDropdown] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [algoName, setAlgoName] = useState("Bubble Sort");

    const handleSelect = (algorithm, name, id) => {
        setAlgoDropdown(false);
        setSelectedAlgorithm(id);
        setAlgoName(name);
        props.onChange(algorithm, "algo");
    };

    return (
        <div className="dropdown-container">
            <button 
                disabled={props.running}
                className="algorithm-button"
                onClick={() => setAlgoDropdown(!algoDropdown)}
            >
                <BiLayer className="itemIcon"/> {algoName} <BiChevronDown className="dropDownIcon"/>
            </button>
            {algoDropdown && (
                <>
                    <div 
                        onClick={() => setAlgoDropdown(false)} 
                        className="overlay2"
                    ></div>

                    <div className='appDropdown'>
                        {props.algorithms.map((element, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(element.value, element.type, index + 1)}
                            >
                                {element.type}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Algorithms;
