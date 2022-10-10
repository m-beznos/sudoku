import { useState, useEffect } from "react";
import Cell from "./Cell";

const isDuplicateInArray = (arr) => {
  return (
    arr.find((item, index) => item && arr.indexOf(item) !== index) !== undefined
  );
};

const isDuplicateInRow = (field, row) => {
  return isDuplicateInArray(field[row].map((cell) => cell.value));
};

const isDuplicateInCol = (field, col) => {
  return isDuplicateInArray(field.map((row) => row[col].value));
};

const isDuplicateInBlock = (field, blockNumber) => {
  const firstBlockRow = Math.floor(blockNumber / 3) * 3;
  const firstBlockCol = (blockNumber % 3) * 3;

  const elements = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      elements.push(field[firstBlockRow + r][firstBlockCol + c].value);
    }
  }

  return isDuplicateInArray(elements);
};

const Sudoku = () => {
  const [gameField, setGameField] = useState(null);
  const [message, setMessage] = useState(null);

  const updateCell = (row, col, value) => {
    setGameField((prevField) => {
      const newField = prevField;
      newField[row][col].value = value;
      return newField;
    });
  };

  useEffect(() => {
    const rawField = [
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 8, 0, 0, 7, 0, 0, 9, 0],
      [1, 9, 0, 0, 0, 4, 5, 0, 0],
      [8, 2, 0, 1, 0, 0, 0, 4, 0],
      [0, 0, 4, 6, 0, 2, 9, 0, 0],
      [0, 5, 0, 0, 0, 3, 0, 2, 8],
      [0, 0, 9, 3, 0, 0, 0, 7, 4],
      [0, 4, 0, 0, 5, 0, 0, 3, 6],
      [7, 0, 3, 0, 1, 8, 0, 0, 0],
    ];

    setGameField(
      rawField.map((row) =>
        row.map((cell) => ({
          readOnly: cell !== 0,
          value: cell ? cell.toString() : "",
        }))
      )
    );
  }, []);

  const validateGameField = () => {
    for (let i = 0; i < 9; i++) {
      if (isDuplicateInBlock(gameField, i)) {
        setMessage({ type: "error", text: `Block #${i + 1} is invalid` });
        return;
      }
      if (isDuplicateInRow(gameField, i)) {
        setMessage({ type: "error", text: `Row #${i + 1} is invalid` });
        return;
      }
      if (isDuplicateInCol(gameField, i)) {
        setMessage({ type: "error", text: `Column #${i + 1} is invalid` });
        return;
      }
    }
    if (!gameField.find((row) => row.find((cell) => cell.value === ""))) {
      setMessage({ type: "success", text: `Completed!` });
      return;
    }

    setMessage(null);
  };

  return (
    <div className="sudoku">
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <table>
        <tbody>
          {gameField &&
            gameField.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <Cell
                    key={columnIndex}
                    value={cell.value}
                    readOnly={cell.readOnly}
                    updateValue={(value) =>
                      updateCell(rowIndex, columnIndex, value)
                    }
                  />
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      <button className="check-button" onClick={validateGameField}>
        Check answers
      </button>
    </div>
  );
};

export default Sudoku;
