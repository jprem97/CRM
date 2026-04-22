import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: String,

  type: {
    type: String,
    enum: ["NEW_CLIENT", "DEAL", "FOLLOW_UP"],
    default: "NEW_CLIENT"
  },

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },

  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    default: null
  },
  

  // FIX: was using `read` field in controller but schema had no such field.
  // Changed to `status` with PENDING/COMPLETED — consistent with the enum already here.
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
    default: "PENDING"
  }

}, { timestamps: true });

const agentSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  location: {
    type: String,
    required: true
  },

  

  currentLoad: {
    type: Number,
    default: 0
  },

  performanceScore: {
    type: Number,
    default: 0
  },

  report: {
    totalDeals: { type: Number, default: 0 },
    closedDeals: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  },

  notifications: [notificationSchema]

}, { timestamps: true });

export default mongoose.model("Agent", agentSchema);
