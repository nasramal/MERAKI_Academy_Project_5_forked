const express = require("express");
const {
    createnotesByProviderId
} = require("../controllers/notes");
const authentication = require("../middlewares/authentication")

const notesRouter = express.Router();

docInfoRouter.post("/newNotes", authentication,createnotesByProviderId);


module.exports = docInfoRouter;