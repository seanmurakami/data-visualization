import React, { useState } from "react";
import produce from "immer";

const rowCount = 30;
const colCount = 50;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(Array.from(Array(colCount), () => 0));
    }
    return rows;
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${colCount}, 26px)`,
        gridTemplateRows: `repeat(${rowCount}, 26px)`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            key={`${i} - ${k}`}
            style={{
              width: 25,
              height: 25,
              backgroundColor: grid[i][k] ? "pink" : undefined,
              border: "1px solid black",
            }}
            onClick={() => {
              const newGrid = produce(grid, (gridCopy) => {
                gridCopy[i][k] = 1;
              });
              setGrid(newGrid);
            }}
          />
        ))
      )}
    </div>
  );
}

export default App;
