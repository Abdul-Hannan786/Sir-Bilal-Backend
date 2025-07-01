import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: String,
    country: String,
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
export default User;
