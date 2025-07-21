const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

// Set view engine BEFORE routes
app.set("view engine", "ejs");

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Create HTTP server
const server = http.createServer(app);
const io = socketio(server);

// Routes
app.get("/", function (req, res) {
  res.render("index"); // Looks for views/index.ejs
});

// Socket.IO logic
io.on("connection", function (socket) {
socket.on("send-location",function(data){
    io.emit("receive-location",{id:socket.id,...data});
})
    console.log("Socket connected");
});

// Start server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
