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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

const defaultForm = {
  siteName: "",
  siteDescription: "",
  contactEmail: "",
  contactSuccessMessage: "",
  theme: "auto" as "light" | "dark" | "auto",
  accentColor: "#6366f1",
  featuredProjectsCount: 6,
  emailNotifications: true,
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
  },
};

export default function Setting() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/settings");
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          setForm({
            siteName: data.siteName || "",
            siteDescription: data.siteDescription || "",
            contactEmail: data.contactEmail || "",
            contactSuccessMessage: data.contactSuccessMessage || "",
            theme: data.theme || "auto",
            accentColor: data.accentColor || "#6366f1",
            featuredProjectsCount: data.featuredProjectsCount ?? 6,
            emailNotifications: data.emailNotifications ?? true,
            socialLinks: {
              github: data.socialLinks?.github || "",
              linkedin: data.socialLinks?.linkedin || "",
              twitter: data.socialLinks?.twitter || "",
            },
          });
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const set = (key: keyof typeof defaultForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setSocial = (key: "github" | "linkedin" | "twitter", value: string) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess(null);
      setError(null);
      const response = await axios.put("/api/admin/settings", {
        ...form,
        featuredProjectsCount: Number(form.featuredProjectsCount),
      });
      if (response.data.success) {
        setSuccess("Settings saved successfully");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save settings");
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
            title="Settings"
            description="Configure your application settings"
          />

          <main className="p-6 space-y-6">
            {loading ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Loading settings...
                </CardContent>
              </Card>
            ) : (
              <>
                {/* General Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      General Settings
                    </CardTitle>
                    <CardDescription>
                      Basic configuration for your application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="site-name">Site Name</Label>
                        <Input
                          id="site-name"
                          value={form.siteName}
                          onChange={(e) => set("siteName", e.target.value)}
                          placeholder="My Portfolio"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={form.contactEmail}
                          onChange={(e) => set("contactEmail", e.target.value)}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="site-description">Site Description</Label>
                      <Textarea
                        id="site-description"
                        value={form.siteDescription}
                        onChange={(e) => set("siteDescription", e.target.value)}
                        placeholder="A short description of your site"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-success-message">
                        Contact Success Message
                      </Label>
                      <Textarea
                        id="contact-success-message"
                        value={form.contactSuccessMessage}
                        onChange={(e) =>
                          set("contactSuccessMessage", e.target.value)
                        }
                        placeholder="Message shown after the contact form is submitted"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>
                      Links shown across your portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="social-github">GitHub</Label>
                      <Input
                        id="social-github"
                        value={form.socialLinks.github}
                        onChange={(e) => setSocial("github", e.target.value)}
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="social-linkedin">LinkedIn</Label>
                      <Input
                        id="social-linkedin"
                        value={form.socialLinks.linkedin}
                        onChange={(e) => setSocial("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="social-twitter">Twitter</Label>
                      <Input
                        id="social-twitter"
                        value={form.socialLinks.twitter}
                        onChange={(e) => setSocial("twitter", e.target.value)}
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Theme and accent customization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select
                          value={form.theme}
                          onValueChange={(value) =>
                            set("theme", value as "light" | "dark" | "auto")
                          }
                        >
                          <SelectTrigger id="theme">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="auto">Auto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accent-color">Accent Color</Label>
                        <div className="flex items-center gap-3">
                          <Input
                            id="accent-color"
                            type="color"
                            value={form.accentColor}
                            onChange={(e) => set("accentColor", e.target.value)}
                            className="w-12 h-10 p-1 cursor-pointer"
                          />
                          <span className="text-sm text-muted-foreground">
                            {form.accentColor}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="featured-projects-count">
                          Featured Projects Count
                        </Label>
                        <Input
                          id="featured-projects-count"
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
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Email alerts for portfolio activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">
                          Contact form email notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Send an email when someone submits the contact form
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={form.emailNotifications}
                        onCheckedChange={(checked) =>
                          set("emailNotifications", checked)
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
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Saving..." : "Save Settings"}
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
