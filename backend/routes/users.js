const express = require("express");

const {register,login,getuserinfo } = require("../controllers/users");
const authentication = require("../middlewares/authentication")
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login",login)
usersRouter.get("/info",authentication,getuserinfo)


module.exports = usersRouter;