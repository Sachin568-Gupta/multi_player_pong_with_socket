function listen(io) {
    let readyPlayeryCount = 0;
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("ready", () => {
      console.log("player ready", socket.id);

      readyPlayeryCount++;

      if (readyPlayeryCount % 2 === 0) {
        io.emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });
    socket.on("disconnect", (reason) => {
      console.log(`${socket.id} disconnect because of ${reason}`);
    });
  });
}

module.exports ={
    listen
}