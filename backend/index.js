const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/db");
const app = express();

const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/role");

const historyRouter = require("./routes/history");
const insuranceRouter = require("./routes/insurance");
const reviewRouter = require("./routes/review");
const docInfoRouter = require("./routes/docInfo");
const specialtyRouter =require("./routes/specialty");
const notesRouter =require("./routes/notes");
const scheduleRouter =require("./routes/schedule");


app.use(cors());
app.use(express.json());



app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/review",reviewRouter)
app.use("/history",historyRouter);
app.use("/insurance",insuranceRouter);
app.use("/docInfo",docInfoRouter);
app.use("/specialty",specialtyRouter);
app.use("/notes",notesRouter);
app.use("/schedule",scheduleRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
