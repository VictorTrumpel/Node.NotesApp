const withMethod = require("../../../helpers/withMethod");
const pdf = require("html-pdf");

const loadPdf = withMethod(async (req, res) => {
  pdf.create(req.note.html).toStream((err, stream) => {
    stream.pipe(res);
  });
});

module.exports.loadPdf = loadPdf;
