"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Mail, MapPin, Phone, CheckCircle, AlertCircle } from "lucide-react";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  formType?: "contact" | "admission" | "inquiry";
}

export default function ContactForm({
  title = "Contact Us",
  subtitle = "Get in touch with Shemford Futuristic School",
  formType = "contact",
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Initialize EmailJS (make sure to set your public key)
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");

      // Send email with form data
      const response = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        formRef.current || "",
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );

      if (response.status === 200) {
        setSubmitted(true);
        formRef.current?.reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      setError("Failed to send message. Please try again later.");
      console.error("EmailJS error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-3">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold">Phone</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    +91 XXXX-XXXX-7X
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    admin@shemford.edu
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-sm font-semibold">Location</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Jaganpur, Patna, Bihar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="p-8">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-700 dark:text-green-300">
                  Thank you! Your message has been sent successfully. We'll get
                  back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="user_name"
                  label="Full Name"
                  placeholder="Your full name"
                  required
                  className="w-full"
                />
                <Input
                  name="user_email"
                  type="email"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  required
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="user_phone"
                  label="Phone Number"
                  placeholder="+91 XXXXXXXXXX"
                  className="w-full"
                />
                {formType !== "contact" && (
                  <Input
                    name="student_class"
                    label="Class/Grade"
                    placeholder="e.g., Class 5, Class 10"
                    className="w-full"
                  />
                )}
              </div>

              <Input
                name="subject"
                label={formType === "admission" ? "Child's Name" : "Subject"}
                placeholder={
                  formType === "admission"
                    ? "Child's full name"
                    : "What is your message about?"
                }
                required
                className="w-full"
              />

              <div className="w-full">
                <label className="text-sm font-medium mb-2 block">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
                <Button
                  type="reset"
                  variant="bordered"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold mb-2">Response Time</h3>
          <p className="text-gray-700 dark:text-gray-300">
            We typically respond to inquiries within 24 business hours. For
            urgent matters, please call us directly at the phone number above.
          </p>
        </div>
      </div>
    </div>
  );
}
