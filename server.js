const express = require("express");
const app = express();
const { Server } = require("socket.io");

const http = require("http");
const ACTIONS = require("./src/Actions");

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomID) {
  return Array.from(io.sockets.adapter.rooms.get(roomID) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomID, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomID);

    const clients = getAllConnectedClients(roomID);
    console.log(clients);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
