import mongoose, { Schema, type Document } from "mongoose"
import type { ContactMessage as ContactMessageType } from "@/lib/types"

export interface ContactMessageDocument extends Omit<ContactMessageType, "_id">, Document {
  _id: string
}

const ContactMessageSchema = new Schema<ContactMessageDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      minlength: [5, "Subject must be at least 5 characters long"],
      maxlength: [100, "Subject cannot exceed 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters long"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
ContactMessageSchema.index({ status: 1, createdAt: -1 })
ContactMessageSchema.index({ email: 1 })
ContactMessageSchema.index({ createdAt: -1 })

// Prevent duplicate model compilation
const ContactMessage =
  mongoose.models.ContactMessage || mongoose.model<ContactMessageDocument>("ContactMessage", ContactMessageSchema)

export default ContactMessage
