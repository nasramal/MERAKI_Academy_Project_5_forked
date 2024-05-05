const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/db")
const app = express();

 register
const usersRouter = require("./routes/users");



const rolesRouter = require("./routes/role");
 main


app.use(cors());
app.use(express.json());



 register
app.use("/users", usersRouter);

app.use("/roles", rolesRouter);
 main


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});