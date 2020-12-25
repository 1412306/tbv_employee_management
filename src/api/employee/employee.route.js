const express = require("express");
const router = express.Router();
const path = require("path");
const EmployeeController = require(path.resolve("./src/api/employee/employee.controller"));

router.post("/create", EmployeeController.create);
router.post("/list", EmployeeController.list);
router.post("/count", EmployeeController.count);

module.exports = router;