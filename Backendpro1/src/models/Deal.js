import mongoose from "mongoose";

const schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  status: {
    type: String,
    enum: ["NEGOTIATION", "AGREEMENT", "CLOSED", "LOST"],
    default: "NEGOTIATION"
  }
}, { timestamps: true });

export default mongoose.model("Deal", schema);