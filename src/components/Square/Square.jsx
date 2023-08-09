import "./Square.css";

const Square = ({ children, updatedBoard, index }) => {
  return (
    <>
      <div className="square-board">{children}</div>
    </>
  );
};

export default Square;
