import React from 'react';

// the speed option component for the sorting navbar
const Speed = (props) => {
    const [speed, setSpeed] = React.useState(1);

    const handleSpeedChange = (e) => {
        setSpeed(e.target.value);
        props.onChange(e.target.value, "speed");
    };
    return (
        <>
            <div className='slidercontainer'> 
                <div className="sliderlabel">
                    <p>Speed</p>
                    <p>{speed}x</p>
                </div>
                <input 
                    type='range' 
                    min={1} 
                    max={16} 
                    value={speed} 
                    onChange={handleSpeedChange} 
                    className='slider' 
                />
            </div>
        </>
    );
}
 
export default Speed;