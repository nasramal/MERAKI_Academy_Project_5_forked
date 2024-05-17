const express = require("express");
const {
    createNotesByProviderId,
    getNotesByUserId,
    getNotesByProviderId,
    deleteNotesByProviderId,getNotesByProvider,upDateNotesByProviderId
} = require("../controllers/notes");
const authentication = require("../middlewares/authentication")

const notesRouter = express.Router();

notesRouter.post("/newNotes", authentication,createNotesByProviderId);
notesRouter.get("/user/:id", authentication,getNotesByUserId);
notesRouter.get("/provider/:id", authentication,getNotesByProviderId);
notesRouter.get("/provider", authentication,getNotesByProvider);
notesRouter.put("/providers/:id", authentication,upDateNotesByProviderId);
notesRouter.put("/provider/:id", authentication,deleteNotesByProviderId);
module.exports = notesRouter;
