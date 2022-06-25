const { create } = require("./methods/create");
const { getList } = require("./methods/getList");
const { getNote } = require("./methods/getNote");
const { edit } = require("./methods/edit");
const { archiveNote } = require("./methods/archiveNote");
const { deleteNote } = require("./methods/deleteNote");
const { loadPdf } = require("./methods/loadPdf");

module.exports = { create, getList, getNote, edit, archiveNote, deleteNote, loadPdf };
