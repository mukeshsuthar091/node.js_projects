let io;

module.exports = {
  // init: (httpServer) => {
  //   io = require("socket.io")(httpServer);
  //   return io;
  // },
  // getIO: () => {
  //   if (!io) {
  //     throw new Error("Socket.io not initialized!");
  //   }
  //   return io;
  // },
  init: (httpServer) => {
    let socketio = require("socket.io");
    io = socketio(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
