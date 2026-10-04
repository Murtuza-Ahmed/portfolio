export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import User from "@/models/User"
import Project from "@/models/Project"
import ContactMessage from "@/models/ContactMessage"
import Skill from "@/models/Skill"
import Education from "@/models/Education"
import Experience from "@/models/Experience"
import Certification from "@/models/Certification"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"
import type { DashboardStats } from "@/lib/types/api"

// GET /api/admin/dashboard - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Get current date for recent calculations
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Execute all queries in parallel
    const [
      totalUsers,
      totalProjects,
      totalMessages,
      featuredProjects,
      unreadMessages,
      recentUsers,
      totalSkills,
      totalEducation,
      totalExperience,
      totalCertifications,
      projectsByStatus,
      messagesByStatus,
    ] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      ContactMessage.countDocuments(),
      Project.countDocuments({ featured: true }),
      ContactMessage.countDocuments({ status: "unread" }),
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Skill.countDocuments(),
      Education.countDocuments(),
      Experience.countDocuments(),
      Certification.countDocuments(),
      Project.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      ContactMessage.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
    ])

    // Format project status counts
    const projectStatusCounts = {
      active: 0,
      completed: 0,
      archived: 0,
    }
    projectsByStatus.forEach((item: any) => {
      projectStatusCounts[item._id as keyof typeof projectStatusCounts] = item.count
    })

    // Format message status counts
    const messageStatusCounts = {
      unread: 0,
      read: 0,
      replied: 0,
    }
    messagesByStatus.forEach((item: any) => {
      messageStatusCounts[item._id as keyof typeof messageStatusCounts] = item.count
    })

    const stats: DashboardStats = {
      totalUsers,
      totalProjects,
      totalMessages,
      featuredProjects,
      unreadMessages,
      recentUsers,
      totalSkills,
      totalEducation,
      totalExperience,
      totalCertifications,
      projectsByStatus: projectStatusCounts,
      messagesByStatus: messageStatusCounts,
    }

    return NextResponse.json(createSuccessResponse(stats, "Dashboard statistics retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    return NextResponse.json(createErrorResponse("Failed to retrieve dashboard statistics"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
