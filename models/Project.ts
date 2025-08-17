import mongoose, { Schema, type Document } from "mongoose"
import type { Project as ProjectType } from "@/lib/types"

export interface ProjectDocument extends Omit<ProjectType, "_id">, Document {
  _id: string
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [2000, "Long description cannot exceed 2000 characters"],
    },
    image: {
      type: String,
      required: [true, "Project image is required"],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, "At least one technology is required"],
      validate: {
        validator: (technologies: string[]) => technologies.length > 0 && technologies.length <= 20,
        message: "Technologies must contain 1-20 items",
      },
    },
    githubUrl: {
      type: String,
      trim: true,
      match: [/^https:\/\/github\.com\/.*/, "Please enter a valid GitHub URL"],
    },
    liveUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.*/, "Please enter a valid URL"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
ProjectSchema.index({ featured: -1, createdAt: -1 })
ProjectSchema.index({ status: 1 })
ProjectSchema.index({ technologies: 1 })
ProjectSchema.index({ title: "text", description: "text" }) // Text search index

// Prevent duplicate model compilation
const Project = mongoose.models.Project || mongoose.model<ProjectDocument>("Project", ProjectSchema)

export default Project
