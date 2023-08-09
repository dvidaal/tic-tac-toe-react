import "./app.css";
import Button from "./components/Button/Button";
import Square from "./components/Square/Square";

const board = Array(9).fill(null);

const App = () => {
  return (
    <>
      <main className="board">
        <h1 className="main-title">Tic Tac Toe</h1>
        <Button />
        <section className="board-game">
          {board.map((cell, index) => (
            <Square key={index} index={index} />
          ))}
        </section>
        <section className="tokens">
          <span>❌⚪️</span>
        </section>
      </main>
    </>
  );
};

export default App;
