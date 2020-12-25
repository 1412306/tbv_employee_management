"use strict";
const _ = require("lodash");
const path = require("path");

const TeamBussiness = require(path.resolve("./src/api/team/team.business"));

const create = async (req, res) => {
  try {
    const teamBusiness = new TeamBussiness();
    const team = await teamBusiness.create(req.body);
    return res.status(200).json(team);
  } catch (e) {
    console.log(e);
    return res.status(422).send({
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  create
};
