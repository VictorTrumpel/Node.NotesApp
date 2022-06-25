const { Router } = require("express");
const { checkNoteAccess } = require("../midellware/checkNoteAccess");
const noteController = require("../controllers/note/noteController");

const noteRouter = Router();

noteRouter.get("/note/list", noteController.getList);
noteRouter.get("/note/:id", checkNoteAccess, noteController.getNote);
noteRouter.post("/note/create", noteController.create);
noteRouter.post("/note/:id", checkNoteAccess, noteController.edit);
noteRouter.post("/note/archive/:id", checkNoteAccess, noteController.archiveNote(true));
noteRouter.post("/note/unarchive/:id", checkNoteAccess, noteController.archiveNote(false));
noteRouter.post("/note/delete/:id", checkNoteAccess, noteController.deleteNote);
noteRouter.get("/note/pdf/:id", checkNoteAccess, noteController.loadPdf);

module.exports.noteRouter = noteRouter;
