import "./Board.css";
// Todo : 바둑알 위에 선 없애기

const Board = ({ array, passValue, color, turn }) => {
  const stoneEnter = ({ target: { id } }) => {
    const stone = document.getElementById(id);
    color === 1
      ? stone.classList.add("blackHover")
      : stone.classList.add("whiteHover");
  };

  const stoneLeave = ({ target: { id } }) => {
    const stone = document.getElementById(id);
    color === 1
      ? stone.classList.remove("blackHover")
      : stone.classList.remove("whiteHover");
  };

  // const touchDisable = () =>{
  //   (turn != color) ?  document.
  // }

  // const touchAble = () =>{

  // }

  return (
    <>
      <div className='board'>
        {array.map((_, i) => {
          return array.map((_, j) => {
            return (
              <button
                onClick={passValue}
                onMouseEnter={stoneEnter}
                onMouseLeave={stoneLeave}
                className='stones'
                id={`${i}-${j}`}
              ></button>
            );
          });
        })}
      </div>
    </>
  );
};

export default Board;
