import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Admission Inquiry",
  description:
    "Get in touch with Shemford Futuristic School in Jaganpur, Patna, Bihar. Inquire about admissions, facilities, and programs.",
  keywords:
    "contact school, admission inquiry, Shemford school Patna, Jaganpur",
  openGraph: {
    title: "Contact Shemford Futuristic School",
    description: "Inquire about admissions and school programs",
    url: "https://shemford.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-10">
      <ContactForm
        title="Get In Touch"
        subtitle="Have questions about admissions? Reach out to us!"
      />
    </div>
  );
}
