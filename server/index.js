const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./Users");
const router = require("./Router");

const TURN_DEFAULT = 1;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "https://take-omok.netlify.app",
    // origin : "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);
    console.log(getUsersInRoom(room));
    if (getUsersInRoom(room).length === 2) {
      // 돌 지정
      socket.emit("color", {
        color: user.id === getUsersInRoom(user.room)[0].id ? 1 : 2,
      });

      // 지정한 돌 -> 클라이언트 전달
      socket.to(user.room).emit("turn", TURN_DEFAULT);
    }

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    // 차례 넘기기
    socket.on("turnChange", (turn) => {
      socket.to(user.room).emit("turn", turn);
    });

    //돌 위치 정보 건내기
    socket.on("passStone", (id, color) => {
      socket.to(user.room).emit("stoneID", id, color);
    });

    // 승리 처리
    socket.on("gameover", (color) => {
      io.to(room).emit(
        "broadcast",
        `${color === 1 ? "흑돌" : "백돌"}이 승리하였습니다.`
      );
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
