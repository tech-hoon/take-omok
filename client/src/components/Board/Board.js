import "./Board.css";
import { useState, useEffect } from "react";
const LINE_NUMBER = 15;

// Todo : 바둑알 위에 선 없애기

const Board = () => {
  //1 : black,  2 : white
  const [turn, setTurn] = useState(1);
  let [array, setArray] = useState(
    Array.from(Array(LINE_NUMBER), () => Array(LINE_NUMBER).fill(0))
  );

  const stoneEnter = ({ target: { id } }) => {
    const stone = document.getElementById(id);
    turn === 1
      ? stone.classList.add("blackHover")
      : stone.classList.add("whiteHover");
  };

  const stoneLeave = ({ target: { id } }) => {
    const stone = document.getElementById(id);
    turn === 1
      ? stone.classList.remove("blackHover")
      : stone.classList.remove("whiteHover");
  };

  const passValue = ({ target: { id } }) => {
    // id => M,N
    const [M, N] = id.split("-");
    if (isValid([M, N]) === true) {
      array[M][N] = turn;
      putStone(id);

      turn === 1 ? setTurn(2) : setTurn(1);
      //Todo : socket으로 값 전달
    }
  };

  //Todo : 승리 판정
  const isWin = ([M, N]) => {
    let i = M,
      j = N,
      count = 1;

    return false;
  };

  const isValid = ([M, N]) => {
    if (array[M][N] !== 0) {
      alert("이미 존재하는 돌입니다.");
      return false;
    } else if (isWin([M, N])) {
      turn === 1
        ? alert(`{흑돌}이 승리하였습니다.`)
        : alert("백돌이 승리하였습니다.");
      return false;
    }
    return true;
  };

  const putStone = (id) => {
    const stone = document.getElementById(id);
    stone.style.borderRadius = "50%";
    stone.style.backgroundColor = turn === 1 ? "black" : "white";
  };

  useEffect(() => {
    console.log(`${turn === 1 ? "흑" : "백"}차례입니다.`);
  });

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
