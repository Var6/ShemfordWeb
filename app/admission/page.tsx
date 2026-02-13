import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { CheckCircle, FileText, Users, Calendar, Award, BookOpen, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/button";

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

const classesOffered = [
  {
    class: "Pre-Primary",
    age: "2-3 years",
    description: "Interactive learning through play-based activities"
  },
  {
    class: "Primary (Classes 1-5)",
    age: "5-10 years",
    description: "Foundation building with STEM focus"
  },
  {
    class: "Secondary (Classes 6-8)",
    age: "11-13 years",
    description: "Subject specialization and skill development"
  },
  {
    class: "Senior Secondary (Classes 9-12)",
    age: "14-17 years",
    description: "Board exam preparation and career guidance"
  },
];

const whyChooseShemford = [
  {
    title: "World-Class Facilities",
    description: "Modern classrooms, laboratories, sports facilities, and technology centers",
    icon: <Award className="w-8 h-8" />
  },
  {
    title: "Experienced Faculty",
    description: "Highly qualified teachers with international exposure and training",
    icon: <Users className="w-8 h-8" />
  },
  {
    title: "Holistic Education",
    description: "Academic excellence combined with sports, arts, and personality development",
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    title: "Global Perspective",
    description: "Optional international programs and exchange opportunities",
    icon: <Target className="w-8 h-8" />
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
    <div className="min-h-screen">
      {/* Hero Section with Orange Gradient */}
      <div className="w-full bg-gradient-to-r from-orange-300 to-orange-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to Shemford
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-95">
            Begin Your Journey to Excellence
          </p>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            We believe in nurturing future leaders through innovative education, 
            world-class facilities, and personalized learning experiences.
          </p>
        </div>
      </div>

      {/* Key Information Cards */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-2">📅 Admission Period</h3>
            <p className="text-gray-700 dark:text-gray-300">
              January to March (Regular)<br/>
              <span className="text-sm">Limited seats available throughout the year</span>
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-2">👶 Age Criteria</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Pre-Primary: 2+ years<br/>
              <span className="text-sm">As per CBSE guidelines for other classes</span>
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-2">⏱️ Processing Time</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Results within 7 days<br/>
              <span className="text-sm">Quick admission confirmation process</span>
            </p>
          </div>
        </div>
      </div>

      {/* Classes Offered */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Classes We Offer
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-24 h-1 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classesOffered.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-orange-300 to-orange-600 text-white p-3 rounded-lg flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">{item.class}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Age: {item.age}</p>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Shemford */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-12 my-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Why Choose Shemford?
          </h2>
          <div className="flex justify-center mb-12">
            <div className="w-24 h-1 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseShemford.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-orange-500 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admission Process */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Simple 4-Step Process
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-24 h-1 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {admissionProcess.map((item) => (
            <div key={item.step} className="relative">
              <div className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-6 h-full shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-br from-orange-300 to-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 flex-shrink-0">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
              {item.step < 4 && (
                <div className="hidden lg:block absolute top-1/3 -right-3 text-orange-400 text-2xl">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Required Documents */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Required Documents
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-24 h-1 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full"></div>
        </div>
        <div className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-8 shadow-md">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-orange-300 to-orange-600 rounded-full p-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-12">
        <ContactForm
          title="Start Your Admission Process"
          subtitle="Fill out the form below and our admission team will get in touch with you"
          formType="admission"
        />
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-24 h-1 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full"></div>
        </div>
        <div className="space-y-4">
          <details className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow group">
            <summary className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-orange-600 dark:text-orange-400 text-xl group-open:rotate-180 transition-transform">+</span>
              When do admissions open?
            </summary>
            <p className="text-gray-600 dark:text-gray-300 mt-4 ml-8">
              Admissions are open from January to March every year, with limited
              seats available in other months. You can apply throughout the year based on availability.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow group">
            <summary className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-orange-600 dark:text-orange-400 text-xl group-open:rotate-180 transition-transform">+</span>
              What is the application fee?
            </summary>
            <p className="text-gray-600 dark:text-gray-300 mt-4 ml-8">
              Please contact our admission office for current application fee
              details. We offer flexible payment plans for deserving families.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow group">
            <summary className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-orange-600 dark:text-orange-400 text-xl group-open:rotate-180 transition-transform">+</span>
              Is there a transfer case policy?
            </summary>
            <p className="text-gray-600 dark:text-gray-300 mt-4 ml-8">
              Yes, we accept transfer cases based on merit and available seats in the respective class.
              Please contact us for details and documentation requirements.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow group">
            <summary className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-orange-600 dark:text-orange-400 text-xl group-open:rotate-180 transition-transform">+</span>
              Are scholarships available?
            </summary>
            <p className="text-gray-600 dark:text-gray-300 mt-4 ml-8">
              Yes, merit-based scholarships and financial aid are available for deserving
              students. Please inquire at our admission office for eligibility criteria and application process.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow group">
            <summary className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-orange-600 dark:text-orange-400 text-xl group-open:rotate-180 transition-transform">+</span>
              What makes Shemford different?
            </summary>
            <p className="text-gray-600 dark:text-gray-300 mt-4 ml-8">
              Shemford combines futuristic education with traditional values. We focus on personalized learning,
              global exposure, and holistic development. Our faculty is internationally trained, and we maintain
              a student-centric approach with modern facilities and innovative teaching methodologies.
            </p>
          </details>
        </div>
      </div>

      {/* Final CTA */}
      <div className="w-full bg-gradient-to-r from-orange-300 to-orange-600 text-white py-16 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Join thousands of students who are already experiencing excellence at Shemford
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block">
              <Button size="lg" className="bg-white text-orange-600 font-bold hover:bg-gray-100">
                Apply Now
              </Button>
            </Link>
            <Link href="/about" className="inline-block">
              <Button size="lg" variant="bordered" className="border-white text-white hover:bg-white hover:text-orange-600">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
