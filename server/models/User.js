import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    googleId: {
      type: String,
      default: null,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    profilePicture: {
      type: String,
      default: "",
    },

    isEmailVerified: {
    type: Boolean,
    default: false
    },
    
    lastLogin: {
    type: Date
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);