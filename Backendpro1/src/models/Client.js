import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },

  phone: {
    type: String,
    required: true,
    unique: true,     // 🔥 prevents duplicates
    index: true
  },

  type: {
    type: String,
    enum: ["BUYER", "SELLER"],
    required: true
  },

  preferredLocation: String,

  status: {
    type: String,
    enum: ["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "LOST"],
    default: "NEW"
  },

  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent"
  },
  price:{
    type: Number
  }
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);