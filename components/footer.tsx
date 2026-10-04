"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const FALLBACK_NAME = "Murtuza Ahmed";
const FALLBACK_SOCIALS = {
  github: "https://github.com/Murtuza-Ahmed",
  linkedin: "https://www.linkedin.com/in/murtuza-ahmed-36012628b/",
  twitter: "https://x.com/MurtuzaAhm87472",
  email: "murtuza.programmer@gmail.com",
};

export function Footer() {
  const [siteName, setSiteName] = useState(FALLBACK_NAME);
  const [socials, setSocials] = useState(FALLBACK_SOCIALS);

  // Social links + brand come from site settings so the admin can change
  // them without a code deploy. Hardcoded fallbacks keep the footer working
  // when settings are missing.
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/public/settings");
        const data = await res.json();
        const s = data?.data;
        if (!s) return;
        if (typeof s.siteName === "string" && s.siteName.trim()) {
          setSiteName(s.siteName.trim());
        }
        if (typeof s.contactEmail === "string" && s.contactEmail.trim()) {
          setSocials((prev) => ({ ...prev, email: s.contactEmail.trim() }));
        }
        if (s.socialLinks && typeof s.socialLinks === "object") {
          setSocials((prev) => ({
            ...prev,
            github: s.socialLinks.github?.trim() || prev.github,
            linkedin: s.socialLinks.linkedin?.trim() || prev.linkedin,
            twitter: s.socialLinks.twitter?.trim() || prev.twitter,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const socialLinks = [
    { name: "GitHub", href: socials.github, icon: Github },
    { name: "LinkedIn", href: socials.linkedin, icon: Linkedin },
    { name: "Twitter", href: socials.twitter, icon: Twitter },
    { name: "Email", href: `mailto:${socials.email}`, icon: Mail },
  ];

  return (
    <footer className="lg:justify-evenly lg:min-w-full border-t border-forge-line bg-white dark:bg-[#050505]">
      <div className="container lg:max-w-full px-4 py-10">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-[120deg] from-[#8a5c09] to-[#ce830b] text-[#140e04]">
              <span className="font-display text-sm font-bold">
                {siteName.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-forge-mute">
              © {new Date().getFullYear()} {siteName}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forge-line text-forge-mute transition-all hover:-translate-y-0.5 hover:border-forge-amber/50 hover:text-forge-amber hover:shadow-[0_0_20px_-4px_rgba(255,178,56,0.5)]"
                  aria-label={link.name}
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <hr className="forge-divider my-6" />

        <div className="flex items-center justify-center font-mono text-[0.65rem] uppercase tracking-[0.24em] text-forge-mute">
          <span>Forged with</span>
          <Heart className="mx-2 h-3.5 w-3.5 text-forge-amber" />
          <span>Next.js · Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
