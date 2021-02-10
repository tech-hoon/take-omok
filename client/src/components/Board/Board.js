import "./Board.css";
import RefreshIcon from "@material-ui/icons/Refresh";
// Todo : 바둑알 위에 선 없애기

const Board = ({ array, passValue, color, turn }) => {
  const stoneEnter = ({ target: { id } }) => {
    // 게임 종료시
    if (turn === 0) {
      return;
    }

    if (turn === color) {
      const stone = document.getElementById(id);
      color === 1
        ? stone.classList.add("blackHover")
        : stone.classList.add("whiteHover");
    }
  };

  const stoneLeave = ({ target: { id } }) => {
    //게임 종료시
    if (turn === 0) {
      return;
    }

    if (turn === color) {
      const stone = document.getElementById(id);
      color === 1
        ? stone.classList.remove("blackHover")
        : stone.classList.remove("whiteHover");
    }
  };

  return (
    <>
      <div className="board">
        {array.map((_, i) => {
          return array.map((_, j) => {
            return (
              <button
                onClick={passValue}
                onMouseEnter={stoneEnter}
                onMouseLeave={stoneLeave}
                className="stones"
                id={`${i}-${j}`}
              ></button>
            );
          });
        })}
      </div>
      {/* <RefreshIcon
        fontSize="large"
        className="refreshButton"
        onClick={() => {
          window.location.reload();
        }}
      /> */}
    </>
  );
};

export default Board;
