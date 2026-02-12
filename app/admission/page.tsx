import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { CheckCircle, FileText, Users, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Admissions - Shemford Futuristic School",
  description:
    "Apply for admission to Shemford Futuristic School. Learn about the admission process, eligibility criteria, and required documents. Admissions open for Pre-Primary to Class 12.",
  keywords: [
    "school admission",
    "admission process",
    "eligible criteria",
    "admission form",
    "Shemford school",
  ],
  openGraph: {
    title: "Admissions - Shemford Futuristic School",
    description: "Simple and transparent admission process",
    url: "https://shemford.edu/admission",
    type: "website",
  },
};

const admissionProcess = [
  {
    step: 1,
    title: "Application",
    description: "Fill out the online admission form with all required details",
    icon: <FileText className="w-8 h-8" />,
  },
  {
    step: 2,
    title: "Assessment",
    description: "Participate in the entrance examination and interview",
    icon: <Users className="w-8 h-8" />,
  },
  {
    step: 3,
    title: "Selection",
    description: "Merit-based selection announced within 7 days",
    icon: <CheckCircle className="w-8 h-8" />,
  },
  {
    step: 4,
    title: "Enrollment",
    description: "Complete registration and begin your educational journey",
    icon: <Calendar className="w-8 h-8" />,
  },
];

const requiredDocuments = [
  "Birth Certificate",
  "Recent Passport-size Photograph",
  "Immunization Certificate",
  "Previous School Transfer Certificate",
  "Proof of Address (Utility Bill)",
  "Parent/Guardian ID Proof",
];

export default function AdmissionPage() {
  return (
    <div className="min-h-screen py-10">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Join Shemford Futuristic School
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Admissions Open for Pre-Primary to Class 12
          </p>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Admission Period</h3>
              <p className="text-gray-600 dark:text-gray-400">
                January to March (Regular)
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Age Criteria</h3>
              <p className="text-gray-600 dark:text-gray-400">
                As per CBSE guidelines
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Processing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Results in 7 days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Admission Process */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Admission Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {admissionProcess.map((item) => (
            <div key={item.step} className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-shadow">
              <div className="gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-100 p-3 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Step {item.step}: {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Required Documents */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Required Documents
        </h2>
        <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm
        title="Start Your Admission Process"
        subtitle="Fill out the form below and our admission team will get in touch with you"
        formType="admission"
      />

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="gap-2">
              <h3 className="font-semibold">When do admissions open?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Admissions are open from January to March every year, with limited
                seats available in other months.
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="gap-2">
              <h3 className="font-semibold">What is the application fee?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please contact our admission office for current application fee
                details.
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="gap-2">
              <h3 className="font-semibold">Is there a transfer case policy?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we accept transfer cases based on merit and available seats.
                Please contact us for details.
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="gap-2">
              <h3 className="font-semibold">Are scholarships available?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, merit-based scholarships are available for deserving
                students. Eligibility criteria apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
