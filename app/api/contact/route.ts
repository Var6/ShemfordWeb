import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure your email service (using environment variables)
// You can use Gmail, SendGrid, or any other SMTP service

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_name, user_email, user_phone, subject, message, student_class } = body;

    // Validate required fields
    if (!user_name || !user_email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // If using EmailJS, just return success (EmailJS handles sending on client side)
    // If you want server-side email, configure nodemailer below

    // Example with environment-based email sending
    if (process.env.MAIL_SERVICE === "NODEMAILER") {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || "587"),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      // Send email to school
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO_ADMIN,
        subject: `New ${subject} from ${user_name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${user_name}</p>
          <p><strong>Email:</strong> ${user_email}</p>
          <p><strong>Phone:</strong> ${user_phone || "Not provided"}</p>
          ${student_class ? `<p><strong>Class:</strong> ${student_class}</p>` : ""}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      // Send confirmation email to user
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: user_email,
        subject: "We received your message - Shemford Futuristic School",
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Dear ${user_name},</p>
          <p>We have received your message and will get back to you within 24 business hours.</p>
          <p>If this is urgent, please call us directly at the contact number on our website.</p>
          <p>Best regards,<br>Shemford Futuristic School Team</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
