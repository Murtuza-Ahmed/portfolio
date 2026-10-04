"use client";

import { useEffect, useRef, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, FileText, Upload, Loader2 } from "lucide-react";
import axios from "axios";
import type { ResumeForm } from "@/lib/types";

const defaultForm: ResumeForm = {
  fullName: "",
  title: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  github: "",
  downloadUrl: "",
};

export default function ResumeAdmin() {
  const [form, setForm] = useState<ResumeForm>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/resume");
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          setForm({
            fullName: data.fullName || "",
            title: data.title || "",
            summary: data.summary || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            website: data.website || "",
            linkedin: data.linkedin || "",
            github: data.github || "",
            downloadUrl: data.downloadUrl || "",
          });
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load resume");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  const set = (key: keyof ResumeForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(0);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/admin/upload/resume", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }
        },
      });

      if (response.data.success && response.data.data?.url) {
        setForm((prev) => ({
          ...prev,
          downloadUrl: response.data.data.url,
        }));
        setUploadProgress(100);
      } else {
        setUploadError("Upload failed: no URL returned");
      }
    } catch (err: any) {
      setUploadError(
        err.response?.data?.message || "Failed to upload resume PDF"
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess(null);
      setError(null);
      const response = await axios.put("/api/admin/resume", form);
      if (response.data.success) {
        setSuccess("Resume saved successfully");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen">
        <AdminSidebar />

        <div className="flex-1 lg:ml-64">
          <AdminHeader
            title="Resume"
            description="Manage your resume details and PDF"
          />

          <main className="p-6 space-y-6">
            {loading ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Loading resume...
                </CardContent>
              </Card>
            ) : (
              <>
                {/* PDF Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Resume PDF
                    </CardTitle>
                    <CardDescription>
                      Upload a PDF that visitors can download
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {form.downloadUrl && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Current file:{" "}
                        </span>
                        <a
                          href={form.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all"
                        >
                          {form.downloadUrl}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileSelect}
                        disabled={uploading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        disabled={uploading}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {uploading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="mr-2 h-4 w-4" />
                        )}
                        {uploading ? "Uploading..." : "Upload PDF"}
                      </Button>
                    </div>
                    {uploading && uploadProgress !== null && (
                      <div className="space-y-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {uploadProgress}% uploaded
                        </p>
                      </div>
                    )}
                    {uploadError && (
                      <p className="text-sm text-destructive">{uploadError}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Resume Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Details</CardTitle>
                    <CardDescription>
                      The information shown on your public resume page
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input
                          id="full-name"
                          value={form.fullName}
                          onChange={(e) => set("fullName", e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={form.title}
                          onChange={(e) => set("title", e.target.value)}
                          placeholder="Full Stack Developer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={form.summary}
                        onChange={(e) => set("summary", e.target.value)}
                        placeholder="A short professional summary..."
                        rows={5}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={form.phone || ""}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder="+92 300 0000000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={form.location || ""}
                          onChange={(e) => set("location", e.target.value)}
                          placeholder="Karachi, Pakistan"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={form.website || ""}
                          onChange={(e) => set("website", e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={form.linkedin || ""}
                          onChange={(e) => set("linkedin", e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={form.github || ""}
                          onChange={(e) => set("github", e.target.value)}
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {success && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {success}
                  </p>
                )}
                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Saving..." : "Save Resume"}
                  </Button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
