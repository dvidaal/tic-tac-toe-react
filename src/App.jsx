import confetti from "canvas-confetti";
import { useState } from "react";
import "./app.css";
import Button from "./components/Button/Button";
import Square from "./components/Square/Square";
import { TURNS, WINNER_COMBOS } from "./constants";
import WinnerModal from "./components/WinnerModal/WinnerModal";

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

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
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
      confetti();
      setWinner(newWinner);
      setDisable(true);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      setDisable(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setDisable(false);
    setWinner(null);
  };

  return (
    <>
      <main className="board">
        <h1 className="main-title">Tic Tac Toe</h1>
        <Button resetGame={resetGame} text={"Reset Game"} />
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
          <WinnerModal
            isDisable={isDisable}
            winner={winner}
            resetGame={resetGame}
          />
        </section>
      </main>
    </>
  );
};

export default App;
