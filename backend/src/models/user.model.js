import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Name is required`],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, `Email is required`],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, `Password is required`],
      minLengh: 6,
    },
  },
  { timestamps: true, collection: "usersCollection" },
);

const User = mongoose.model("User", userSchema);

export default User;
