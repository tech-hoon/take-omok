import "./Board.css";
import { useState, useEffect } from "react";
const LINE_NUMBER = 15;

const Board = () => {
  //1 : black,  2 : white
  const [turn, setTurn] = useState(1);
  let [array, setArray] = useState(
    Array.from(Array(LINE_NUMBER), () => Array(LINE_NUMBER).fill(0))
  );

  const stoneMover = ({ target: { id } }) => {
    const stone = document.getElementById(id);
    turn === 1
      ? stone.classList.add("blackHover")
      : stone.classList.add("whiteHover");
  };

  const stoneMout = ({ target: { id } }) => {
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

  const isValid = ([M, N]) => {
    if (array[M][N] !== 0) {
      alert("이미 존재하는 돌입니다.");
      return false;
    }
    //Todo : 승리 판정
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
                onMouseOver={stoneMover}
                onMouseOut={stoneMout}
                className='stones'
                id={`${i}-${j}`}
              />
            );
          });
        })}
      </div>
    </>
  );
};

export default Board;
