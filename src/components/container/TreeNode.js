import React from 'react'
import PropTypes from 'prop-types'

const TreeNode = ({data='', cx=10, cy=20, r= 30, textcolor='white', color='lightcyan', key = 1, className="DataNode", border="transparent", ani_dur="1.5s", ani_delay='1s', strokewidth= '2px'}) => {
  const addBitY = (cy, className) => {
    var mystring = cy.toString();
    let newCy  = mystring.replace('%', '');
    newCy = parseFloat(newCy)+1.25;
    newCy = newCy.toString()+'%';
    console.log(newCy);
    if (className !== 'DataNode') {
      return newCy;
    }
    else {
      return cy;
    }
  }
  return (
    [<circle className={className} key={key} cx={cx} cy={cy} r={r} style={{ animationDuration: ani_dur, animationDelay: ani_delay, "fill": color, "stroke":border, "strokeWidth": strokewidth}}>
      <title>{data}</title>
    </circle>,
    <text className={className} key={-1*key} x={cx} y={addBitY(cy, className)} width={r * 3 / 2} height={20} style={{fill: textcolor,textAnchor:'middle',animationDuration: ani_dur, animationDelay: ani_delay}}>
      {data.substring(0,4)}
      <title>{data}</title>
    </text>]
  )
}



TreeNode.propTypes = {
  data : PropTypes.string
}

export default TreeNode