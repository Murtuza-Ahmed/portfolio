import mongoose from "mongoose"

// Env access is lazy so importing this module never crashes `next build`
// when MONGODB_URI is missing; the error surfaces only on first connect.
function getMongoUri(): string {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
  }
  return uri
}

interface MongooseConnection {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Global variable to store the connection
let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(getMongoUri(), opts).then((mongoose) => {
      console.log("✅ Connected to MongoDB")
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
