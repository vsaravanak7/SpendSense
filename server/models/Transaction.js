import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Medical",
        "Entertainment",
        "Education",
        "Salary",
        "Investment",
        "Other"
      ],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer"],
      default: "UPI",
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
    },

    receiptImage: {
      type: String,
      default: "",
    },

    aiGenerated: {
      type: Boolean,
      default: false,
    },
    
    currency:{
    type:String,
    default:"INR"
    },

    isRecurring:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema);