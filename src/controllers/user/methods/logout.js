const withMethod = require("../../../helpers/withMethod");

const logout = withMethod(async (req, res) => {
  await deleteSession(req.sessionsCollection, req.sessionId);
  res.clearCookie("sessionId").redirect("/");
});

const deleteSession = async (sessionsCollection, sessionId) => {
  await sessionsCollection.deleteOne({ sessionId });
};

module.exports.logout = logout;
