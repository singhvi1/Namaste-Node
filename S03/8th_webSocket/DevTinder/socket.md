# Step1

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

io.on("connection", (socket) => {
  // ...
});
httpServer.listen(3000);

    const http=require("http");
    const httpServer=http.createServer(app)
    initializeSocket(httpServer)
    httpServer.listen(process.env.PORT, () => {..});

const {Server} = require("socket.io");
const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "<http://localhost:5173>",
            credentials: true
        }
    })
    io.on("connection", (socket) => {
        socket.on("joinChat", () => { })
        socket.on("sendMessage", () => { })
        socket.on("disconnect", () => { })
    })
    return io;
}

module.exports = initializeSocket;

or

const { Server } = require("socket.io");
const io = new Server(server, { ... });

1.http.createServer(app)
2.new Server(server, {...})
3.io.on("connection")
