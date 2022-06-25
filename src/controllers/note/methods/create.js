const withMethod = require("../../../helpers/withMethod");
const pick = require("lodash.pick");
const yup = require("yup");
const { createForm } = require("../../../helpers/createForm");

const noteValidate = createForm(
  yup.object().shape({
    title: yup.string().required(),
    text: yup.string().required(),
    html: yup.string(),
  })
);

const create = withMethod(async (req, res) => {
  const notePayload = pick(req.body, "title", "text", "html");

  try {
    await noteValidate(notePayload);
  } catch (e) {
    return res.status(400).json(e?.message);
  }

  const newNote = await req.notesCollection.insertOne({
    ...notePayload,
    created: new Date(),
    userId: req.user._id,
    isArchived: false,
  });

  return res.status(200).json({ _id: newNote.insertedId });
});

module.exports.create = create;
