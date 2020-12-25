const express = require("express");
const router = express.Router();
const path = require("path");
const DepartmentController = require(path.resolve("./src/api/department/department.controller"));

router.post("/create", DepartmentController.create);

module.exports = router;