import mongoose from "mongoose"
import { config } from "dotenv"
import User from "../models/User"
import Settings from "../models/Settings"
import Home from "../models/Home"
import About from "../models/About"
import Skill from "../models/Skill"
import Experience from "../models/Experience"
import Education from "../models/Education"
import Certification from "../models/Certification"
import { hashPassword } from "../lib/auth/password"

// Load environment variables
config({ path: ".env.local" })

const MONGODB_URI = process.env.MONGODB_URI!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin123!@#"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

// Sample data
const sampleUsers = [
  {
    name: "Murtuza",
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: "admin" as const,
  },
]

const defaultSettings = {
  siteName: "My Portfolio",
  siteDescription: "Welcome to my portfolio",
  socialLinks: {
    github: "https://github.com/Murtuza-Ahmed",
    linkedin: "https://www.linkedin.com/in/murtuza-ahmed-36012628b/",
    twitter: "https://x.com/MurtuzaAhm87472",
  },
  contactEmail: ADMIN_EMAIL,
  contactSuccessMessage: "Thank you for your message! I'll get back to you soon.",
  theme: "auto" as const,
  accentColor: "#3b82f6",
  featuredProjectsCount: 3,
}

const defaultHome = {
  heroImage: "https://via.placeholder.com/1200x600",
  heroTitle: "Simple, smooth, premium web experiences.",
  heroSubtitle: "Hello, I'm a product-minded developer",
  heroDescription: "I build elegant MERN applications with clear structure, thoughtful motion, and a polished interface that feels like a top-tier product.",
  ctaButtonText: "Hire Me",
  ctaButtonLink: "/contact",
  featuredProjectsCount: 3,
}

const defaultAbout = {
  profileImage: "https://via.placeholder.com/400x400",
  bio: "I'm a passionate MERN Stack Developer with over 1.5 years of experience creating modern, scalable web applications. I love turning complex problems into simple, beautiful, and intuitive solutions.",
  interests: ["Coffee Brewing", "Photography", "Music Production", "Reading"],
  values: ["Quality First", "Collaboration", "Continuous Learning", "User-Centric"],
}

const sampleSkills = [
  { name: "React", proficiency: 92, category: "Frontend" as const },
  { name: "Next.js", proficiency: 90, category: "Frontend" as const },
  { name: "TypeScript", proficiency: 85, category: "Frontend" as const },
  { name: "Tailwind CSS", proficiency: 88, category: "Frontend" as const },
  { name: "Node.js", proficiency: 80, category: "Backend" as const },
  { name: "Express.js", proficiency: 80, category: "Backend" as const },
  { name: "MongoDB", proficiency: 82, category: "Database" as const },
  { name: "REST APIs", proficiency: 85, category: "Backend" as const },
  { name: "Git", proficiency: 88, category: "Tools" as const },
  { name: "Docker", proficiency: 70, category: "DevOps" as const },
]

const sampleExperiences = [
  {
    jobTitle: "Senior MERN Stack Developer",
    company: "Suffah Tech",
    startDate: new Date("2024-10-01"),
    endDate: null,
    description: "Led development of scalable applications, implemented CI/CD pipelines, and mentored junior developers.",
    technologies: ["React", "Node.js", "MongoDB", "TypeScript", "Express.js"],
    companyLogo: "",
  },
  {
    jobTitle: "WordPress Developer",
    company: "Tek Gravity",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-10-01"),
    description: "Developed WordPress sites and supported team members with their daily tasks.",
    technologies: ["WordPress", "PHP", "MySQL"],
    companyLogo: "",
  },
]

const sampleEducation = [
  {
    school: "SMIT",
    degree: "Web and Mobile App Development",
    field: "Full Stack Development",
    startDate: new Date("2022-01-01"),
    endDate: new Date("2023-01-01"),
    achievements: ["Completed intensive bootcamp", "Built multiple full-stack projects"],
  },
  {
    school: "Suffah Institute of Technology",
    degree: "Full Stack Web Development Certification",
    field: "Full Stack Development",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-31"),
    achievements: ["Built 5+ production projects", "Earned developer certification"],
  },
]

const sampleCertifications = [
  {
    name: "SMIT Certified Developer",
    issuer: "Web & Mobile App Development",
    date: new Date("2023-01-01"),
    url: "",
  },
  {
    name: "Full Stack Web Development Certification",
    issuer: "Suffah Institute of Technology",
    date: new Date("2024-01-01"),
    url: "",
  },
]

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

async function clearDatabase() {
  try {
    await User.deleteMany({})
    await Settings.deleteMany({})
    await Home.deleteMany({})
    await About.deleteMany({})
    await Skill.deleteMany({})
    await Experience.deleteMany({})
    await Education.deleteMany({})
    await Certification.deleteMany({})
    console.log("Cleared existing data")
  } catch (error) {
    console.error("Error clearing database:", error)
    throw error
  }
}

async function seedUsers() {
  try {
    const users = await Promise.all(
      sampleUsers.map(async (userData) => {
        const hashedPassword = await hashPassword(userData.password)
        return {
          ...userData,
          password: hashedPassword,
        }
      }),
    )

    await User.insertMany(users)
    console.log(`Seeded ${users.length} users`)
  } catch (error) {
    console.error("Error seeding users:", error)
    throw error
  }
}

async function seedSettings() {
  try {
    await Settings.insertMany([defaultSettings])
    console.log("Seeded default settings")
  } catch (error) {
    console.error("Error seeding settings:", error)
    throw error
  }
}

async function seedHome() {
  try {
    await Home.insertMany([defaultHome])
    console.log("Seeded home content")
  } catch (error) {
    console.error("Error seeding home:", error)
    throw error
  }
}

async function seedAbout() {
  try {
    await About.insertMany([defaultAbout])
    console.log("Seeded about content")
  } catch (error) {
    console.error("Error seeding about:", error)
    throw error
  }
}

async function seedSkills() {
  try {
    await Skill.insertMany(sampleSkills)
    console.log(`Seeded ${sampleSkills.length} skills`)
  } catch (error) {
    console.error("Error seeding skills:", error)
    throw error
  }
}

async function seedExperience() {
  try {
    await Experience.insertMany(sampleExperiences)
    console.log(`Seeded ${sampleExperiences.length} experiences`)
  } catch (error) {
    console.error("Error seeding experience:", error)
    throw error
  }
}

async function seedEducation() {
  try {
    await Education.insertMany(sampleEducation)
    console.log(`Seeded ${sampleEducation.length} education entries`)
  } catch (error) {
    console.error("Error seeding education:", error)
    throw error
  }
}

async function seedCertifications() {
  try {
    await Certification.insertMany(sampleCertifications)
    console.log(`Seeded ${sampleCertifications.length} certifications`)
  } catch (error) {
    console.error("Error seeding certifications:", error)
    throw error
  }
}

async function main() {
  console.log("Starting database seeding...")

  await connectDB()
  await clearDatabase()
  await seedUsers()
  await seedSettings()
  await seedHome()
  await seedAbout()
  await seedSkills()
  await seedExperience()
  await seedEducation()
  await seedCertifications()

  console.log("🎉 Database seeding completed successfully!")
  console.log("\n📋 Summary:")
  console.log(`   • ${sampleUsers.length} admin user created`)
  console.log(`   • Default settings configured`)
  console.log(`   • Home content seeded`)
  console.log(`   • About content seeded`)
  console.log(`   • ${sampleSkills.length} skills seeded`)
  console.log(`   • ${sampleExperiences.length} experiences seeded`)
  console.log(`   • ${sampleEducation.length} education entries seeded`)
  console.log(`   • ${sampleCertifications.length} certifications seeded`)
  console.log("\n🔐 Admin Credentials:")
  console.log(`   Email: ${ADMIN_EMAIL}`)
  console.log(`   Password: ${ADMIN_PASSWORD}`)
  console.log("\n🚀 All portfolio data is now in the database!")
  console.log("You can now manage everything from the admin panel!")

  await mongoose.disconnect()
  console.log("Disconnected from MongoDB")
}

// Handle errors
main().catch((error) => {
  console.error("Seeding failed:", error)
  process.exit(1)
})

