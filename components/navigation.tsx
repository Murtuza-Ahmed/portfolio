"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu,
  Code2,
  User,
  Briefcase,
  FileText,
  Mail,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FALLBACK_SITE_NAME = "Murtuza Ahmed";

const navigation = [
  { name: "Home", href: "/", icon: Code2 },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Resume", href: "/resume", icon: FileText },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [siteName, setSiteName] = useState(FALLBACK_SITE_NAME);
  const pathname = usePathname();

  // Brand name comes from site settings so the admin can change it.
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/public/settings");
        const data = await res.json();
        const name = data?.data?.siteName;
        if (typeof name === "string" && name.trim()) {
          setSiteName(name.trim());
        }
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forge-line bg-white/85 backdrop-blur-xl dark:bg-[#050505]/85 supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[#050505]/70">
      <div className="lg:justify-between lg:min-w-full container flex h-16 items-center justify-evenly px-4">
        <Link href="/" className="group flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-[120deg] from-[#8a5c09] to-[#ce830b] text-[#140e04] shadow-[0_4px_18px_-2px_rgba(255,178,56,0.55)] transition-shadow group-hover:shadow-[0_4px_26px_-2px_rgba(255,178,56,0.8)]">
            <Code2 className="h-4 w-4" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            {siteName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden left-4 lg:max-w-full md:flex lg:justify-center items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors",
                pathname === item.href
                  ? "text-forge-amber"
                  : "text-forge-mute hover:text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            href="/contact"
            className="forge-btn-primary hidden px-5 py-2.5 text-sm md:inline-flex"
          >
            Hire Me
          </Link>
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-forge-line bg-white dark:bg-[#0b0a07] sm:w-[400px]"
            >
              <div className="mt-8 flex flex-col space-y-2">
                <p className="px-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-forge-amber">
                  Navigate
                </p>
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 rounded-xl px-3 py-3 text-base font-medium transition-colors",
                        pathname === item.href
                          ? "bg-forge-amber/10 text-forge-amber"
                          : "text-forge-mute hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="forge-btn-primary mt-4 px-5 py-3 text-sm"
                >
                  Hire Me
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
