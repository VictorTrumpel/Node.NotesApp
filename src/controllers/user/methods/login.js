const withMethod = require("../../../helpers/withMethod");
const { nanoid } = require("nanoid");
const pick = require("lodash.pick");
const bcrypt = require("bcrypt");
const yup = require("yup");
const { createForm } = require("../../../helpers/createForm");

const loginValidate = createForm(
  yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })
);

const login = withMethod(async (req, res) => {
  const loginPayload = pick(req.body, "username", "password");

  try {
    await loginValidate(loginPayload);
  } catch (e) {
    return res.redirect(`/?authError=${e.errors.join(" ")}`);
  }

  const { username, password } = loginPayload;

  const user = await req.usersCollection.findOne({ username });

  if (!user) return res.redirect("/?authError=Wrong username or password");

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) return res.redirect("/?authError=Wrong username or password");

  const sessionId = await createSession(req.sessionsCollection, user._id);
  return res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/dashboard");
});

async function createSession(sessionsCollection, userId) {
  const session = await sessionsCollection.findOne({ userId });
  const sessionId = session ? session.sessionId : nanoid();

  if (!session) {
    await sessionsCollection.insertOne({ sessionId, userId });
  }

  return sessionId;
}

module.exports.login = login;
