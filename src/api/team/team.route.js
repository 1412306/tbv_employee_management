const express = require("express");
const router = express.Router();
const path = require("path");
const TeamController = require(path.resolve("./src/api/team/team.controller"));

router.post("/create", TeamController.create);

module.exports = router;