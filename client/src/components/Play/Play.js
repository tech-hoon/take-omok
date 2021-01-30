import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Play.css";
import Messages from "../Messages/Messages";
import Board from "../Board/Board";
import Input from "../Input/Input";
const LINE_NUMBER = 15;

const ENDPOINT = "localhost:5000";

let socket;
//Todo: socket

const Play = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [color, setColor] = useState(1); //1 : black,  2 : white
  // const [turn, setTurn] = useState(1); //1 : black,  2 : white`
  let [array, _] = useState(
    Array.from(Array(LINE_NUMBER), () => Array(LINE_NUMBER).fill(0))
  );

  //Render될 떄마다 표시
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  // console.log(`당신은 ${turn === 1 ? "흑" : "백"}돌입니다.`);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    //돌 정하기
    socket.on("color", (color) => {
      setColor(color.color);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // 값 관리
  const passValue = ({ target: { id } }) => {
    // id => M,N
    const [M, N] = id.split("-");
    if (isValid([M, N]) === true) {
      array[M][N] = color;
      putStone(id);
      // socket.emit("passValue", id);

      if (isFive([M, N])) {
        color === 1
          ? alert("흑돌이 승리하였습니다.")
          : alert("백돌이 승리하였습니다.");
      }
      // turn === 1 ? setTurn(2) : setTurn(1);
      //Todo : socket으로 값 전달
    }
  };

  //이미 존재하는지
  const isValid = ([M, N]) => {
    if (array[M][N] !== 0) {
      alert("이미 존재하는 돌입니다.");
      return false;
    }
    return true;
  };

  //돌을 화면 위에 표시
  const putStone = (id) => {
    const stone = document.getElementById(id);
    stone.style.borderRadius = "50%";
    stone.style.backgroundColor = color === 1 ? "black" : "white";
  };

  // 승리 판단
  const isFive = ([M, N]) => {
    M = Number(M);
    N = Number(N);

    let count = 1;
    let i = M;
    let j = N;

    //왼쪽에 붙일때
    while (count < 6) {
      if (j === 14) break;
      else if (array[i][j + 1] === color) {
        count += 1;
        j += 1;
      } else break;
    }

    //오른쪽에 붙일때
    i = M;
    j = N;
    while (count < 6) {
      if (j === 0) break;
      else if (array[i][j - 1] === color) {
        count += 1;
        j -= 1;
      } else break;
    }

    if (count === 5) {
      return true;
    }

    //아래쪽에 붙일때
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i === 0) break;
      else if (array[i - 1][j] === color) {
        count += 1;
        i -= 1;
      } else break;
    }

    //아래쪽에 붙일때
    i = M;
    j = N;
    while (count < 6) {
      if (i === 14) break;
      else if (array[i + 1][j] === color) {
        count += 1;
        i += 1;
      } else break;
    }

    if (count === 5) {
      return true;
    }

    // ↙ 위에 붙일때
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i === 14 || j === 0) break;
      else if (array[i + 1][j - 1] === color) {
        count += 1;
        i += 1;
        j -= 1;
      } else break;
    }

    // ↗ 아래에 붙일때
    i = M;
    j = N;
    while (count < 6) {
      if (i === 0 || j === 14) break;
      else if (array[i - 1][j + 1] === color) {
        count += 1;
        i -= 1;
        j += 1;
      } else break;
    }

    if (count === 5) {
      return true;
    }

    // ↘ 위에 붙일 때
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i === 14 || j === 14) break;
      else if (array[i + 1][j + 1] === color) {
        count += 1;
        i += 1;
        j += 1;
      } else break;
    }

    // ↖ 아래에 붙일 때
    i = M;
    j = N;
    while (count < 6) {
      if (i === 0 || j === 0) break;
      else if (array[i - 1][j - 1] === color) {
        count += 1;
        i -= 1;
        j -= 1;
      } else break;
    }

    return count === 5 ? true : false;
  };

  //Todo : 쌍삼
  // const isSamSam = ([M, N]) => {};

  return (
    <div className='container'>
      <Board array={array} passValue={passValue} color={color} />
      <div className='chatBox'>
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Play;
