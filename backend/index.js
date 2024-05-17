
const {Server} = require ('socket.io')
const http = require("http");
const io = new Server(8080,{cors:{origin : "*"}})
const auth = require ("./middlewares/auth")
const notificationmw= require ("./middlewares/notificationmw")


const users={}
const user = io.of("/user")
// const doctor = io.of("/doctor")
user.on ("connection",(socket)=>{
  console.log("from patient")
})
// doctor.on ("connection",(socket)=>{
//   console.log("from patient")
// })

io.use(auth)



io.on("connection", (socket) => {
 socket.use (notificationmw) 
const user_id = socket.handshake.headers.user_id
users[user_id] ={socket_id:socket.id,user_id}
console.log(users);


notification(socket,io)
socket.on("error",(error)=>{
  socket.emit("error",{error:error.notification})
})

socket.on("disconnect",()=>{

  for (const key in users) {
    if (users[key].socket_id===socket.id){
      delete users[key]
    }
  }
  console.log(users);
})



})









  



const express = require("express");
const cors = require("cors");


require("dotenv").config();
const db = require("./models/db");
const app = express();

const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/role");
const appointmentRouter =require("./routes/appointment")
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
app.use("/schedule",scheduleRouter);
app.use("/appointment",appointmentRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
