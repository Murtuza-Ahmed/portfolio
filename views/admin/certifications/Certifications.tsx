"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { Certification } from "@/lib/types";
import type { CertificationsResponse } from "@/lib/types/api";

interface CertificationFormState {
  name: string;
  issuer: string;
  date: string;
  url: string;
}

const emptyForm: CertificationFormState = {
  name: "",
  issuer: "",
  date: "",
  url: "",
};

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CertificationFormState>(emptyForm);
  const [dialogError, setDialogError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCertifications();
  }, [currentPage, searchTerm]);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await axios.get(`/api/admin/certifications?${params}`);
      if (response.data.success) {
        const data: CertificationsResponse = response.data;
        setCertifications(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch certifications:", error);
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

  const openEditDialog = (certification: Certification) => {
    setEditingId(certification._id);
    setForm({
      name: certification.name,
      issuer: certification.issuer,
      date: certification.date
        ? new Date(certification.date).toISOString().slice(0, 10)
        : "",
      url: certification.url || "",
    });
    setDialogError("");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setDialogError("");
      const payload = {
        name: form.name.trim(),
        issuer: form.issuer.trim(),
        date: new Date(form.date).toISOString(),
        ...(form.url.trim() ? { url: form.url.trim() } : {}),
      };
      if (editingId) {
        await axios.put(`/api/admin/certifications/${editingId}`, payload);
      } else {
        await axios.post("/api/admin/certifications", payload);
      }
      setDialogOpen(false);
      fetchCertifications();
    } catch (error: any) {
      setDialogError(
        error.response?.data?.message ||
          "Failed to save certification. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (certificationId: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;

    try {
      await axios.delete(`/api/admin/certifications/${certificationId}`);
      fetchCertifications();
    } catch (error) {
      console.error("Failed to delete certification:", error);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen">
        <AdminSidebar />

        <div className="flex-1 lg:ml-64">
          <AdminHeader
            title="Certifications"
            description="Manage your portfolio certifications"
          />

          <main className="p-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Certifications</CardTitle>
                  <Button onClick={openAddDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                  </Button>
                </div>

                {/* Search */}
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search certifications..."
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
                      <TableHead>Name</TableHead>
                      <TableHead>Issuer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          Loading certifications...
                        </TableCell>
                      </TableRow>
                    ) : certifications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          No certifications found
                        </TableCell>
                      </TableRow>
                    ) : (
                      certifications.map((certification) => (
                        <TableRow key={certification._id}>
                          <TableCell>
                            <div className="font-medium">
                              {certification.name}
                            </div>
                          </TableCell>
                          <TableCell>{certification.issuer}</TableCell>
                          <TableCell>
                            {format(
                              new Date(certification.date),
                              "MMM dd, yyyy"
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(certification)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDelete(certification._id)
                                }
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
              {editingId ? "Edit Certification" : "Add Certification"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="certification-name">Name</Label>
              <Input
                id="certification-name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. AWS Certified Solutions Architect"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certification-issuer">Issuer</Label>
              <Input
                id="certification-issuer"
                value={form.issuer}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, issuer: e.target.value }))
                }
                placeholder="e.g. Amazon Web Services"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certification-date">Date</Label>
              <Input
                id="certification-date"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certification-url">URL</Label>
              <Input
                id="certification-url"
                value={form.url}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, url: e.target.value }))
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
                  : "Add Certification"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}
