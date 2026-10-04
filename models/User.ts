import mongoose, { Schema, type Document, Types } from "mongoose"
import type { User as UserType } from "@/lib/types"

export interface UserDocument extends Omit<UserType, "_id">, Document {
  _id: Types.ObjectId
}

const UserSchema = new Schema<UserDocument>(
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
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    refreshToken: { type: String },
    accountVerified: {
      type: Boolean,
      default: false,
      required: true
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        return ret
      },
    },
  },
)

// Indexes for better query performance
UserSchema.index({ email: 1 })
UserSchema.index({ role: 1 })
UserSchema.index({ createdAt: -1 })

// Prevent duplicate model compilation
const User = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema)

export default User
