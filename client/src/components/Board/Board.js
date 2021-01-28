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

      if (isFive([M, N])) {
        turn === 1
          ? alert("흑돌이 승리하였습니다.")
          : alert("백돌이 승리하였습니다.");
      }
      turn === 1 ? setTurn(2) : setTurn(1);
      console.log(array);
      //Todo : socket으로 값 전달
    }
  };

  const isFive = ([M, N]) => {
    M = Number(M);
    N = Number(N);

    let count = 1;
    let i = M;
    let j = N;

    //왼쪽에 붙일때
    while (count < 6) {
      if (j == 14) break;
      else if (array[i][j + 1] == turn) {
        count += 1;
        j = j + 1;
      } else break;
    }

    //오른쪽에 붙일때
    i = M;
    j = N;
    while (count < 6) {
      if (j == 0) break;
      else if (array[i][j - 1] == turn) {
        count += 1;
        j = j - 1;
      } else break;
    }

    if (count == 5) {
      return true;
    }

    //아래쪽에 붙일때
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i == 0) break;
      else if (array[i - 1][j] == turn) {
        count += 1;
        i = i - 1;
      } else break;
    }

    //아래쪽에 붙일때
    i = M;
    j = N;
    while (count < 6) {
      if (i == 14) break;
      else if (array[i + 1][j] == turn) {
        count += 1;
        i = i + 1;
      } else break;
    }

    if (count == 5) {
      return true;
    }

    // ↙ 위에 붙일때
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i == 14 || j == 0) break;
      else if (array[i + 1][j - 1] == turn) {
        count += 1;
        i = i + 1;
        j = j - 1;
      } else break;
    }

    // ↗ 아래에 붙일때
    i = M;
    j = N;
    while (count < 6) {
      if (i == 0 || j == 14) break;
      else if (array[i - 1][j + 1] == turn) {
        count += 1;
        i = i - 1;
        j = j + 1;
      } else break;
    }

    if (count == 5) {
      return true;
    }

    // ↘ 위에 붙일 때
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i == 14 || j == 14) break;
      else if (array[i + 1][j + 1] == turn) {
        count += 1;
        i = i + 1;
        j = j + 1;
      } else break;
    }

    // ↖ 아래에 붙일 때
    i = M;
    j = N;
    while (count < 6) {
      if (i == 0 || j == 0) break;
      else if (array[i - 1][j - 1] == turn) {
        count += 1;
        i = i - 1;
        j = j - 1;
      } else break;
    }

    return count == 5 ? true : false;
  };

  const isValid = ([M, N]) => {
    if (array[M][N] !== 0) {
      alert("이미 존재하는 돌입니다.");
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
