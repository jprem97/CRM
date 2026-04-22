import mongoose from "mongoose";

const schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },   // The Buyer
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  
  // The agent who brought the buyer (Initiator)
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },     
  
  // NEW: The agent who listed the property
  sellerAgent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true }, 

  status: {
    type: String,
    enum: ["NEGOTIATION", "AGREEMENT", "CLOSED", "LOST"],
    default: "NEGOTIATION"
  }
}, { timestamps: true });

export default mongoose.model("Deal", schema);