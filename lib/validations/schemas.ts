import * as yup from "yup"

// User validation schemas
export const loginSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
})

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/(?=.*\d)/, "Password must contain at least one number")
    .matches(/(?=.*[@$!%*?&])/, "Password must contain at least one special character")
    .required("Password is required"),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password")], "Passwords must match")
  //   .required("Please confirm your password"),
})

export const userUpdateSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  role: yup.string().oneOf(["admin", "user"], "Invalid role").required("Role is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/(?=.*\d)/, "Password must contain at least one number")
    .matches(/(?=.*[@$!%*?&])/, "Password must contain at least one special character")
    .optional(),
})

// Schema for admins creating users (password required, no weak defaults)
export const adminCreateUserSchema = registerSchema.shape({
  role: yup.string().oneOf(["admin", "user"], "Invalid role").required("Role is required"),
})

// Project validation schemas
export const projectSchema = yup.object({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required"),
  longDescription: yup.string().max(2000, "Long description cannot exceed 2000 characters").optional(),
  image: yup.string().url("Invalid image URL").required("Image is required"),
  technologies: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one technology is required")
    .max(20, "Cannot exceed 20 technologies")
    .required("Technologies are required"),
  githubUrl: yup.string().url("Invalid GitHub URL").optional(),
  liveUrl: yup.string().url("Invalid live URL").optional(),
  featured: yup.boolean().default(false),
  status: yup.string().oneOf(["active", "completed", "archived"], "Invalid status").required("Status is required"),
})

// Contact message validation schema
export const contactSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  subject: yup
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject cannot exceed 100 characters")
    .required("Subject is required"),
  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters")
    .required("Message is required"),
})

// Query parameter validation schemas
export const paginationSchema = yup.object({
  page: yup.number().min(1, "Page must be at least 1").default(1),
  limit: yup.number().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100").default(10),
  sortBy: yup.string().optional(),
  sortOrder: yup.string().oneOf(["asc", "desc"], "Sort order must be asc or desc").default("desc"),
})

export const filterSchema = yup.object({
  search: yup.string().optional(),
  status: yup.string().optional(),
  role: yup.string().oneOf(["admin", "user"], "Invalid role").optional(),
  featured: yup.boolean().optional(),
  technologies: yup.array().of(yup.string().required()).optional(),
  dateFrom: yup.date().optional(),
  dateTo: yup.date().optional(),
})

// Helper: treat empty strings as undefined so optional email/url fields
// accept "" (which the Settings/About/Home models store as defaults)
const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value)

// Skill validation schema (matches models/Skill.ts)
export const skillSchema = yup.object({
  name: yup
    .string()
    .min(2, "Skill name must be at least 2 characters")
    .max(50, "Skill name cannot exceed 50 characters")
    .required("Skill name is required"),
  proficiency: yup
    .number()
    .min(0, "Proficiency must be at least 0")
    .max(100, "Proficiency must not exceed 100")
    .required("Proficiency level is required"),
  category: yup
    .string()
    .oneOf(["Frontend", "Backend", "Database", "Tools", "DevOps", "Other"], "Invalid category")
    .required("Category is required"),
  skillType: yup
    .string()
    .oneOf(["technical", "engineering"], "Invalid skill type")
    .default("technical"),
})

// Education validation schema (matches models/Education.ts)
export const educationSchema = yup.object({
  school: yup
    .string()
    .min(2, "School name must be at least 2 characters")
    .max(200, "School name cannot exceed 200 characters")
    .required("School name is required"),
  degree: yup
    .string()
    .min(2, "Degree must be at least 2 characters")
    .max(100, "Degree cannot exceed 100 characters")
    .required("Degree is required"),
  field: yup
    .string()
    .min(2, "Field must be at least 2 characters")
    .max(100, "Field cannot exceed 100 characters")
    .required("Field of study is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().nullable().optional(),
  achievements: yup.array().of(yup.string().required()).max(10, "Achievements must not exceed 10 items").optional(),
})

// Experience validation schema (matches models/Experience.ts)
export const experienceSchema = yup.object({
  jobTitle: yup
    .string()
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title cannot exceed 100 characters")
    .required("Job title is required"),
  company: yup
    .string()
    .min(2, "Company must be at least 2 characters")
    .max(100, "Company cannot exceed 100 characters")
    .required("Company is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().nullable().optional(),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters")
    .required("Description is required"),
  technologies: yup.array().of(yup.string().required()).max(20, "Technologies must not exceed 20 items").optional(),
  companyLogo: yup.string().transform(emptyToUndefined).url("Invalid logo URL").optional(),
})

// Certification validation schema (matches models/Certification.ts)
export const certificationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Certification name must be at least 3 characters")
    .max(200, "Certification name cannot exceed 200 characters")
    .required("Certification name is required"),
  issuer: yup
    .string()
    .min(2, "Issuer must be at least 2 characters")
    .max(100, "Issuer cannot exceed 100 characters")
    .required("Issuer is required"),
  date: yup.date().required("Date is required"),
  url: yup
    .string()
    .transform(emptyToUndefined)
    .test("is-url", "URL must be a valid HTTP or HTTPS URL", (value) => {
      if (!value) return true
      return /^https?:\/\/.+/.test(value)
    })
    .optional(),
})

// About validation schema (matches models/About.ts)
export const aboutSchema = yup.object({
  profileImage: yup.string().optional().default(""),
  bio: yup
    .string()
    .min(20, "Bio must be at least 20 characters")
    .max(2000, "Bio must not exceed 2000 characters")
    .required("Bio is required"),
  interests: yup.array().of(yup.string().required()).max(10, "Interests must not exceed 10 items").optional(),
  values: yup.array().of(yup.string().required()).max(10, "Values must not exceed 10 items").optional(),
})

// Home validation schema (matches models/Home.ts)
export const homeSchema = yup.object({
  heroImage: yup.string().optional().default(""),
  heroTitle: yup
    .string()
    .min(3, "Hero title must be at least 3 characters")
    .max(100, "Hero title cannot exceed 100 characters")
    .required("Hero title is required"),
  heroSubtitle: yup
    .string()
    .min(3, "Hero subtitle must be at least 3 characters")
    .max(200, "Hero subtitle cannot exceed 200 characters")
    .required("Hero subtitle is required"),
  heroDescription: yup
    .string()
    .min(10, "Hero description must be at least 10 characters")
    .max(500, "Hero description cannot exceed 500 characters")
    .required("Hero description is required"),
  ctaButtonText: yup
    .string()
    .min(2, "CTA button text must be at least 2 characters")
    .max(50, "CTA button text cannot exceed 50 characters")
    .required("CTA button text is required"),
  ctaButtonLink: yup
    .string()
    .min(2, "CTA button link must be at least 2 characters")
    .max(500, "CTA button link cannot exceed 500 characters")
    .required("CTA button link is required"),
  featuredProjectsCount: yup
    .number()
    .min(1, "Featured projects count must be at least 1")
    .max(20, "Featured projects count cannot exceed 20")
    .default(3),
})

// Settings validation schema (matches models/Settings.ts)
export const settingsSchema = yup.object({
  siteName: yup
    .string()
    .min(3, "Site name must be at least 3 characters")
    .max(100, "Site name cannot exceed 100 characters")
    .optional(),
  siteDescription: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  socialLinks: yup
    .object({
      github: yup.string().transform(emptyToUndefined).url("Invalid GitHub URL").optional(),
      linkedin: yup.string().transform(emptyToUndefined).url("Invalid LinkedIn URL").optional(),
      twitter: yup.string().transform(emptyToUndefined).url("Invalid Twitter URL").optional(),
    })
    .optional(),
  contactEmail: yup.string().transform(emptyToUndefined).email("Invalid email format").optional(),
  contactSuccessMessage: yup
    .string()
    .max(500, "Success message cannot exceed 500 characters")
    .optional(),
  emailNotifications: yup.boolean().optional(),
  theme: yup.string().oneOf(["light", "dark", "auto"], "Invalid theme").optional(),
  accentColor: yup
    .string()
    .transform(emptyToUndefined)
    .matches(/^#[0-9A-F]{6}$/i, "Please enter a valid hex color")
    .optional(),
  featuredProjectsCount: yup
    .number()
    .min(1, "Featured projects count must be at least 1")
    .max(20, "Featured projects count cannot exceed 20")
    .optional(),
})

// Resume validation schema (matches models/Resume.ts)
export const resumeSchema = yup.object({
  fullName: yup
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .required("Full name is required"),
  title: yup
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Title is required"),
  summary: yup
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(2000, "Summary cannot exceed 2000 characters")
    .required("Summary is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().max(30, "Phone cannot exceed 30 characters").optional(),
  location: yup.string().max(200, "Location cannot exceed 200 characters").optional(),
  website: yup.string().transform(emptyToUndefined).url("Invalid website URL").optional(),
  linkedin: yup.string().transform(emptyToUndefined).url("Invalid LinkedIn URL").optional(),
  github: yup.string().transform(emptyToUndefined).url("Invalid GitHub URL").optional(),
  // Plain string (not url-validated) so relative paths like /resume/file.pdf work
  downloadUrl: yup.string().max(500, "Download URL cannot exceed 500 characters").optional(),
})
