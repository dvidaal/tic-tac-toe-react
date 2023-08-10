import "./Button.css";

const Button = ({ resetGame }) => {
  const handleClick = () => {
    resetGame();
  };

  return (
    <button onClick={handleClick} className="reset-game">
      Reset Game
    </button>
  );
};

export default Button;
