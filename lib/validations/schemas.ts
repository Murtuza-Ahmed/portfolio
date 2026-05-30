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
