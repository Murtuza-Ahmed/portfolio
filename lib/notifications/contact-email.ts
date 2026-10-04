import { Resend } from "resend"
import connectDB from "@/lib/database/connection"
import Settings from "@/models/Settings"
import User from "@/models/User"

export interface ContactNotificationPayload {
  name: string
  email: string
  subject: string
  message: string
}

// Sender address. Resend's shared onboarding domain works for testing; for
// production the owner should verify their own domain in Resend and set
// CONTACT_FROM_EMAIL to an address on it.
function getFromEmail(): string {
  return process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"
}

// Resolve who should receive the notification:
// CONTACT_TO_EMAIL env → Settings.contactEmail → first admin user's email.
// Returns null when notifications are disabled or no recipient can be found.
async function resolveRecipient(): Promise<string | null> {
  if (process.env.CONTACT_TO_EMAIL) {
    return process.env.CONTACT_TO_EMAIL
  }

  await connectDB()

  const settings = await Settings.findOne().lean()
  if (settings) {
    if (settings.emailNotifications === false) {
      return null
    }
    if (settings.contactEmail) {
      return settings.contactEmail
    }
  }

  const admin = await User.findOne({ role: "admin" }).select("email").lean()
  return admin?.email ?? null
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/**
 * Send an email notification about a new contact-form message.
 * Never throws: skips silently when RESEND_API_KEY is not set and logs
 * (but swallows) any sending errors, so contact submissions always succeed.
 */
export async function sendContactNotification(payload: ContactNotificationPayload): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return
    }

    const to = await resolveRecipient()
    if (!to) {
      return
    }

    const resend = new Resend(apiKey)

    const textBody = [
      "You received a new message from your portfolio contact form:",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      "",
      payload.message,
    ].join("\n")

    const htmlBody = `
      <h2>New contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}<br/>
      <strong>Email:</strong> ${escapeHtml(payload.email)}<br/>
      <strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
    `

    await resend.emails.send({
      from: getFromEmail(),
      to,
      replyTo: payload.email,
      subject: `New contact message: ${payload.subject}`,
      text: textBody,
      html: htmlBody,
    })
  } catch (error) {
    console.error("Failed to send contact notification email:", error)
  }
}
