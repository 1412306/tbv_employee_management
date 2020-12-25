const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: true
  },
  manager: {
    manager_id: mongoose.Types.ObjectId,
    manager_name: String
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

module.exports = mongoose.model("Department", departmentSchema);
