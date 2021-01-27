import "./Board.css";
import { useState, useEffect } from "react";
const LINE_NUMBER = 3;

const Board = () => {
  //1 : black,  2 : white
  const [turn, setTurn] = useState(1);
  let [array, setArray] = useState(
    Array.from(Array(LINE_NUMBER), () => Array(LINE_NUMBER).fill(0))
  );

  const isValid = ([M, N]) => {
    if (array[M][N] !== 0) {
      alert("이미 존재하는 돌입니다.");
      return false;
    } else if (array[M][N]) {
    }

    return true;
  };

  const passValue = ({ target: { id } }) => {
    // id => M,N
    const [M, N] = id.split("-");
    if (isValid([M, N]) === true) {
      array[M][N] = turn;
      turn === 1 ? setTurn(2) : setTurn(1);
      //Todo : socket으로 값 전달
      putStone(id);
    }
  };

  const putStone = (id) => {
    const stone = document.getElementById(id);
    // stone.style.visibility = "visible";
    stone.style.backgroundColor = turn === 1 ? "black" : "white";
  };

  useEffect(() => {
    console.log(`${turn === 1 ? "흑" : "백"}차례입니다.`);
    console.log(array);
  });

  return (
    <>
      <div className='board'>
        <button onClick={passValue} className='stones' id='0-0'>
          A
        </button>
        <button onClick={passValue} className='stones' id='0-1'>
          B
        </button>
        <button onClick={passValue} className='stones' id='0-2'>
          C
        </button>
        <button onClick={passValue} className='stones' id='1-0'>
          D
        </button>
        <button onClick={passValue} className='stones' id='1-1'>
          E
        </button>
        <button onClick={passValue} className='stones' id='1-2'>
          F
        </button>
        <button onClick={passValue} className='stones' id='2-0'>
          G
        </button>
        <button onClick={passValue} className='stones' id='2-1'>
          H
        </button>
        <button onClick={passValue} className='stones' id='2-2'>
          I
        </button>
      </div>
    </>
  );
};

export default Board;
