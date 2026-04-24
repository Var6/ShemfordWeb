"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  CheckCircle,
  AlertCircle,
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";

const categories = [
  "Academic — Teaching Quality",
  "Academic — Curriculum / Syllabus",
  "Administrative — Fee / Finance",
  "Administrative — Records / Documents",
  "Facility — Infrastructure",
  "Facility — Safety & Security",
  "Staff Conduct",
  "Bullying / Ragging",
  "Transport",
  "Other",
];

const relationships = ["Parent / Guardian", "Student", "Staff Member", "Alumni", "Other"];

const faqs = [
  {
    q: "How long will it take to resolve my grievance?",
    a: "We acknowledge all grievances within 48 hours and aim to resolve them within 7 working days. Complex matters may take up to 21 days.",
  },
  {
    q: "Is my submission confidential?",
    a: "Yes. All grievance submissions are handled with strict confidentiality. Your identity will not be disclosed without your consent.",
  },
  {
    q: "Can I submit a grievance anonymously?",
    a: "You may leave the contact fields blank; however, providing contact details allows us to follow up and resolve your concern more effectively.",
  },
  {
    q: "What happens after I submit?",
    a: "Your grievance is reviewed by the Grievance Redressal Committee. You will receive an acknowledgement by email and be informed of the outcome.",
  },
];

export default function GrievancesPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const [openFaq, setOpenFaq]     = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
      const res = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      if (res.status === 200) {
        setSubmitted(true);
        formRef.current?.reset();
        setTimeout(() => setSubmitted(false), 8000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            Shemford Futuristic School
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Grievance Redressal
          </h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto leading-relaxed">
            We are committed to a transparent, fair, and prompt resolution of
            every concern. Your feedback helps us build a better school for
            every child.
          </p>
        </div>
      </div>

      {/* ── Quick info cards ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock className="w-6 h-6 text-orange-600" />,
              title: "48-Hour Acknowledgement",
              body: "Every submission is acknowledged within two working days.",
            },
            {
              icon: <ShieldAlert className="w-6 h-6 text-orange-600" />,
              title: "Strictly Confidential",
              body: "Your identity and details are protected at every step.",
            },
            {
              icon: <CheckCircle className="w-6 h-6 text-orange-600" />,
              title: "7-Day Resolution Target",
              body: "Most grievances are resolved within 7 working days.",
            },
          ].map((c, i) => (
            <div key={i} className="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-400
              dark:border-orange-600 rounded-2xl p-6 shadow-sm">
              <div className="mb-3">{c.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{c.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600 mb-2">
            Submit a Grievance
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tell Us What's Wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Please fill in as much detail as possible so we can act quickly.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-orange-100
          dark:border-orange-900/40 shadow-lg p-8 md:p-10">

          {submitted && (
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200
              dark:border-green-800 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-800 dark:text-green-300">
                  Grievance submitted successfully.
                </p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                  You will receive an acknowledgement email within 48 hours.
                  Our Grievance Redressal Committee will review your concern promptly.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200
              dark:border-red-800 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

            <input type="hidden" name="form_type" value="Grievance Submission" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input name="user_name" label="Full Name" placeholder="Your full name" className="w-full" />
              <Input name="user_email" type="email" label="Email Address" placeholder="your.email@example.com" className="w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input name="user_phone" label="Phone Number" placeholder="+91 XXXXXXXXXX" className="w-full" />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Relationship to School
                </label>
                <select
                  name="relationship"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="">Select…</option>
                  {relationships.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input name="student_name" label="Student Name (if applicable)" placeholder="Student's full name" className="w-full" />
              <Input name="student_class" label="Class / Grade (if applicable)" placeholder="e.g., Class 7 - B" className="w-full" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Grievance Category <span className="text-red-500">*</span>
              </label>
              <select
                name="subject"
                required
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="">Select a category…</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Please describe your grievance clearly — include dates, names (if relevant), and what outcome you are seeking."
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold
                  disabled:opacity-60 shadow-md transition-colors"
              >
                {loading ? "Submitting…" : "Submit Grievance"}
              </Button>
              <Button
                type="reset"
                size="lg"
                className="sm:w-auto border-2 border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300 font-semibold
                  hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Clear Form
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Contact info strip ── */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-center">
          {[
            { icon: <Phone className="w-5 h-5" />,  label: "Call Us", value: "+91 9431201060" },
            { icon: <Mail  className="w-5 h-5" />,  label: "Email",   value: "admissions@shemfordpatna.com" },
            { icon: <MapPin className="w-5 h-5" />, label: "Visit",   value: "Jaganpur, Patna, Bihar" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-100">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-2 border-orange-100 dark:border-orange-900/40 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left
                  hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-orange-600 flex-shrink-0 transition-transform duration-200 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed
                  border-t border-orange-100 dark:border-orange-900/40 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
