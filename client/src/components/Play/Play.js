import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Play.css";

import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import Board from "../Board/Board";
import Input from "../Input/Input";
const LINE_NUMBER = 15;

const ENDPOINT = "take-omok.herokuapp.com";
// const DEV_ENDPOINT = "localhost:5000";

let socket;
//Todo: socket

const Play = ({ location, history }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [color, setColor] = useState(1); //1 : black,  2 : white
  const [turn, setTurn] = useState(0); //0: Wait 1: black 2: white 3: end
  let [array, setArray] = useState(
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
        history.push("/");
      }

      // Game 종료
      socket.on("broadcast", (msg) => {
        socket.emit("turnChange", 3);
        alert(msg);
      });
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    //돌 정하기
    socket.on("color", ({ color }) => {
      setColor(color);
    });

    //TURN 초기화
    socket.on("turn", (turn) => {
      setTurn(turn);
    });

    //Stone 좌표 얻어오기
    socket.on("stoneID", (id, color) => {
      putStone(color, id);
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
    //자기 순서 아닐 때 return
    if (color !== turn) return;

    const [M, N] = id.split("-");
    if (isValid([M, N]) === true) {
      if (isFive([M, N]) === true) {
        putStone(color, id);
        socket.emit("gameover", color);
        socket.emit("turnChange", turn);
        socket.emit("passStone", id, color);
      } else if (isFive([M, N]) === 33) {
        alert("쌍삼입니다.");
        return;
      } else {
        putStone(color, id);
        turn === 1 ? setTurn(2) : setTurn(1);
        socket.emit("turnChange", turn === 1 ? 2 : 1);
        socket.emit("passStone", id, color);
      }
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
  const putStone = (color, id) => {
    const [M, N] = id.split("-");
    array[M][N] = color;
    const stone = document.getElementById(id);
    stone.style.borderRadius = "50%";
    stone.style.backgroundColor = color === 1 ? "black" : "white";
  };

  // 승리 판단
  const isFive = ([M, N]) => {
    M = Number(M);
    N = Number(N);

    let count = 1;
    let SScount = 0;
    let i = M;
    let j = N;

    // →
    while (count < 6) {
      if (j === 14) break;
      else if (array[i][j + 1] === color) {
        count += 1;
        j += 1;
      } else break;
    }

    // ←
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
    } else if (count === 3) {
      SScount += 1;
    }

    if (SScount >= 2) {
      return 33;
    }

    // ↓
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

    // ↑
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
    } else if (count === 3) {
      SScount += 1;
    }

    if (SScount >= 2) {
      return 33;
    }

    // ↙
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i === 14 || j === 0) break;
      else if (array[i + 1][j - 1] === color) {
        count = count + 1;
        i += 1;
        j -= 1;
      } else break;
    }

    // ↗
    i = M;
    j = N;
    while (count < 6) {
      if (i === 0 || j === 14) break;
      else if (array[i - 1][j + 1] === color) {
        count = count + 1;
        i -= 1;
        j += 1;
      } else break;
    }

    if (count === 5) {
      return true;
    } else if (count === 3) {
      SScount += 1;
    }

    if (SScount >= 2) {
      return 33;
    }

    // ↘
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

    if (count === 5) {
      return true;
    } else if (count === 3) {
      SScount += 1;
    }

    if (SScount >= 2) {
      return 33;
    }

    return count === 5 ? true : false;
  };

  return (
    <div className="container">
      <div className="containerLeft">
        <InfoBar users={users} turn={turn} />
        <div className="boardBox">
          <Board
            array={array}
            passValue={passValue}
            color={color}
            turn={turn}
          />
        </div>
      </div>

      <div className="chatBox">
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
