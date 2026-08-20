import mongoose from "mongoose";

const smartListSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["SHOPPING_LIST", "FAVORITES"],
      required: true,
    },

    items: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const SmartList = mongoose.model("SmartList", smartListSchema);

export default SmartList;