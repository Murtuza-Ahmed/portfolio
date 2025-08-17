import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Murtuza-Ahmed",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/murtuza-ahmed-36012628b/",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://x.com/MurtuzaAhm87472",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:murtuza.programmer@gmail.com",
    icon: Mail,
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">© 2024 Murtuza Ahmed. All rights reserved.</p>
          </div>

          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="mx-1 h-4 w-4 text-red-500" />
          <span>using Next.js & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}
