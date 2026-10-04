"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderOpen, MessageSquare, TrendingUp } from "lucide-react";
import axios from "axios";
import type { DashboardStats } from "@/lib/types/api";

export default function AdminHome() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/admin/dashboard");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error: any) {
      alert("Failed to fetch dashboard stats: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      description: `${stats?.recentUsers || 0} new this month`,
      color: "text-blue-600",
    },
    {
      title: "Total Projects",
      value: stats?.totalProjects || 0,
      icon: FolderOpen,
      description: `${stats?.featuredProjects || 0} featured`,
      color: "text-green-600",
    },
    {
      title: "Messages",
      value: stats?.totalMessages || 0,
      icon: MessageSquare,
      description: `${stats?.unreadMessages || 0} unread`,
      color: "text-orange-600",
    },
    {
      title: "Total Skills",
      value: stats?.totalSkills || 0,
      icon: TrendingUp,
      description: "skills listed",
      color: "text-purple-600",
    },
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen">
        <AdminSidebar />

        <div className="flex-1 lg:ml-64">
          <AdminHeader
            title="Dashboard"
            description="Overview of your application statistics"
          />

          <main className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {loading ? "..." : stat.value}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active</span>
                      <span className="font-medium">
                        {stats?.projectsByStatus.active || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completed</span>
                      <span className="font-medium">
                        {stats?.projectsByStatus.completed || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Archived</span>
                      <span className="font-medium">
                        {stats?.projectsByStatus.archived || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Message Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Unread</span>
                      <span className="font-medium text-orange-600">
                        {stats?.messagesByStatus.unread || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Read</span>
                      <span className="font-medium">
                        {stats?.messagesByStatus.read || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Replied</span>
                      <span className="font-medium text-green-600">
                        {stats?.messagesByStatus.replied || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
