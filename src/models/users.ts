import mongoose from "mongoose";

/**
 * The `UserSchema` defines the structure of a user in the database.
 * It includes fields for `username`, `email`, and `authentication` (containing `password`, `salt`, and `sessionToken`).
 * The `email` field is required, unique, and validated using a regex pattern.
 * The `password`, `salt`, and `sessionToken` fields are of type String with `select` set to false.
 * The schema includes timestamps for creation and update.
 * The `UserModel` is created using the `mongoose.model` function with the schema.
 */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email address.",
      },
    },
    authentication: {
      password: {
        type: String,
        required: true,
        select: false,
      },
      salt: {
        type: String,
        select: false,
      },
      sessionToken: {
        type: String,
        select: false,
      },
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);
