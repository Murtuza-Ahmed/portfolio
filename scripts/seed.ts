import mongoose from "mongoose"
import { randomBytes } from "crypto"
import { config } from "dotenv"
import User from "../models/User"
import Project from "../models/Project"
import ContactMessage from "../models/ContactMessage"
import { hashPassword } from "../lib/auth/password"

// Load environment variables
config({ path: ".env.local" })

const MONGODB_URI = process.env.MONGODB_URI
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

// Never fall back to a hardcoded default password. Use ADMIN_PASSWORD from
// the environment, or generate a strong random one (printed once below).
function resolveAdminPassword(): { password: string; generated: boolean } {
  const fromEnv = process.env.ADMIN_PASSWORD
  if (fromEnv) {
    if (fromEnv.length < 12) {
      throw new Error("ADMIN_PASSWORD must be at least 12 characters long")
    }
    return { password: fromEnv, generated: false }
  }
  const generated = randomBytes(24).toString("base64url")
  return { password: generated, generated: true }
}

const { password: ADMIN_PASSWORD, generated: ADMIN_PASSWORD_GENERATED } = resolveAdminPassword()

// Sample data
const sampleUsers = [
  {
    name: "Murtuza",
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: "admin" as const,
  },
]

const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with React, Node.js, and MongoDB",
    longDescription:
      "A comprehensive e-commerce solution featuring user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard. Built with React, Node.js, Express, and MongoDB.",
    image: "/ecommerce-platform.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT", "Tailwind CSS"],
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
    status: "completed" as const,
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    longDescription:
      "A modern task management application with drag-and-drop functionality, real-time collaboration, team management, and progress tracking. Features include Kanban boards, due dates, file attachments, and notifications.",
    image: "/task-management-app.png",
    technologies: ["Next.js", "TypeScript", "Socket.io", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/johndoe/task-manager",
    liveUrl: "https://taskmanager-demo.vercel.app",
    featured: true,
    status: "active" as const,
  },
  {
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    longDescription:
      "A comprehensive social media analytics dashboard that aggregates data from multiple platforms. Features include post scheduling, engagement analytics, audience insights, and automated reporting.",
    image: "/placeholder-pauuc.png",
    technologies: ["React", "D3.js", "Node.js", "Redis", "MongoDB", "Chart.js"],
    githubUrl: "https://github.com/johndoe/social-dashboard",
    liveUrl: "https://social-dashboard-demo.vercel.app",
    featured: false,
    status: "completed" as const,
  },
  {
    title: "Weather App",
    description: "Real-time weather application with location-based forecasts",
    longDescription:
      "A responsive weather application that provides current weather conditions, 7-day forecasts, and weather alerts. Features include geolocation, favorite locations, and weather maps integration.",
    image: "/weather-app-interface.png",
    technologies: ["React", "OpenWeather API", "Geolocation API", "CSS Modules"],
    githubUrl: "https://github.com/johndoe/weather-app",
    liveUrl: "https://weather-app-demo.vercel.app",
    featured: false,
    status: "active" as const,
  },
  {
    title: "Blog CMS",
    description: "Content management system for bloggers and content creators",
    longDescription:
      "A full-featured content management system with rich text editing, media management, SEO optimization, and multi-author support. Includes comment system, categories, tags, and analytics.",
    image: "/blog-cms-interface.png",
    technologies: ["Next.js", "MDX", "Sanity", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/johndoe/blog-cms",
    featured: false,
    status: "archived" as const,
  },
  {
    title: "Expense Tracker",
    description: "Personal finance management application",
    longDescription:
      "A comprehensive expense tracking application with budget management, category-based spending analysis, recurring transactions, and financial goal tracking. Features include data visualization and export capabilities.",
    image: "/expense-tracker-app.png",
    technologies: ["React Native", "Node.js", "MongoDB", "Chart.js", "JWT"],
    githubUrl: "https://github.com/johndoe/expense-tracker",
    featured: false,
    status: "active" as const,
  },
]

const sampleMessages = [
  {
    name: "Alice Johnson",
    email: "alice@company.com",
    subject: "Project Collaboration Opportunity",
    message:
      "Hi John, I came across your portfolio and I'm impressed with your work. We have an exciting project that would be perfect for your skills. Would you be interested in discussing a potential collaboration?",
    status: "unread" as const,
  },
  {
    name: "Bob Wilson",
    email: "bob@startup.io",
    subject: "Full-Stack Developer Position",
    message:
      "Hello, we're a growing startup looking for a talented full-stack developer. Your experience with the MERN stack is exactly what we need. Are you open to new opportunities?",
    status: "read" as const,
  },
  {
    name: "Carol Davis",
    email: "carol@agency.com",
    subject: "Website Development Inquiry",
    message:
      "We need a modern, responsive website for our digital agency. After reviewing your portfolio, we believe you'd be a great fit for this project. Can we schedule a call to discuss the details?",
    status: "replied" as const,
  },
  {
    name: "David Brown",
    email: "david@tech.com",
    subject: "Technical Consultation",
    message:
      "I'm working on a complex web application and could use some expert advice on architecture decisions. Would you be available for a technical consultation session?",
    status: "unread" as const,
  },
]

async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error("❌ Please define the MONGODB_URI environment variable inside .env.local")
    process.exit(1)
  }
  try {
    await mongoose.connect(uri)
    console.log("✅ Connected to MongoDB")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  }
}

async function clearDatabase() {
  try {
    await User.deleteMany({})
    await Project.deleteMany({})
    await ContactMessage.deleteMany({})
    console.log("🗑️  Cleared existing data")
  } catch (error) {
    console.error("❌ Error clearing database:", error)
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
    console.log(`✅ Seeded ${users.length} users`)
  } catch (error) {
    console.error("❌ Error seeding users:", error)
    throw error
  }
}

async function seedProjects() {
  try {
    await Project.insertMany(sampleProjects)
    console.log(`✅ Seeded ${sampleProjects.length} projects`)
  } catch (error) {
    console.error("❌ Error seeding projects:", error)
    throw error
  }
}

async function seedMessages() {
  try {
    await ContactMessage.insertMany(sampleMessages)
    console.log(`✅ Seeded ${sampleMessages.length} contact messages`)
  } catch (error) {
    console.error("❌ Error seeding messages:", error)
    throw error
  }
}

async function main() {
  console.log("🌱 Starting database seeding...")

  // DANGER: this wipes all data. Require an explicit --force flag so it
  // can never run destructively by accident (e.g. against production).
  if (!process.argv.includes("--force")) {
    console.error("❌ Refusing to clear the database without --force.")
    console.error('   Run with: npm run admin -- --force  (make sure MONGODB_URI points at the right database!)')
    process.exit(1)
  }

  await connectDB()
  await clearDatabase()
  await seedUsers()
  await seedProjects()
  await seedMessages()

  console.log("🎉 Database seeding completed successfully!")
  console.log("\n📋 Summary:")
  console.log(`   • ${sampleUsers.length} users created`)
  console.log(`   • ${sampleProjects.length} projects created`)
  console.log(`   • ${sampleMessages.length} contact messages created`)
  console.log("\n🔐 Admin Credentials:")
  console.log(`   Email: ${ADMIN_EMAIL}`)
  if (ADMIN_PASSWORD_GENERATED) {
    console.log(`   Password: ${ADMIN_PASSWORD} (generated — shown once, change it after first login)`)
  } else {
    console.log("   Password: (taken from ADMIN_PASSWORD in your environment)")
  }
  console.log("\n🚀 You can now start the application and log in to the admin panel!")

  await mongoose.disconnect()
  console.log("✅ Disconnected from MongoDB")
}

// Handle errors
main().catch((error) => {
  console.error("❌ Seeding failed:", error)
  process.exit(1)
})
