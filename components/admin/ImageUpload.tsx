"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
import axios from "axios";

interface ImageUploadProps {
  id: string;
  label: string;
  value: string;
  onChange: (url: string) => void;
}

/**
 * ImageUpload — file picker that uploads straight to Cloudinary via
 * POST /api/admin/upload/image and returns the secure URL.
 * No manual URL pasting needed.
 */
export function ImageUpload({ id, label, value, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/admin/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.success && response.data?.data?.url) {
        onChange(response.data.data.url);
      } else {
        setError(response.data?.message || "Upload failed");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
      // Reset so the same file can be picked again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      {value ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded preview"
            className="h-32 w-auto rounded-lg border object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={() => onChange("")}
            title="Remove image"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          No image selected
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileSelect}
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
          {uploading ? "Uploading..." : value ? "Change image" : "Upload image"}
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">
        Uploads directly to Cloudinary (JPG, PNG, WebP, GIF — max 10MB)
      </p>
    </div>
  );
}
