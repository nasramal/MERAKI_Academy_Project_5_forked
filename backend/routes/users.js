const express = require("express");

const {registerDoctor,registerPatient,login,getuserinfo ,getProviderBySpecialty,getProviderById,getUserByFirstName} = require("../controllers/users");
const authentication = require("../middlewares/authentication")
const usersRouter = express.Router();

usersRouter.post("/registerDoctor", registerDoctor);
usersRouter.post("/registerPatient", registerPatient);
usersRouter.post("/login",login)
usersRouter.get("/info",authentication,getuserinfo)
usersRouter.get("/searchbyname/",getUserByFirstName)
usersRouter.get("/provBySpec/:id",getProviderBySpecialty)
usersRouter.get("/provById/:id",getProviderById)


module.exports = usersRouter;