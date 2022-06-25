const withMethod = require("../../../helpers/withMethod");
const createPaginator = require("../../../helpers/paginate");
const pick = require("lodash.pick");
// eslint-disable-next-line node/no-unpublished-require
const { subMonths } = require("date-fns");

const AgeValues = {
  "1month": 1,
  "3months": 3,
  alltime: "alltime",
  archive: "archive",
};

const paginate = createPaginator(20);

const getNotesByQuery = async (req, query, page) => {
  const notes = await req.notesCollection.find(query).toArray();
  const { items: data, hasMore } = paginate(notes, page);
  return { data, hasMore };
};

const buildNoteQuery = (req, age) => {
  const queryNotes = { userId: req.user._id, isArchived: false };

  if (age === AgeValues.archive) {
    return { ...queryNotes, isArchived: true };
  }

  if (age === AgeValues.alltime) {
    return queryNotes;
  }

  const searchDate = subMonths(new Date(), AgeValues[age]);
  return { ...queryNotes, created: { $gte: searchDate } };
};

const getList = withMethod(async (req, res) => {
  const listPayload = pick(req.query, "age", "page", "search");

  const { age, page } = listPayload;

  const listQuery = buildNoteQuery(req, age);

  const listInfo = await getNotesByQuery(req, listQuery, page);

  return res.status(200).json(listInfo);
});

module.exports.getList = getList;
