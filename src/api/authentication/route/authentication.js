const express = require("express");
const router = express.Router();
const path = require("path");
const AuthenticationController = require(path.resolve("./src/api/authentication/controller/authentication"));

router.post("/login", AuthenticationController.login);

module.exports = router;
