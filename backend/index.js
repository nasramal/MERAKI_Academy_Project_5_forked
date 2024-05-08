const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/db");
const app = express();

const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/role");
const historyRouter = require("./routes/history")
const insuranceRouter = require("./routes/insurance")
app.use(cors());
app.use(express.json());



app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/history",historyRouter)
app.use("/insurance",insuranceRouter)



// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
