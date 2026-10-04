"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  Twitter,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import {
  ForgeReveal,
  ForgeEyebrow,
  ForgeSectionHeader,
} from "@/components/forge";

const FALLBACK_EMAIL = "murtuza.programmer@gmail.com";
const FALLBACK_SOCIALS = {
  github: "https://github.com/Murtuza-Ahmed",
  linkedin: "https://www.linkedin.com/in/murtuza-ahmed-36012628b/",
  twitter: "https://x.com/MurtuzaAhm87472",
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const LABEL_CLASS =
  "font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-forge-mute";
const ERROR_TEXT_CLASS =
  "flex items-center gap-1 text-sm text-red-400";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactEmail, setContactEmail] = useState(FALLBACK_EMAIL);
  const [socials, setSocials] = useState(FALLBACK_SOCIALS);
  const { toast } = useToast();

  // Pull the public contact email + social links from site settings so the
  // admin can change them without a code deploy. Falls back to hardcoded
  // values when settings are missing.
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/public/settings");
        const data = await res.json();
        const s = data?.data;
        if (!s) return;
        if (typeof s.contactEmail === "string" && s.contactEmail.trim()) {
          setContactEmail(s.contactEmail.trim());
        }
        if (s.socialLinks && typeof s.socialLinks === "object") {
          setSocials({
            github: s.socialLinks.github?.trim() || FALLBACK_SOCIALS.github,
            linkedin:
              s.socialLinks.linkedin?.trim() || FALLBACK_SOCIALS.linkedin,
            twitter: s.socialLinks.twitter?.trim() || FALLBACK_SOCIALS.twitter,
          });
        }
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: contactEmail,
      href: `mailto:${contactEmail}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 (312) 291-3097",
      href: "tel:+923122913097",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "60A, Sector 11 Block L Orangi Town, Karachi, Pakistan",
      href: "https://www.google.com/maps/place/Imam+colony,+60A,+Sector+11+Block+L+Orangi+Town,+Karachi,+Pakistan/@24.9499761,66.982071,17z/data=!4m15!1m8!3m7!1s0x3eb36abc40a8e1d9:0x28a0cee7282ded96!2sImam+colony,+60A,+Sector+11+Block+L+Orangi+Town,+Karachi,+Pakistan!3b1!8m2!3d24.9501074!4d66.9824358!16s%2Fg%2F11dfh4g1c3!3m5!1s0x3eb36abc40a8e1d9:0x28a0cee7282ded96!8m2!3d24.9501074!4d66.9824358!16s%2Fg%2F11dfh4g1c3?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      href: null,
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: socials.linkedin,
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: socials.github,
      icon: Github,
    },
    {
      name: "Twitter",
      href: socials.twitter,
      icon: Twitter,
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description:
            "Thank you for your message. I'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to send message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="forge-hero-glow" aria-hidden="true" />
        <div className="forge-section text-center">
          <ForgeReveal>
            <ForgeEyebrow centered>Contact</ForgeEyebrow>
            <h1 className="forge-h1 mt-4">Get In Touch</h1>
            <p className="forge-lead forge-lead-center mt-6">
              I'm always excited to discuss new projects, creative ideas, or
              opportunities to be part of your vision. Let's create something
              amazing together!
            </p>
          </ForgeReveal>
        </div>
      </section>

      {/* Form + info grid */}
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 pb-20 md:pb-28">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <ForgeReveal delay={100}>
            <div className="forge-card p-8">
              <h3 className="forge-h3 mb-8">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className={LABEL_CLASS}>
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className={`forge-field ${errors.name ? "border-red-400" : ""}`}
                    />
                    {errors.name && (
                      <p className={ERROR_TEXT_CLASS}>
                        <AlertCircle className="h-4 w-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className={LABEL_CLASS}>
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`forge-field ${errors.email ? "border-red-400" : ""}`}
                    />
                    {errors.email && (
                      <p className={ERROR_TEXT_CLASS}>
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className={LABEL_CLASS}>
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className={`forge-field ${errors.subject ? "border-red-400" : ""}`}
                  />
                  {errors.subject && (
                    <p className={ERROR_TEXT_CLASS}>
                      <AlertCircle className="h-4 w-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className={LABEL_CLASS}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, ideas, or just say hello!"
                    rows={6}
                    className={`forge-field min-h-[140px] ${errors.message ? "border-red-400" : ""}`}
                  />
                  {errors.message && (
                    <p className={ERROR_TEXT_CLASS}>
                      <AlertCircle className="h-4 w-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="forge-btn-primary w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#140e04] mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </ForgeReveal>

          {/* Contact Information + socials + collaborate */}
          <div className="space-y-8">
            <ForgeReveal delay={200}>
              <div className="forge-card p-8">
                <h3 className="forge-h3 mb-6">Contact Information</h3>
                <div className="space-y-2">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    const row = (
                      <div className="flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/[0.03]">
                        <div className="forge-icon-badge-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{info.label}</p>
                          <p className="text-sm text-muted-foreground break-all">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    );

                    return info.href ? (
                      <Link
                        key={info.label}
                        href={info.href}
                        target={
                          info.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          info.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {row}
                      </Link>
                    ) : (
                      <div key={info.label}>{row}</div>
                    );
                  })}
                </div>
              </div>
            </ForgeReveal>

            <ForgeReveal delay={300}>
              <div className="forge-card p-8">
                <h3 className="forge-h3 mb-6">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="forge-icon-badge-sm"
                        aria-label={social.name}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{social.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </ForgeReveal>

            <ForgeReveal delay={400}>
              <div className="forge-card p-8">
                <h3 className="forge-h3 mb-6">Let's Collaborate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always interested in new opportunities, whether it's a
                  full-time position, freelance project, or just a chat about
                  technology and development.
                </p>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-forge-amber" />
                    <span className="text-sm">
                      Available for freelance projects
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-forge-amber" />
                    <span className="text-sm">
                      Open to full-time opportunities
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-forge-amber" />
                    <span className="text-sm">Available for consulting</span>
                  </div>
                </div>
              </div>
            </ForgeReveal>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="forge-section pt-0">
        <ForgeSectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          lead="Here are some common questions I get asked about working together."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <ForgeReveal delay={0}>
            <div className="forge-card forge-card-hover p-6">
              <h3 className="font-display text-lg font-bold">
                What's your typical response time?
              </h3>
              <p className="text-muted-foreground mt-3">
                I aim to respond to all inquiries within 24 hours, usually much
                sooner. For urgent matters, feel free to mention it in your
                message.
              </p>
            </div>
          </ForgeReveal>

          <ForgeReveal delay={100}>
            <div className="forge-card forge-card-hover p-6">
              <h3 className="font-display text-lg font-bold">
                Do you work with international clients?
              </h3>
              <p className="text-muted-foreground mt-3">
                I've worked with clients from around the world and am
                comfortable with different time zones and communication styles.
              </p>
            </div>
          </ForgeReveal>

          <ForgeReveal delay={200}>
            <div className="forge-card forge-card-hover p-6">
              <h3 className="font-display text-lg font-bold">
                What's your preferred project size?
              </h3>
              <p className="text-muted-foreground mt-3">
                I enjoy both small focused projects and large-scale
                applications. Whether it's a landing page or a complex web
                application, I'm interested!
              </p>
            </div>
          </ForgeReveal>

          <ForgeReveal delay={300}>
            <div className="forge-card forge-card-hover p-6">
              <h3 className="font-display text-lg font-bold">
                Do you provide ongoing maintenance?
              </h3>
              <p className="text-muted-foreground mt-3">
                Yes, I offer maintenance and support packages for projects I've
                built. I believe in long-term partnerships with my clients.
              </p>
            </div>
          </ForgeReveal>
        </div>
      </section>
    </div>
  );
}
