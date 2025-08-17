import { type NextRequest, NextResponse } from "next/server"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Here you would typically integrate with an email service
    // For example, using Resend, SendGrid, or Nodemailer

    // Example with console logging (replace with actual email service)
    console.log("New contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, you might:
    // 1. Send an email to yourself with the form data
    // 2. Send a confirmation email to the user
    // 3. Store the submission in a database
    // 4. Integrate with a CRM or notification system

    /*
    // Example with Resend (uncomment and configure when ready)
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'contact@yourdomain.com',
      to: 'john@example.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'john@example.com',
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <h2>Thanks for your message, ${name}!</h2>
        <p>I've received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>John Doe</p>
      `,
    });
    */

    return NextResponse.json(
      {
        message: "Message sent successfully",
        data: {
          name,
          email,
          subject,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
