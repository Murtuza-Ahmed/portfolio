import mongoose, { Schema, type Document } from "mongoose"
import type { Settings as SettingsType } from "@/lib/types"

export interface SettingsDocument extends Omit<SettingsType, "_id">, Document {
  _id: mongoose.Types.ObjectId
}

const SettingsSchema = new Schema<SettingsDocument>(
  {
    siteName: {
      type: String,
      default: "My Portfolio",
      trim: true,
      minlength: [3, "Site name must be at least 3 characters"],
      maxlength: [100, "Site name cannot exceed 100 characters"],
    },
    siteDescription: {
      type: String,
      default: "Welcome to my portfolio",
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    socialLinks: {
      type: {
        github: {
          type: String,
          trim: true,
          default: "",
        },
        linkedin: {
          type: String,
          trim: true,
          default: "",
        },
        twitter: {
          type: String,
          trim: true,
          default: "",
        },
      },
      default: {
        github: "",
        linkedin: "",
        twitter: "",
      },
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
      default: "",
    },
    contactSuccessMessage: {
      type: String,
      default: "Thank you for your message! I'll get back to you soon.",
      trim: true,
      maxlength: [500, "Success message cannot exceed 500 characters"],
    },
    theme: {
      type: String,
      enum: ["light", "dark", "auto"],
      default: "auto",
    },
    accentColor: {
      type: String,
      trim: true,
      default: "#3b82f6",
      match: [/^#[0-9A-F]{6}$/i, "Please enter a valid hex color"],
    },
    featuredProjectsCount: {
      type: Number,
      default: 3,
      min: [1, "Featured projects count must be at least 1"],
      max: [20, "Featured projects count cannot exceed 20"],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
SettingsSchema.index({ createdAt: -1 })

// Prevent duplicate model compilation
const Settings = mongoose.models.Settings || mongoose.model<SettingsDocument>("Settings", SettingsSchema)

export default Settings
