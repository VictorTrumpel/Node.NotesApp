const PDFDocument = require("pdfkit");

const buildPdf = (dataCallback, endCallback) => {
  const doc = new PDFDocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.fontSize(25).text("<head></head><body><p>Заметка 8</p></body>");
  doc.end();
};

module.exports = buildPdf;
