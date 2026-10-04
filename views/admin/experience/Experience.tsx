"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import type { Experience as ExperienceEntry } from "@/lib/types";
import type { ExperienceResponse } from "@/lib/types/api";

interface ExperienceFormState {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string;
  companyLogo: string;
}

const emptyForm: ExperienceFormState = {
  jobTitle: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
  technologies: "",
  companyLogo: "",
};

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ExperienceFormState>(emptyForm);
  const [dialogError, setDialogError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchExperience();
  }, [currentPage, searchTerm]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await axios.get(`/api/admin/experience?${params}`);
      if (response.data.success) {
        const data: ExperienceResponse = response.data;
        setExperiences(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch experience:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogError("");
    setDialogOpen(true);
  };

  const openEditDialog = (entry: ExperienceEntry) => {
    setEditingId(entry._id);
    setForm({
      jobTitle: entry.jobTitle,
      company: entry.company,
      startDate: entry.startDate
        ? new Date(entry.startDate).toISOString().slice(0, 10)
        : "",
      endDate: entry.endDate
        ? new Date(entry.endDate).toISOString().slice(0, 10)
        : "",
      description: entry.description,
      technologies: (entry.technologies || []).join(", "),
      companyLogo: entry.companyLogo || "",
    });
    setDialogError("");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setDialogError("");
      const payload = {
        jobTitle: form.jobTitle.trim(),
        company: form.company.trim(),
        startDate: new Date(form.startDate).toISOString(),
        ...(form.endDate
          ? { endDate: new Date(form.endDate).toISOString() }
          : { endDate: null }),
        description: form.description.trim(),
        technologies: form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        ...(form.companyLogo.trim()
          ? { companyLogo: form.companyLogo.trim() }
          : {}),
      };
      if (editingId) {
        await axios.put(`/api/admin/experience/${editingId}`, payload);
      } else {
        await axios.post("/api/admin/experience", payload);
      }
      setDialogOpen(false);
      fetchExperience();
    } catch (error: any) {
      setDialogError(
        error.response?.data?.message ||
          "Failed to save experience. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (experienceId: string) => {
    if (!confirm("Are you sure you want to delete this experience entry?"))
      return;

    try {
      await axios.delete(`/api/admin/experience/${experienceId}`);
      fetchExperience();
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen">
        <AdminSidebar />

        <div className="flex-1 lg:ml-64">
          <AdminHeader
            title="Experience"
            description="Manage your portfolio work experience"
          />

          <main className="p-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Experience</CardTitle>
                  <Button onClick={openAddDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </div>

                {/* Search */}
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search experience..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Start</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          Loading experience...
                        </TableCell>
                      </TableRow>
                    ) : experiences.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          No experience entries found
                        </TableCell>
                      </TableRow>
                    ) : (
                      experiences.map((entry) => (
                        <TableRow key={entry._id}>
                          <TableCell>
                            <div className="font-medium">{entry.jobTitle}</div>
                          </TableCell>
                          <TableCell>{entry.company}</TableCell>
                          <TableCell>
                            {format(
                              new Date(entry.startDate),
                              "MMM dd, yyyy"
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(entry)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(entry._id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
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
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
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

      {/* Add / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience-jobTitle">Job Title</Label>
                <Input
                  id="experience-jobTitle"
                  value={form.jobTitle}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, jobTitle: e.target.value }))
                  }
                  placeholder="e.g. Senior Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience-company">Company</Label>
                <Input
                  id="experience-company"
                  value={form.company}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, company: e.target.value }))
                  }
                  placeholder="e.g. Acme Corp"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience-start">Start Date</Label>
                <Input
                  id="experience-start"
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience-end">End Date</Label>
                <Input
                  id="experience-end"
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  placeholder="Leave blank if current"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience-description">Description</Label>
              <Textarea
                id="experience-description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="What did you do in this role?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience-technologies">
                Technologies (comma-separated)
              </Label>
              <Textarea
                id="experience-technologies"
                value={form.technologies}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    technologies: e.target.value,
                  }))
                }
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience-logo">Company Logo URL</Label>
              <Input
                id="experience-logo"
                value={form.companyLogo}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    companyLogo: e.target.value,
                  }))
                }
                placeholder="https://... (optional)"
              />
            </div>

            {dialogError && (
              <p className="text-sm text-red-500">{dialogError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving
                ? "Saving..."
                : editingId
                  ? "Save Changes"
                  : "Add Experience"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}
