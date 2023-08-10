import { useState } from "react";
import "./app.css";
import Button from "./components/Button/Button";
import Square from "./components/Square/Square";

const turns = {
  x: "X",
  o: "O",
};

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(turns.x);

  const updateBoard = (index) => {
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === turns.x ? turns.o : turns.x;
    setTurn(newTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.x);
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
          <Square isSelected={turn === turns.x}>{turns.x}</Square>
          <Square isSelected={turn === turns.o}>{turns.o}</Square>
        </section>
      </main>
    </>
  );
};

export default App;
