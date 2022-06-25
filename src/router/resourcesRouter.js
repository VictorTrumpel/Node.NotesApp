const { Router } = require("express");
const path = require("path");

const resourcesRouter = Router();

resourcesRouter.get("/bundle.css", async (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "public", "bundle.css"));
});

resourcesRouter.get("/bundle.js", async (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "public", "bundle.js"));
});

module.exports.resourcesRouter = resourcesRouter;
