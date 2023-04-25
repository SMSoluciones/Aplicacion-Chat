import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();
const PORT = 8080;

// Routes
app.use("/api", indexRoutes);

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

// Chat WebSocket
