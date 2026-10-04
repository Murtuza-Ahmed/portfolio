import mongoose, { Document, Schema } from "mongoose";

interface IAbout extends Document {
  profileImage: string;
  bio: string;
  interests: string[];
  values: string[];
  createdAt: Date;
  updatedAt: Date;
}

const aboutSchema = new Schema<IAbout>(
  {
    profileImage: {
      type: String,
      required: [true, "Profile image is required"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      minlength: [20, "Bio must be at least 20 characters"],
      maxlength: [2000, "Bio must not exceed 2000 characters"],
    },
    interests: {
      type: [String],
      default: [],
      validate: {
        validator: (v: string[]) => v.length <= 10,
        message: "Interests must not exceed 10 items",
      },
    },
    values: {
      type: [String],
      default: [],
      validate: {
        validator: (v: string[]) => v.length <= 10,
        message: "Values must not exceed 10 items",
      },
    },
  },
  { timestamps: true }
);

const About = mongoose.models.About || mongoose.model<IAbout>("About", aboutSchema);

export default About;
