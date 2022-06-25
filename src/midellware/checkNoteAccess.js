const withMethod = require("../helpers/withMethod");
const { ObjectId } = require("mongodb");

const checkNoteAccess = withMethod(async (req, res, next) => {
  const pathParts = req.path.split("/");
  const noteId = pathParts[pathParts.length - 1];

  const note = await req.notesCollection.findOne({ _id: new ObjectId(noteId) });

  if (!note) throw new Error("the note not found!");

  const noteUserId = new ObjectId(note.userId).toString();
  const userId = new ObjectId(req.user._id).toString();

  if (noteUserId !== userId) throw new Error("access error!");

  req.note = note;

  return next();
});

module.exports.checkNoteAccess = checkNoteAccess;
