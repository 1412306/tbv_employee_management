"use strict";
const _ = require("lodash");
const path = require("path");
const EmployeeBussiness = require(path.resolve(
  "./src/api/employee/employee.business"
));

const list = async (req, res) => {
  try {
    const employeeBusiness = new EmployeeBussiness();
    const query = _.get(req.body, "query", {});
    const meta = _.get(req.body, "meta", {});
    const list = await employeeBusiness.getMany(query, meta, false);
    return res.status(200).json({list});
  } catch (e) {
    console.log(e);
    return res.status(422).send({
      message: "Something went wrong!",
    });
  }
};

const count = async (req, res) => {
  try {
    const employeeBusiness = new EmployeeBussiness();
    const query = _.get(req.body, "query", {});
    const meta = _.get(req.body, "meta", {});
    const count = await employeeBusiness.getMany(query, meta, true);
    return res.status(200).json({count});
  } catch (e) {
    console.log(e);
    return res.status(422).send({
      message: "Something went wrong!",
    });
  }
};

const create = async (req, res) => {
  try {
    const raw = req.body || {};
    if (_.isEmpty(raw.email)) {
      return res.status(422).send({
        message: "Required fields are missing!",
      });
    }
    const employeeBusiness = new EmployeeBussiness();
    const employee = await employeeBusiness.create(raw);
    return res.status(200).json(employee);
  } catch (e) {
    console.log(e);
    return res.status(422).send({
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  list,
  count,
  create,
};
