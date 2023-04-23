import React from 'react'

export default function Legend() {
  return (
    <div align="center">
        <svg width={"200%"}>   
            <circle r="10" fill="#33a02c" cx="3%" cy="35%"></circle>
            <text stroke="black" font-size="14px" x="8%" y="38%">Root Node</text>

            <circle r="10" fill="#b2df8a" cx="40%" cy="35%"></circle>
            <text stroke="black" font-size="14px" x="45%" y="38%">Expanded / Selection ( on Double Click )</text>

            <circle r="10" fill="#fb9a99" cx="3%" cy="65%"></circle>
            <text stroke="black" font-size="14px" x="8%" y="68%">Recommendation </text>

            <circle r="10" fill="#a6cee3" cx="40%" cy="65%"></circle>
            <text stroke="black" font-size="14px" x="45%" y="68%">Similar Artists ( Size ~ total tracks )</text>

        </svg>
 
    </div>
  )
}
