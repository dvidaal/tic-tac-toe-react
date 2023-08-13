import confetti from "canvas-confetti";
import { useState } from "react";
import "./app.css";
import Button from "./components/Button/Button";
import Square from "./components/Square/Square";
import { TURNS } from "./constants";
import WinnerModal from "./components/WinnerModal/WinnerModal";
import { checkEndGame, winnerCheck } from "./components/logic/board";
import {
  resetGameStorage,
  saveGameToStorage,
} from "./components/logic/storage";

const App = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(TURNS.x);
  const [winner, setWinner] = useState(null);
  const [isDisable, setDisable] = useState(false);

  const updateBoard = (index) => {
    const newBoard = [...board];
    if (board[index] || winner) return;
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });
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

    resetGameStorage();
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
