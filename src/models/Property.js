import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    default: null
  },

  // FIX: renamed listedBy → createdBy everywhere for consistency.
  // dealController and propertyController were using both names — unified to createdBy.
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true
  },

  status: {
    type: String,
    enum: ["AVAILABLE", "SOLD", "RESERVED"],
    default: "AVAILABLE"
  }

}, { timestamps: true });

export default mongoose.model("Property", schema);
