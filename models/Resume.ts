import mongoose, { Document, Schema } from "mongoose";

interface IResume extends Document {
  fullName: string;
  title: string;
  summary: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  downloadUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name must not exceed 100 characters"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [100, "Title must not exceed 100 characters"],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      minlength: [10, "Summary must be at least 10 characters"],
      maxlength: [2000, "Summary must not exceed 2000 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    downloadUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Resume = mongoose.models.Resume || mongoose.model<IResume>("Resume", resumeSchema);

export default Resume;
