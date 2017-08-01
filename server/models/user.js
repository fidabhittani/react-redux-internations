import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Group from "./group";
const User = new Schema({
  username: { type: String, required: true, unique: true },
  avatar: { type: String, required: false },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }]
});

export default mongoose.model("User", User);
