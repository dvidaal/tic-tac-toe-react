import Button from "../Button/Button";
import Square from "../Square/Square";
import "./WinnerModal.css";

const WinnerModal = ({ isDisable, winner, resetGame }) => {
  const className = `feedback ${isDisable ? "showModal" : ""}`;
  const winnerText = winner ? "Congratulations" : "It's a tie";

  return (
    <div className={className}>
      <h2 className="winner">{winnerText}</h2>
      <Square>{winner}</Square>
      <footer>
        <Button text={"Play again"} resetGame={resetGame} />
      </footer>
    </div>
  );
};

export default WinnerModal;
