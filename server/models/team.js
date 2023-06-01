const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  comp: [
    {
      apiName: String,
      name: String,
      traits: [String],
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
