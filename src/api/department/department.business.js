"use strict";
const path = require("path");
const _ = require("lodash");

const DepartmentModel = require(path.resolve("./src/api/department/department.model"));

module.exports = class DepartmentBusiness {
  async create(departmentData) {
    try {
      return await DepartmentModel.create(departmentData);
    } catch (e) {
      throw new Error(e);
    }
  }
};
