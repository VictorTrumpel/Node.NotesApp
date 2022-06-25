const withMethod = require("../../../helpers/withMethod");
const pick = require("lodash.pick");
const bcrypt = require("bcrypt");
const yup = require("yup");
const { createForm } = require("../../../helpers/createForm");

const signupValidate = createForm(
  yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })
);

const signup = withMethod(async (req, res) => {
  const signupPayload = pick(req.body, "username", "password");

  try {
    await signupValidate(signupPayload);
  } catch (e) {
    return res.redirect(`/?singUpError=${e.errors.join(" ")}`);
  }

  const { username, password } = signupPayload;

  const isUserExists = await req.usersCollection.findOne({ username });

  if (isUserExists || !password || !username) {
    const errMessage = "Name is already taken";
    return res.redirect(`/?singUpError=${errMessage}`);
  }

  const hashPassword = await bcrypt.hash(password, 5);

  await req.usersCollection.insertOne({ username, password: hashPassword });
  return res.redirect("/");
});

module.exports.signup = signup;
