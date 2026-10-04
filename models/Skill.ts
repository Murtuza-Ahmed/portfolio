import mongoose, { Document, Schema } from "mongoose";

interface ISkill extends Document {
  name: string;
  proficiency: number;
  category: "Frontend" | "Backend" | "Database" | "Tools" | "DevOps" | "Other";
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      minlength: [2, "Skill name must be at least 2 characters"],
      maxlength: [50, "Skill name must not exceed 50 characters"],
      trim: true,
    },
    proficiency: {
      type: Number,
      required: [true, "Proficiency level is required"],
      min: [0, "Proficiency must be at least 0"],
      max: [100, "Proficiency must not exceed 100"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Frontend", "Backend", "Database", "Tools", "DevOps", "Other"],
        message: "Category must be one of: Frontend, Backend, Database, Tools, DevOps, Other",
      },
    },
  },
  { timestamps: true }
);

skillSchema.index({ name: 1 });
skillSchema.index({ category: 1 });

const Skill = mongoose.models.Skill || mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;
