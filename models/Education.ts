import mongoose, { Document, Schema } from "mongoose";

interface IEducation extends Document {
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  achievements: string[];
  createdAt: Date;
  updatedAt: Date;
}

const educationSchema = new Schema<IEducation>(
  {
    school: {
      type: String,
      required: [true, "School name is required"],
      minlength: [2, "School name must be at least 2 characters"],
      maxlength: [200, "School name must not exceed 200 characters"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      minlength: [2, "Degree must be at least 2 characters"],
      maxlength: [100, "Degree must not exceed 100 characters"],
      trim: true,
    },
    field: {
      type: String,
      required: [true, "Field of study is required"],
      minlength: [2, "Field must be at least 2 characters"],
      maxlength: [100, "Field must not exceed 100 characters"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      default: undefined,
    },
    achievements: {
      type: [String],
      default: [],
      validate: {
        validator: (v: string[]) => v.length <= 10,
        message: "Achievements must not exceed 10 items",
      },
    },
  },
  { timestamps: true }
);

educationSchema.index({ school: 1 });
educationSchema.index({ startDate: -1 });

const Education =
  mongoose.models.Education || mongoose.model<IEducation>("Education", educationSchema);

export default Education;
