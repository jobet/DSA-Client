import React from 'react';

// the size or number of items option component for the sorting navbar
const Size = (props) => {
    const [size, setSize] = React.useState(10);

    const handleSizeChange = (e) => {
        setSize(e.target.value);
        props.onChange(e.target.value, "size");
    };
    return (
        <>
            <div className='slidercontainer'> 
                <div className="sliderlabel">
                    <p>Amount of Items</p>
                    <p>{size}</p>
                </div>
                <input 
                    type='range' 
                    min={10} 
                    max={30} 
                    value={size} 
                    onChange={handleSizeChange} 
                    className='slider' 
                />
            </div>
        </>
    );
}
 
export default Size;