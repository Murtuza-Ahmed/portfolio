import mongoose, { Document, Schema } from "mongoose";

interface ICertification extends Document {
  name: string;
  issuer: string;
  date: Date;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const certificationSchema = new Schema<ICertification>(
  {
    name: {
      type: String,
      required: [true, "Certification name is required"],
      minlength: [3, "Certification name must be at least 3 characters"],
      maxlength: [200, "Certification name must not exceed 200 characters"],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, "Issuer is required"],
      minlength: [2, "Issuer must be at least 2 characters"],
      maxlength: [100, "Issuer must not exceed 100 characters"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    url: {
      type: String,
      default: undefined,
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: "URL must be a valid HTTP or HTTPS URL",
      },
    },
  },
  { timestamps: true }
);

certificationSchema.index({ issuer: 1 });
certificationSchema.index({ date: -1 });

const Certification =
  mongoose.models.Certification || mongoose.model<ICertification>("Certification", certificationSchema);

export default Certification;
