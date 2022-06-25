const withMethod = require("../../../helpers/withMethod");
const { ObjectId } = require("mongodb");

const archiveNote = (isArchived) =>
  withMethod(async (req, res) => {
    await req.notesCollection.updateOne({ _id: { $eq: ObjectId(req.note._id) } }, { $set: { isArchived } });

    return res.status(200).json({ message: "success" });
  });

module.exports.archiveNote = archiveNote;
