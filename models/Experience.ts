import mongoose, { Document, Schema } from "mongoose";

interface IExperience extends Document {
  jobTitle: string;
  company: string;
  startDate: Date;
  endDate?: Date | null;
  description: string;
  technologies: string[];
  companyLogo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      minlength: [3, "Job title must be at least 3 characters"],
      maxlength: [100, "Job title must not exceed 100 characters"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      minlength: [2, "Company must be at least 2 characters"],
      maxlength: [100, "Company must not exceed 100 characters"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description must not exceed 1000 characters"],
    },
    technologies: {
      type: [String],
      default: [],
      validate: {
        validator: (v: string[]) => v.length <= 20,
        message: "Technologies must not exceed 20 items",
      },
    },
    companyLogo: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: true }
);

experienceSchema.index({ company: 1 });
experienceSchema.index({ startDate: -1 });

const Experience =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", experienceSchema);

export default Experience;
