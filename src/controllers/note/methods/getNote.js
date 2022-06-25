const withMethod = require("../../../helpers/withMethod");

const getNote = withMethod(async (req, res) => {
  return res.status(200).json(req.note);
});

module.exports.getNote = getNote;
