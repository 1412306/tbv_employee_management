"use strict";
const path = require("path");
const _ = require("lodash");
const MAX_RECORDS = 1500;

const EmployeeModel = require(path.resolve(
  "./src/api/employee/employee.model"
));

module.exports = class EmployeeBusiness {
  async create(employeeData) {
    try {
      return await EmployeeModel.create(employeeData);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async getMany(query, meta, isCount = false) {
    try {
      let queryData = {};
      if (query._id !== undefined) {
        if (Array.isArray(query._id)) {
          queryData["_id"] = {
            $in: query._id,
          };
        } else {
          queryData["_id"] = query._id;
        }
      }
      if (query.position_code !== undefined) {
        if (Array.isArray(query.position_code)) {
          queryData["position_code"] = {
            $in: query.position_code,
          };
        } else {
          queryData["position_code"] = +query.position_code;
        }
      }
      if (query.department_id !== undefined) {
        if (Array.isArray(query.department_id)) {
          queryData["department._id"] = {
            $in: query.department_id,
          };
        } else {
          queryData["department._id"] = +query.department_id;
        }
      }

      let page = meta.page || 1;
      let limit =
        meta.limit && meta.limit <= MAX_RECORDS ?  meta.limit : 20;

      if(isCount){
        const count = await EmployeeModel.countDocuments(queryData);
        console.log(count)
        return count;
      }
      const list = await EmployeeModel.find(
        {
          ...queryData,
        },
        null,
        { skip: (page - 1) * limit, limit: limit, sort: { position_code: -1 } }
      ).lean();

      return list
    } catch (e) {
      throw new Error(e);
    }
  }
};
