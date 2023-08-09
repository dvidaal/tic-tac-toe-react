import "./app.css";
import Square from "./components/Square/Square";

const board = Array(9).fill(null);

const App = () => {
  return (
    <>
      <main>
        <h1 className="main-title">Tic Tac Toe</h1>
        <section className="board-game">
          {board.map((cell, index) => (
            <Square key={index} index={index} />
          ))}
        </section>
      </main>
    </>
  );
};

export default App;
