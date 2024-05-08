const express = require("express");
const {
    createNotesByProviderId,
    getNotesByUserId,
    getNotesByProviderId
} = require("../controllers/notes");
const authentication = require("../middlewares/authentication")

const notesRouter = express.Router();

notesRouter.post("/newNotes", authentication,createNotesByProviderId);
notesRouter.get("/user/:id", authentication,getNotesByUserId);
notesRouter.get("/provider/:id", authentication,getNotesByProviderId);

module.exports = notesRouter;
