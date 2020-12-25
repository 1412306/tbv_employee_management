const mongoose = require("mongoose");
const path = require("path");
const PositionConstant =
  require(path.resolve("./src/api/employee/employee.constant")).position || {};
const employeeSchema = new mongoose.Schema({
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  phone: {
    type: String,
  },
  teams: [
    {
      _id: mongoose.Schema.Types.ObjectId ,
      team_name: String,
    },
  ],
  department: {
    _id: { type: mongoose.Schema.Types.ObjectId },
    department_name: String,
  },
  position: {
    type: String,
    default: "Member",
  },
  position_code: {
    type: Number,
    default: PositionConstant.MEMBER,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
