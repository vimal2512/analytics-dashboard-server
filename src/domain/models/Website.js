import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema({

  domain: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true,
    index: true,
  },

  trackingId: {
    type: String,
    required: true,
    unique: true
  },

  timezone: {
    type: String,
    default: "UTC"
  },

  retentionDays: {
    type: Number,
    default: 30
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export default mongoose.model("Website", websiteSchema);