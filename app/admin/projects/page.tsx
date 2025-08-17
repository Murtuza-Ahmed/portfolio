"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, ExternalLink } from "lucide-react"
import axios from "axios"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/lib/types"
import type { ProjectsResponse } from "@/lib/types/api"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchProjects()
  }, [currentPage, searchTerm])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      })

      const response = await axios.get(`/api/admin/projects?${params}`)
      if (response.data.success) {
        const data: ProjectsResponse = response.data
        setProjects(data.data)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      await axios.delete(`/api/admin/projects/${projectId}`)
      fetchProjects() // Refresh the list
    } catch (error) {
      console.error("Failed to delete project:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen">
        <AdminSidebar />

        <div className="flex-1 lg:ml-64">
          <AdminHeader title="Projects" description="Manage your portfolio projects" />

          <main className="p-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Projects</CardTitle>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </div>

                {/* Search */}
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Technologies</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          Loading projects...
                        </TableCell>
                      </TableRow>
                    ) : projects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No projects found
                        </TableCell>
                      </TableRow>
                    ) : (
                      projects.map((project) => (
                        <TableRow key={project._id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                                <Image
                                  src={project.image || "/placeholder.svg"}
                                  alt={project.title}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{project.title}</div>
                                <div className="text-sm text-muted-foreground line-clamp-1">{project.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{project.technologies.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={project.featured ? "default" : "secondary"}>
                              {project.featured ? "Yes" : "No"}
                            </Badge>
                          </TableCell>
                          <TableCell>{format(new Date(project.createdAt), "MMM dd, yyyy")}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {project.liveUrl && (
                                  <DropdownMenuItem asChild>
                                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      View Live
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteProject(project._id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
