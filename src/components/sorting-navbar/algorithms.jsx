import React from 'react';

// the algorithm option component for the sorting navbar
const Algorithms = (props) => {
    return (
            <select 
                name="Algorithm" id="menu" className="algo-menu"
                onChange = {(e) => props.onChange(e.target.value, "algo")}>
                {props.algorithms.map(element => (
                    <option className="algo-option"
                        key = {element.value}
                        value = {element.value}>
                        {element.type}
                    </option>
                ))}
            </select>
    );
}
 
export default Algorithms;