"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ForgeReveal — fade-and-rise scroll reveal for the forge design system.
 * Uses IntersectionObserver; renders visible immediately when
 * prefers-reduced-motion is set.
 */
export function ForgeReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("forge-reveal", visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}

/**
 * ForgeEyebrow — mono uppercase amber label with a glowing dot.
 */
export function ForgeEyebrow({
  children,
  centered = false,
  className,
}: {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "forge-eyebrow",
        centered && "forge-eyebrow-center",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * ForgeSectionHeader — centered mono eyebrow + big Space Grotesk title
 * + optional lead paragraph. The standard section header of the forge system.
 */
export function ForgeSectionHeader({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <ForgeReveal className={cn("mx-auto mb-12 max-w-3xl text-center md:mb-16", className)}>
      <ForgeEyebrow centered>{eyebrow}</ForgeEyebrow>
      <h2 className="forge-h2 mt-4">{title}</h2>
      {lead ? <p className="forge-lead forge-lead-center mt-5">{lead}</p> : null}
    </ForgeReveal>
  );
}
