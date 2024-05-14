// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", " POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected`);

//   socket.on("disconnect", () => {
//     console.log("User Disconnected");
//   });

//   socket.on("current_user", (userData) => {
//     console.log(`Received currentUser data from client:`, userData);
//     // Here you can perform any necessary actions with the received user data
//   });
// });

// server.listen(3001, () => {
//   console.log("Server running");
// });