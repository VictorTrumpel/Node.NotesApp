const { Router } = require("express");
const { userRouter } = require("./userRouter");
const { resourcesRouter } = require("./resourcesRouter");
const { noteRouter } = require("./noteRouter");
const { auth } = require("../midellware/auth");

const router = Router();

router.get("/", async (req, res) => {
  res.render("index", {
    user: req.user,
    authError: req.query.authError,
    singUpError: req.query.singUpError,
  });
});

router.use(userRouter);
router.use(auth);
router.use(resourcesRouter);
router.use(noteRouter);

router.get("/dashboard", async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }

  res.render("dashboard", {
    username: req.user.username,
  });
});

module.exports = router;
