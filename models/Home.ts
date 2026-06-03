import mongoose, { Document, Schema } from "mongoose";

interface IHome extends Document {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  featuredProjectsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const homeSchema = new Schema<IHome>(
  {
    heroImage: {
      type: String,
      required: [true, "Hero image is required"],
    },
    heroTitle: {
      type: String,
      required: [true, "Hero title is required"],
      minlength: [3, "Hero title must be at least 3 characters"],
      maxlength: [100, "Hero title must not exceed 100 characters"],
    },
    heroSubtitle: {
      type: String,
      required: [true, "Hero subtitle is required"],
      minlength: [3, "Hero subtitle must be at least 3 characters"],
      maxlength: [200, "Hero subtitle must not exceed 200 characters"],
    },
    heroDescription: {
      type: String,
      required: [true, "Hero description is required"],
      minlength: [10, "Hero description must be at least 10 characters"],
      maxlength: [500, "Hero description must not exceed 500 characters"],
    },
    ctaButtonText: {
      type: String,
      required: [true, "CTA button text is required"],
      minlength: [2, "CTA button text must be at least 2 characters"],
      maxlength: [50, "CTA button text must not exceed 50 characters"],
    },
    ctaButtonLink: {
      type: String,
      required: [true, "CTA button link is required"],
      minlength: [2, "CTA button link must be at least 2 characters"],
      maxlength: [500, "CTA button link must not exceed 500 characters"],
    },
    featuredProjectsCount: {
      type: Number,
      default: 3,
      min: [1, "Featured projects count must be at least 1"],
      max: [20, "Featured projects count must not exceed 20"],
    },
  },
  { timestamps: true }
);

const Home = mongoose.models.Home || mongoose.model<IHome>("Home", homeSchema);

export default Home;
