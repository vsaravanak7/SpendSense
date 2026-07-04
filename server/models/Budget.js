import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    month: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    budgetLimit: {
      type: Number,
      required: true,
    },

    currency:{
      type:String,
      default:"INR"
    },

    warningPercentage: {
      type: Number,
      default: 80
    }
  },
  {
    timestamps: true,
  }
);

budgetSchema.index(
  {
    user: 1,
    month: 1,
    year: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Budget", budgetSchema);