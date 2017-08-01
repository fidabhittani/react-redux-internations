import mongoose from "mongoose";
const Schema = mongoose.Schema;
import User from "./user";
const Group = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.model("Group", Group);
