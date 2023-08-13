import "./Button.css";

const Button = ({ resetGame, text }) => {
  const handleClick = () => {
    resetGame();
  };

  return (
    <button onClick={handleClick} className="reset-game">
      {text}
    </button>
  );
};

export default Button;
