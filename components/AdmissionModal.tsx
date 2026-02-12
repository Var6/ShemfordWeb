"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function AdmissionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Show modal only once on first page load
    const hasSeenModal = localStorage.getItem("admissionModalShown");
    if (!hasSeenModal && typeof window !== "undefined") {
      setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("admissionModalShown", "true");
      }, 1000);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error("EmailJS not configured");
      }

      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      formRef.current?.reset();
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] p-6 flex justify-between items-center rounded-t-2xl sticky top-0">
                <div>
                  <h2 className="text-2xl font-bold text-white">🎓 Admissions Open</h2>
                  <p className="text-orange-100 text-sm">Secure Your Seat at Shemford</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-orange-600 p-2 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {!submitted ? (
                  <>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      Complete a quick form and our admissions team will reach out within 24 hours with comprehensive information about our programs, facilities, and admission process.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="user_name"
                          placeholder="Parent or Guardian Name"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF705B] text-sm"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          name="user_email"
                          placeholder="Email Address"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF705B] text-sm"
                        />
                      </div>

                      <div>
                        <input
                          type="tel"
                          name="user_phone"
                          placeholder="Contact Number"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF705B] text-sm"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="student_class"
                          placeholder="Child's Age / Desired Class"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF705B] text-sm"
                        />
                      </div>

                      <textarea
                        name="message"
                        placeholder="Any questions or special requirements?"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF705B] text-sm"
                      />

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white font-semibold py-2 rounded-lg hover:from-[#FF705B] hover:to-[#FFA540] disabled:opacity-60 transition"
                      >
                        {loading ? "Submitting..." : "Request Admission Details"}
                      </button>

                      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        We'll send you our prospectus and admission guidelines
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Thank You for Your Interest!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Our admissions team will contact you soon with complete details about joining Shemford Futuristic School.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
