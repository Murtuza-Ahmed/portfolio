"use client";

import { useEffect, useState } from "react";
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
import { Save, Home as HomeIcon } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import axios from "axios";

export default function HomeContent() {
  const [form, setForm] = useState({
    heroImage: "",
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    ctaButtonText: "",
    ctaButtonLink: "",
    featuredProjectsCount: 6,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/home");
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          setForm({
            heroImage: data.heroImage || "",
            heroTitle: data.heroTitle || "",
            heroSubtitle: data.heroSubtitle || "",
            heroDescription: data.heroDescription || "",
            ctaButtonText: data.ctaButtonText || "",
            ctaButtonLink: data.ctaButtonLink || "",
            featuredProjectsCount: data.featuredProjectsCount ?? 6,
          });
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to load home content"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  const set = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess(null);
      setError(null);
      const response = await axios.put("/api/admin/home", {
        ...form,
        featuredProjectsCount: Number(form.featuredProjectsCount),
      });
      if (response.data.success) {
        setSuccess("Home content saved successfully");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save home content");
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
            title="Home Content"
            description="Manage your home page hero section"
          />

          <main className="p-6 space-y-6">
            {loading ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Loading home content...
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HomeIcon className="h-5 w-5" />
                      Hero Section
                    </CardTitle>
                    <CardDescription>
                      The content shown in the hero section of your home page
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ImageUpload
                      id="hero-image"
                      label="Hero Image"
                      value={form.heroImage}
                      onChange={(url) => set("heroImage", url)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hero-title">Hero Title</Label>
                        <Input
                          id="hero-title"
                          value={form.heroTitle}
                          onChange={(e) => set("heroTitle", e.target.value)}
                          placeholder="Hi, I'm John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                        <Input
                          id="hero-subtitle"
                          value={form.heroSubtitle}
                          onChange={(e) => set("heroSubtitle", e.target.value)}
                          placeholder="Full Stack Developer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-description">Hero Description</Label>
                      <Textarea
                        id="hero-description"
                        value={form.heroDescription}
                        onChange={(e) => set("heroDescription", e.target.value)}
                        placeholder="A short description shown under the hero title"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cta-text">CTA Button Text</Label>
                        <Input
                          id="cta-text"
                          value={form.ctaButtonText}
                          onChange={(e) => set("ctaButtonText", e.target.value)}
                          placeholder="View My Work"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cta-link">CTA Button Link</Label>
                        <Input
                          id="cta-link"
                          value={form.ctaButtonLink}
                          onChange={(e) => set("ctaButtonLink", e.target.value)}
                          placeholder="/projects"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="featured-count">
                        Featured Projects Count
                      </Label>
                      <Input
                        id="featured-count"
                        type="number"
                        min={0}
                        value={form.featuredProjectsCount}
                        onChange={(e) =>
                          set(
                            "featuredProjectsCount",
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                      />
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
                    {saving ? "Saving..." : "Save Home Content"}
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
