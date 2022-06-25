const withMethod = require("../helpers/withMethod");
const { clientPromise } = require("../helpers/clientPromise");

const Notes = "notes";
const Users = "users";
const Sessions = "sessions";

const connectToDb = withMethod(async (req, res, next) => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  if (req) {
    req.db = db;
    req.notesCollection = db.collection(Notes);
    req.usersCollection = db.collection(Users);
    req.sessionsCollection = db.collection(Sessions);
  }

  next();
});

module.exports.connectToDb = connectToDb;
