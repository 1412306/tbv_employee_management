"use strict";
const _ = require("lodash");
const path = require("path");
const DepartmentBussiness = require(path.resolve(
  "./src/api/department/department.business"
));

const create = async (req, res) => {
  try {
    const raw = req.body || {};
    if (!raw.name) {
      return res.status(422).send({
        message: "Required fields are missing!",
      });
    }
    const departmentBusiness = new DepartmentBussiness();
    const department = await departmentBusiness.create(raw);
    return res.status(200).json(department);
  } catch (e) {
    console.log(e);
    return res.status(422).send({
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  list,
  create,
};
