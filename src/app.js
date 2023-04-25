import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import indexRoutes from "./routes/views.router.js";

const app = express();
const PORT = 8080;

// Routes
app.use("/", indexRoutes);

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Static files
app.use(express.static(`${__dirname}/public`));

// Server -- Socket.io
const server = app.listen(PORT, () => {
  // El server se guarda en una variable para pasarse como parametro.
  console.log(`Server running on port ${PORT}`);
});

// Socket.io
const io = new Server(server); // Se pasa como parametro el server de express

// ChatBox Server

const messages = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  // Leer mensajes del evento:
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  });
  // Leer mensajes luego de autenticarse.
  socket.on("auth", (data) => {
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("newUser", data);
  });
});
