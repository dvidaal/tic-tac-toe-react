import { useState } from "react";
import "./app.css";
import Button from "./components/Button/Button";
import Square from "./components/Square/Square";

const TURNS = {
  x: "X",
  o: "O",
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.x);

  const [winner, setWinner] = useState(null);

  const [isDisable, setDisable] = useState(false);

  const winnerCheck = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const updateBoard = (index) => {
    const newBoard = [...board];
    if (board[index] || winner) return;
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    const newWinner = winnerCheck(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setDisable(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
  };

  return (
    <>
      <main className="board">
        <h1 className="main-title">Tic Tac Toe</h1>
        <Button resetGame={resetGame} />
        <section className="game">
          {board.map((cell, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {cell}
            </Square>
          ))}
        </section>
        <section className="tokens">
          <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
          <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
        </section>
        <section className="user">
          <div className={`feedback ${isDisable ? "showModal" : ""}`}>
            {`Congratulations ${winner}`}
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
