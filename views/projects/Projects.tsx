"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ForgeEyebrow,
  ForgeReveal,
  ForgeSectionHeader,
} from "@/components/forge";
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
  Star,
  FolderOpen,
  AlertCircle,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const PAGE_LIMIT = 6;

type SortOption = "newest" | "oldest" | "title";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex aspect-[16/13] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#0d0a06] transition-all duration-500 hover:border-[rgba(255,178,56,0.4)] hover:shadow-[0_24px_70px_-24px_rgba(255,178,56,0.35)] focus-within:border-[rgba(255,178,56,0.4)] sm:aspect-[4/5]">
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title || "Project image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-forge-brown-1">
            <FolderOpen className="h-12 w-12 text-forge-mute" />
          </div>
        )}
        {/* Cinematic grade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/5" />
        <div className="absolute inset-0 bg-[#ffb238]/0 mix-blend-overlay transition-colors duration-500 group-hover:bg-[#ffb238]/[0.12]" />
      </div>

      {/* Top row: featured badge + index */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        {project.featured ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-forge-amber px-3 py-1 text-xs font-bold text-[#140e04] shadow-[0_4px_16px_rgba(255,178,56,0.5)]">
            <Star className="h-3 w-3" />
            Featured
          </span>
        ) : (
          <span />
        )}
        <span className="font-mono text-xs tracking-[0.25em] text-white/50">
          {num}
        </span>
      </div>

      {/* Default bottom info */}
      <div className="relative p-5 transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-0">
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-forge-amber">
          {project.featured ? "Featured project" : "Project"}
        </p>
        <h3 className="mt-1.5 font-display text-2xl font-bold leading-tight text-white">
          {project.title || "Untitled project"}
        </h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[0.68rem] text-white/80 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(255,178,56,0.45)] text-forge-amber transition-all duration-300 group-hover:bg-[#ffb238] group-hover:text-black">
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>

      {/* Hover sheet — full details slide up */}
      <div className="absolute inset-x-0 bottom-0 flex max-h-[94%] translate-y-[103%] flex-col rounded-t-2xl border-t border-[rgba(255,178,56,0.3)] bg-[#0b0805]/95 p-6 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0">
        <div className="translate-y-4 opacity-0 transition-all delay-75 duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-forge-amber">
            Project details
          </p>
          <h3 className="mt-1.5 font-display text-xl font-bold leading-snug text-white">
            {project.title || "Untitled project"}
          </h3>
        </div>
        <div className="mt-2 translate-y-4 overflow-y-auto opacity-0 transition-all delay-150 duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <p className="text-sm leading-relaxed text-[#beb8ac]">
            {project.description || "No description provided."}
          </p>
          {technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span key={tech} className="forge-chip px-3 py-1 text-[0.7rem]">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-auto translate-y-4 pt-5 opacity-0 transition-all delay-[225ms] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="flex gap-2">
            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="forge-btn-primary flex-1 px-4 py-2.5 text-center text-sm"
              >
                <ExternalLink className="mr-1 inline h-4 w-4" />
                Live Demo
              </Link>
            ) : null}
            {project.githubUrl ? (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="forge-btn-ghost flex-1 px-4 py-2.5 text-center text-sm"
              >
                <Github className="mr-1 inline h-4 w-4" />
                View Code
              </Link>
            ) : null}
            {!project.liveUrl && !project.githubUrl && (
              <p className="text-xs text-forge-mute">No links added yet.</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectSkeleton() {
  return (
    <div className="relative aspect-[16/13] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:aspect-[4/5]">
      <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-white/5" />
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
        <Skeleton className="h-5 w-2/3 bg-white/10" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
          <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
          <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_LIMIT),
      });
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
      // Page 1 replaces the list; later pages append (Load More)
      setProjects((prev) => (page === 1 ? list : [...prev, ...list]));
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
  }, [page, featuredOnly, sort]);

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
            <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-forge-mute">
              {featuredOnly ? "Featured selection" : "All projects"}
              {!loading && totalItems > 0 && (
                <span className="text-forge-amber"> · {totalItems}</span>
              )}
            </p>

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
        {loading && projects.length === 0 ? (
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
                  {featuredOnly
                    ? "No featured projects right now. Try viewing all."
                    : "Projects added from the admin panel will appear here."}
                </p>
              </div>
              {featuredOnly && (
                <button
                  type="button"
                  className="forge-btn-ghost mt-6 px-5 py-2.5 text-sm"
                  onClick={() => {
                    setFeaturedOnly(false);
                    setPage(1);
                  }}
                >
                  Show all projects
                </button>
              )}
            </div>
          </ForgeReveal>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ForgeReveal key={project._id} delay={Math.min(i % 9, 5) * 60}>
                  <ProjectCard project={project} index={i} />
                </ForgeReveal>
              ))}
            </div>

            {/* Load more */}
            {projects.length < totalItems && (
              <div className="mt-12 text-center">
                {loading ? (
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-forge-mute">
                    Loading more projects...
                  </p>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setPage((p) => p + 1)}
                      className="forge-btn-ghost group px-8 py-3 text-sm"
                    >
                      Load More Projects
                      <ChevronDown className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </button>
                    <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-forge-mute">
                      Showing {projects.length} of {totalItems}
                    </p>
                  </>
                )}
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
