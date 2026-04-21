import mongoose from "mongoose";

const schema = new mongoose.Schema({
  // FIX: added "DEAL_CREATED" to enum so deal creation activities save correctly
  type: {
    type: String,
    enum: ["CALL", "EMAIL", "MEETING", "DEAL_CREATED"]
  },
  mode: { type: String, enum: ["AUTO", "MANUAL"] },
  description: String,
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  deal: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" }
}, { timestamps: true });

export default mongoose.model("Activity", schema);
