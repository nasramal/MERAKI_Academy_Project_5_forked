const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const app = express();

const authMiddleware = require("./middlewares/auth");
const notificationMiddleware = require("./middlewares/notificationmw");
const notificationController = require("./controllers/notification");

const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/role");
const appointmentRouter = require("./routes/appointment");
const historyRouter = require("./routes/history");
const insuranceRouter = require("./routes/insurance");
const reviewRouter = require("./routes/review");
const docInfoRouter = require("./routes/docInfo");
const specialtyRouter = require("./routes/specialty");
const notesRouter = require("./routes/notes");
const scheduleRouter = require("./routes/schedule");

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.IO instance attached to the HTTP server
const io = new Server(server, {
  path: '/socket.io',
  cors: {
    origin: '*',
  },
});

// Middleware setup
io.use(authMiddleware);
io.use(notificationMiddleware);

// Handle socket connections
io.on("connection", (socket) => {
  console.log("New connection");

  // Handle notification events
  notificationController(socket, io);

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Express middleware
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/review", reviewRouter);
app.use("/history", historyRouter);
app.use("/insurance", insuranceRouter);
app.use("/docInfo", docInfoRouter);
app.use("/specialty", specialtyRouter);
app.use("/notes", notesRouter);
app.use("/schedule", scheduleRouter);
app.use("/appointment", appointmentRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
