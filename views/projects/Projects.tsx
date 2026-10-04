"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ForgeEyebrow,
  ForgeReveal,
  ForgeSectionHeader,
} from "@/components/forge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ExternalLink,
  Github,
  Search,
  Star,
  FolderOpen,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const PAGE_LIMIT = 9;

type SortOption = "newest" | "oldest" | "title";

function ProjectCard({ project }: { project: Project }) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];

  return (
    <article className="forge-card forge-card-hover group flex flex-col overflow-hidden">
      <div className="relative overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title || "Project image"}
            width={600}
            height={340}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-forge-brown-1">
            <FolderOpen className="h-12 w-12 text-forge-mute" />
          </div>
        )}
        {project.featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-forge-amber px-3 py-1 text-xs font-bold text-[#140e04] shadow-[0_4px_16px_rgba(255,178,56,0.5)] absolute left-3 top-3">
            <Star className="h-3 w-3" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold transition-colors group-hover:text-forge-amber">
            {project.title || "Untitled project"}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description || "No description provided."}
          </p>
        </div>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 6).map((tech) => (
              <span key={tech} className="forge-chip text-xs">
                {tech}
              </span>
            ))}
            {technologies.length > 6 && (
              <span className="forge-chip text-xs">
                +{technologies.length - 6}
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="forge-btn-ghost flex-1 px-4 py-2.5 text-sm"
            >
              <ExternalLink className="mr-1 h-4 w-4" />
              Live Demo
            </Link>
          ) : null}
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="forge-btn-ghost flex-1 px-4 py-2.5 text-sm"
            >
              <Github className="mr-1 h-4 w-4" />
              View Code
            </Link>
          ) : null}
          {!project.liveUrl && !project.githubUrl && (
            <p className="text-xs text-forge-mute">No links added yet.</p>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectSkeleton() {
  return (
    <div className="forge-card overflow-hidden p-0">
      <Skeleton className="h-48 w-full rounded-none bg-white/5" />
      <div className="space-y-4 p-6">
        <Skeleton className="h-6 w-3/4 bg-white/5" />
        <Skeleton className="h-4 w-full bg-white/5" />
        <Skeleton className="h-4 w-5/6 bg-white/5" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 bg-white/5" />
          <Skeleton className="h-6 w-16 bg-white/5" />
          <Skeleton className="h-6 w-16 bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce the search input so we don't hammer the API on every keystroke
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_LIMIT),
      });
      if (search) params.set("search", search);
      if (featuredOnly) params.set("featured", "true");
      if (sort === "newest") {
        params.set("sortBy", "createdAt");
        params.set("sortOrder", "desc");
      } else if (sort === "oldest") {
        params.set("sortBy", "createdAt");
        params.set("sortOrder", "asc");
      } else {
        params.set("sortBy", "title");
        params.set("sortOrder", "asc");
      }

      const res = await fetch(`/api/projects?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load projects");
      }

      const list = Array.isArray(data.data) ? data.data : [];
      setProjects(list);
      setTotalPages(data.pagination?.totalPages ?? 1);
      setTotalItems(data.pagination?.totalItems ?? list.length);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load projects",
      );
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, featuredOnly, sort]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="forge-hero-glow" />
        <div className="forge-section text-center">
          <ForgeReveal>
            <ForgeEyebrow centered>Portfolio</ForgeEyebrow>
            <h1 className="forge-h1">My Projects</h1>
            <p className="forge-lead forge-lead-center">
              A collection of projects I&apos;ve built — each one managed live
              from my admin panel, showcasing MERN stack development and modern
              web technologies.
            </p>
          </ForgeReveal>
        </div>
      </section>

      {/* Filters */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        <ForgeReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forge-mute" />
              <Input
                placeholder="Search projects..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="forge-field rounded-full pl-11"
                aria-label="Search projects"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="forge-card flex rounded-full p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setFeaturedOnly(false);
                    setPage(1);
                  }}
                  className={
                    !featuredOnly
                      ? "forge-btn-primary px-5 py-2 text-sm"
                      : "rounded-full px-5 py-2 text-sm font-medium text-forge-mute transition-colors hover:text-foreground"
                  }
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFeaturedOnly(true);
                    setPage(1);
                  }}
                  className={
                    featuredOnly
                      ? "forge-btn-primary px-5 py-2 text-sm"
                      : "rounded-full px-5 py-2 text-sm font-medium text-forge-mute transition-colors hover:text-foreground"
                  }
                >
                  <Star className="mr-1 inline h-3 w-3" />
                  Featured
                </button>
              </div>

              <Select
                value={sort}
                onValueChange={(v) => {
                  setSort(v as SortOption);
                  setPage(1);
                }}
              >
                <SelectTrigger
                  className="forge-field w-[160px] rounded-full"
                  aria-label="Sort projects"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="title">Title A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ForgeReveal>
      </div>

      {/* Project grid */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ForgeReveal>
            <div className="forge-card p-12 text-center">
              <AlertCircle className="mx-auto h-10 w-10 text-forge-amber" />
              <div className="mt-4 space-y-1">
                <p className="font-semibold">Couldn&apos;t load projects</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <button
                type="button"
                className="forge-btn-ghost mt-6 px-5 py-2.5 text-sm"
                onClick={fetchProjects}
              >
                Try again
              </button>
            </div>
          </ForgeReveal>
        ) : projects.length === 0 ? (
          <ForgeReveal>
            <div className="forge-card border-dashed p-12 text-center">
              <FolderOpen className="mx-auto h-10 w-10 text-forge-mute" />
              <div className="mt-4 space-y-1">
                <p className="font-semibold">No projects yet</p>
                <p className="text-sm text-muted-foreground">
                  {search || featuredOnly
                    ? "Nothing matches your filters. Try clearing them."
                    : "Projects added from the admin panel will appear here."}
                </p>
              </div>
              {(search || featuredOnly) && (
                <button
                  type="button"
                  className="forge-btn-ghost mt-6 px-5 py-2.5 text-sm"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setFeaturedOnly(false);
                    setPage(1);
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          </ForgeReveal>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ForgeReveal key={project._id} delay={Math.min(i % 9, 5) * 60}>
                  <ProjectCard project={project} />
                </ForgeReveal>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="forge-btn-ghost px-5 py-2.5 text-sm disabled:opacity-40"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </button>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-forge-mute">
                  Page {page} of {totalPages} · {totalItems} project
                  {totalItems === 1 ? "" : "s"}
                </p>
                <button
                  type="button"
                  className="forge-btn-ghost px-5 py-2.5 text-sm disabled:opacity-40"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Call to Action */}
      <section className="relative overflow-hidden">
        <div className="forge-hero-glow" />
        <div className="forge-section text-center">
          <ForgeSectionHeader
            eyebrow="Contact"
            title="Interested in Working Together?"
            lead="I'm always excited to take on new challenges and create amazing digital experiences. Let's discuss your next project!"
          />
          <ForgeReveal delay={100}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="forge-btn-primary">
                Start a Project
              </Link>
              <Link href="/resume" className="forge-btn-ghost">
                View My Resume
              </Link>
            </div>
          </ForgeReveal>
        </div>
      </section>
    </div>
  );
}
