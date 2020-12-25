const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  team_name: {
    type: String,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId }],
  department: {
    id: { type: mongoose.Schema.Types.ObjectId },
    department_name: { type: String },
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

module.exports = mongoose.model("Team", teamSchema);
