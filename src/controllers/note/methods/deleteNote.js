const withMethod = require("../../../helpers/withMethod");
const { ObjectId } = require("mongodb");

const deleteNote = withMethod(async (req, res) => {
  await req.notesCollection.deleteOne({ _id: ObjectId(req.note._id) });

  return res.status(200).json({ message: "success" });
});

module.exports.deleteNote = deleteNote;
