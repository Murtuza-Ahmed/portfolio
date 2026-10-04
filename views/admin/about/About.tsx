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
import { Save, User as UserIcon } from "lucide-react";
import axios from "axios";

export default function About() {
  const [form, setForm] = useState({
    profileImage: "",
    bio: "",
    interests: "",
    values: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/about");
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          setForm({
            profileImage: data.profileImage || "",
            bio: data.bio || "",
            interests: (data.interests || []).join(", "),
            values: (data.values || []).join(", "),
          });
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load about content");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const set = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toArray = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess(null);
      setError(null);
      const response = await axios.put("/api/admin/about", {
        profileImage: form.profileImage,
        bio: form.bio,
        interests: toArray(form.interests),
        values: toArray(form.values),
      });
      if (response.data.success) {
        setSuccess("About content saved successfully");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save about content");
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
            title="About"
            description="Manage your about section content"
          />

          <main className="p-6 space-y-6">
            {loading ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Loading about content...
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      About Content
                    </CardTitle>
                    <CardDescription>
                      The content shown on your about page
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-image">Profile Image URL</Label>
                      <Input
                        id="profile-image"
                        value={form.profileImage}
                        onChange={(e) => set("profileImage", e.target.value)}
                        placeholder="https://example.com/profile.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={form.bio}
                        onChange={(e) => set("bio", e.target.value)}
                        placeholder="Write a short bio about yourself..."
                        rows={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interests">
                        Interests (comma-separated)
                      </Label>
                      <Textarea
                        id="interests"
                        value={form.interests}
                        onChange={(e) => set("interests", e.target.value)}
                        placeholder="Coding, Reading, Traveling"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="values">Values (comma-separated)</Label>
                      <Textarea
                        id="values"
                        value={form.values}
                        onChange={(e) => set("values", e.target.value)}
                        placeholder="Honesty, Quality, Learning"
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
                    {saving ? "Saving..." : "Save About"}
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
