const { Server } = require("socket.io");
const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })
    io.on("connection", (socket) => {

        socket.on("joinChat", ({ userId, targetUserId, userFirstName }) => {
            const roomId = [userId, targetUserId].sort().join("_");
            socket.join(roomId)
            console.log(userFirstName + " joinedRoom " + roomId);
        })

        socket.on("sendMessage", ({ userFirstName, userId, targetUserId, text }) => {
            const roomId = [userId, targetUserId].sort().join("_");
            io.to(roomId).emit("messageRecieved",{userFirstName,text});
        })
        socket.on("disconnect", () => { })
    })
    return io;
}

module.exports = initializeSocket;