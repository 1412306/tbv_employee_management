"use strict";
const path = require("path");
const _ = require("lodash");

const TeamModel = require(path.resolve("./src/api/team/team.model"));

module.exports = class TeamBusiness {
  async create(teamData) {
    try {
      return await TeamModel.create(teamData);
    } catch (e) {
      throw new Error(e);
    }
  }
};
