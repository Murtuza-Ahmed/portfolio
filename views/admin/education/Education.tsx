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
import type { Education as EducationEntry } from "@/lib/types";
import type { EducationResponse } from "@/lib/types/api";

interface EducationFormState {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  achievements: string;
}

const emptyForm: EducationFormState = {
  school: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  achievements: "",
};

export default function Education() {
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EducationFormState>(emptyForm);
  const [dialogError, setDialogError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEducation();
  }, [currentPage, searchTerm]);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await axios.get(`/api/admin/education?${params}`);
      if (response.data.success) {
        const data: EducationResponse = response.data;
        setEducation(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch education:", error);
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

  const openEditDialog = (entry: EducationEntry) => {
    setEditingId(entry._id);
    setForm({
      school: entry.school,
      degree: entry.degree,
      field: entry.field,
      startDate: entry.startDate
        ? new Date(entry.startDate).toISOString().slice(0, 10)
        : "",
      endDate: entry.endDate
        ? new Date(entry.endDate).toISOString().slice(0, 10)
        : "",
      achievements: (entry.achievements || []).join(", "),
    });
    setDialogError("");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setDialogError("");
      const payload = {
        school: form.school.trim(),
        degree: form.degree.trim(),
        field: form.field.trim(),
        startDate: new Date(form.startDate).toISOString(),
        ...(form.endDate
          ? { endDate: new Date(form.endDate).toISOString() }
          : {}),
        achievements: form.achievements
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
      };
      if (editingId) {
        await axios.put(`/api/admin/education/${editingId}`, payload);
      } else {
        await axios.post("/api/admin/education", payload);
      }
      setDialogOpen(false);
      fetchEducation();
    } catch (error: any) {
      setDialogError(
        error.response?.data?.message ||
          "Failed to save education. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (educationId: string) => {
    if (!confirm("Are you sure you want to delete this education entry?"))
      return;

    try {
      await axios.delete(`/api/admin/education/${educationId}`);
      fetchEducation();
    } catch (error) {
      console.error("Failed to delete education:", error);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen">
        <AdminSidebar />

        <div className="flex-1 lg:ml-64">
          <AdminHeader
            title="Education"
            description="Manage your portfolio education"
          />

          <main className="p-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Education</CardTitle>
                  <Button onClick={openAddDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </div>

                {/* Search */}
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search education..."
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
                      <TableHead>School</TableHead>
                      <TableHead>Degree</TableHead>
                      <TableHead>Field</TableHead>
                      <TableHead>Start</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Loading education...
                        </TableCell>
                      </TableRow>
                    ) : education.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No education entries found
                        </TableCell>
                      </TableRow>
                    ) : (
                      education.map((entry) => (
                        <TableRow key={entry._id}>
                          <TableCell>
                            <div className="font-medium">{entry.school}</div>
                          </TableCell>
                          <TableCell>{entry.degree}</TableCell>
                          <TableCell>{entry.field}</TableCell>
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
              {editingId ? "Edit Education" : "Add Education"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="education-school">School</Label>
              <Input
                id="education-school"
                value={form.school}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, school: e.target.value }))
                }
                placeholder="e.g. Stanford University"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education-degree">Degree</Label>
                <Input
                  id="education-degree"
                  value={form.degree}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, degree: e.target.value }))
                  }
                  placeholder="e.g. Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education-field">Field</Label>
                <Input
                  id="education-field"
                  value={form.field}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, field: e.target.value }))
                  }
                  placeholder="e.g. Computer Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education-start">Start Date</Label>
                <Input
                  id="education-start"
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education-end">End Date</Label>
                <Input
                  id="education-end"
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education-achievements">
                Achievements (comma-separated)
              </Label>
              <Textarea
                id="education-achievements"
                value={form.achievements}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    achievements: e.target.value,
                  }))
                }
                placeholder="e.g. Dean's List, Graduated with honors"
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
                  : "Add Education"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}
