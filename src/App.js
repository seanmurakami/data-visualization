import React, { useState, useCallback } from "react";
import produce from "immer";

const rowCount = 30;
const colCount = 50;

const operations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(Array.from(Array(colCount), () => 0));
    }
    return rows;
  });

  const selectCell = (x, y) => {
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[x][y] = 1;
    });
    setGrid(newGrid);
  };

  const startLookup = useCallback(() => {
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < colCount; j++) {
            operations.forEach(([x, y]) => {
              if (g[i][j]) {
                const newX = i + x;
                const newY = j + y;
                if (
                  newX >= 0 &&
                  newX < rowCount &&
                  newY >= 0 &&
                  newY < colCount
                ) {
                  gridCopy[newX][newY] = 1;
                }
              }
            });
          }
        }
      });
    });

    setTimeout(startLookup, 100);
  }, []);

  return (
    <>
      <button onClick={startLookup}>start</button>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "60px",
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
                backgroundColor: grid[i][k] ? "blue" : undefined,
                border: "1px solid black",
              }}
              onClick={() => selectCell(i, k)}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
