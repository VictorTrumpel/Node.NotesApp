const withMethod = require("../../../helpers/withMethod");
const pick = require("lodash.pick");
const yup = require("yup");
const { createForm } = require("../../../helpers/createForm");
const { ObjectId } = require("mongodb");

const noteValidate = createForm(
  yup.object().shape({
    title: yup.string().required(),
    text: yup.string().required(),
    html: yup.string(),
  })
);

const edit = withMethod(async (req, res) => {
  const notePayload = pick(req.body, "title", "text", "html");

  try {
    await noteValidate(notePayload);
  } catch (e) {
    return res.status(400).json(e?.message);
  }

  await req.notesCollection.updateOne({ _id: { $eq: ObjectId(req.note._id) } }, { $set: { ...notePayload } });

  return res.status(200).json({ message: "success" });
});

module.exports.edit = edit;
