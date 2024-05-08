const express = require("express");
const {
    createNotesByProviderId,
    getNotesByUserId
} = require("../controllers/notes");
const authentication = require("../middlewares/authentication")

const notesRouter = express.Router();

notesRouter.post("/newNotes", authentication,createNotesByProviderId);
notesRouter.get("/:id", authentication,getNotesByUserId);


module.exports = notesRouter;
