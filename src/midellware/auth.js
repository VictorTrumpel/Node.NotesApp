const withMethod = require("../helpers/withMethod");

const auth = withMethod(async (req, res, next) => {
  const sessionId = req.cookies["sessionId"];

  if (!sessionId) {
    req.user = null;
    return res.redirect("/");
  }

  const session = await req.sessionsCollection.findOne({ sessionId });

  if (session) {
    req.user = await req.usersCollection.findOne({ _id: session.userId });
    req.sessionId = sessionId;
  }

  return next();
});

module.exports.auth = auth;
