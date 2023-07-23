const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  team_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
  this.password = hash;
  return next();
});

module.exports = mongoose.model("User", userSchema);
