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
    "school admission Patna",
    "CBSE school admission Bihar",
    "Shemford admission",
    "best school admission Patna",
  ],
  openGraph: {
    title: "Admissions - Shemford Futuristic School",
    description: "Transparent, merit-based admissions for all classes",
    url: "https://shemfordpatna.com/admission",
    type: "website",
  },
};

const admissionProcess = [
  {
    step: 1,
    title: "Submit Application",
    description:
      "Complete the online form with accurate details about your child and family. Our team reviews every application personally.",
    icon: <FileText className="w-7 h-7" />,
  },
  {
    step: 2,
    title: "Assessment & Interaction",
    description:
      "An age-appropriate interaction session and brief academic assessment help us understand each child's strengths and learning style.",
    icon: <Users className="w-7 h-7" />,
  },
  {
    step: 3,
    title: "Merit-Based Selection",
    description:
      "Results are communicated within 7 working days. Selection is transparent, fair, and based on merit and seat availability.",
    icon: <CheckCircle className="w-7 h-7" />,
  },
  {
    step: 4,
    title: "Enrolment & Onboarding",
    description:
      "Complete the joining formalities, collect your welcome kit, and prepare for an extraordinary academic journey.",
    icon: <Calendar className="w-7 h-7" />,
  },
];

const classesOffered = [
  {
    class: "Pre-Primary (Nursery – KG)",
    age: "2½ – 5 years",
    description:
      "A play-centred environment that builds language, motor skills, and social confidence through structured exploration.",
  },
  {
    class: "Primary (Classes I – V)",
    age: "5 – 11 years",
    description:
      "Strong conceptual foundations in literacy, numeracy, sciences, and the arts — with emphasis on curiosity over rote learning.",
  },
  {
    class: "Secondary (Classes VI – VIII)",
    age: "11 – 14 years",
    description:
      "Subject specialisation deepens alongside personality development, leadership opportunities, and the ShemEduMAX™ enrichment tracks.",
  },
  {
    class: "Senior Secondary (Classes IX – XII)",
    age: "14 – 18 years",
    description:
      "Rigorous CBSE board preparation, IIT-JEE / NEET integrated foundation, and dedicated career counselling for every stream.",
  },
];

const whyChooseShemford = [
  {
    title: "World-Class Infrastructure",
    description:
      "Smart classrooms, four specialised laboratories, a 1,000+ volume library, and a multi-sport campus — every space is purpose-built for learning.",
    icon: <Award className="w-7 h-7" />,
  },
  {
    title: "Expert, Caring Faculty",
    description:
      "Highly qualified educators with progressive training who treat every child as an individual, not a roll number.",
    icon: <Users className="w-7 h-7" />,
  },
  {
    title: "Holistic Development",
    description:
      "Academics, sports, performing arts, coding, and community service — because a well-rounded education produces well-rounded human beings.",
    icon: <Sparkles className="w-7 h-7" />,
  },
  {
    title: "Future-Focused Curriculum",
    description:
      "The ShemEduMAX™ system integrates 21st-century skills — critical thinking, digital fluency, and global awareness — into every subject.",
    icon: <Target className="w-7 h-7" />,
  },
];

const requiredDocuments = [
  "Original Birth Certificate",
  "Recent Passport-size Photographs (4 copies)",
  "Immunisation / Vaccination Certificate",
  "Previous School Transfer Certificate (if applicable)",
  "Proof of Residence (utility bill or rental agreement)",
  "Parent / Guardian Government-issued ID Proof",
];

export default function AdmissionPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 opacity-80">
            Academic Year 2025 – 26 · Admissions Open
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Begin an Extraordinary Journey
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-95 font-light">
            Where every child is seen, inspired, and empowered.
          </p>
          <p className="text-base opacity-85 max-w-2xl mx-auto leading-relaxed">
            Shemford Futuristic School offers a transformative education rooted
            in the CBSE framework and elevated by the ShemEduMAX™ system —
            nurturing future leaders from Pre-Primary through Class XII.
          </p>
        </div>
      </div>

      {/* Quick-info cards */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              emoji: "📅",
              title: "Admission Season",
              body: "January – March (priority window)",
              note: "Limited seats available year-round",
            },
            {
              emoji: "👶",
              title: "Age Eligibility",
              body: "Pre-Primary: 2½+ years",
              note: "CBSE age norms apply for all other classes",
            },
            {
              emoji: "⚡",
              title: "Decision Timeline",
              body: "Results within 7 working days",
              note: "Swift, transparent, and merit-based",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-l-4 border-orange-500 rounded-2xl p-7 shadow-md
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ perspective: "800px" }}
            >
              <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-2">
                {card.emoji} {card.title}
              </h3>
              <p className="text-gray-800 dark:text-gray-200 font-medium">{card.body}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{card.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Classes Offered */}
      <div className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-4xl font-bold text-center mb-3 text-gray-900 dark:text-white">
          Classes We Offer
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classesOffered.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 border-2 border-orange-100 dark:border-orange-900/40 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              style={{ perspective: "800px" }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-3 rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    {item.class}
                  </h3>
                  <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                    Age: {item.age}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Shemford */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 py-14 my-4">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-3 text-gray-900 dark:text-white">
            Why Shemford?
          </h2>
          <div className="flex justify-center mb-12">
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseShemford.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                style={{ perspective: "800px" }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admission Process */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-4xl font-bold text-center mb-3 text-gray-900 dark:text-white">
          Our 4-Step Admission Process
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {admissionProcess.map((item) => (
            <div key={item.step} className="relative group">
              <div
                className="bg-white dark:bg-gray-800 border-2 border-orange-100 dark:border-orange-900/40 rounded-2xl p-6 h-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ perspective: "800px" }}
              >
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold mb-4 shadow group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="text-orange-500 mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              {item.step < 4 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 text-orange-400 text-2xl z-10 items-center">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Required Documents */}
      <div className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-4xl font-bold text-center mb-3 text-gray-900 dark:text-white">
          Documents Required
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
        </div>
        <div className="bg-white dark:bg-gray-800 border-2 border-orange-100 dark:border-orange-900/40 rounded-2xl p-8 shadow-md">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full p-1.5 flex-shrink-0 shadow">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                  {doc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-12">
        <ContactForm
          title="Start Your Admission Process"
          subtitle="Fill out the form and our admissions team will reach out within 24 hours."
          formType="admission"
        />
      </div>

      {/* FAQ */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-4xl font-bold text-center mb-3 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
        </div>
        <div className="space-y-4">
          {[
            {
              q: "When do admissions open?",
              a: "The priority admission window runs from January to March each year. Applications outside this period are reviewed based on seat availability — so early enquiry is always recommended.",
            },
            {
              q: "What is the application and tuition fee structure?",
              a: "We believe in transparency. Please contact our admissions office for the current fee schedule. We also offer flexible payment plans and merit-based financial assistance for deserving families.",
            },
            {
              q: "Do you accept mid-year transfer admissions?",
              a: "Yes. Transfer cases are considered throughout the year subject to seat availability in the respective class. Please contact us with your child's most recent academic records to initiate the process.",
            },
            {
              q: "Are merit scholarships available?",
              a: "Absolutely. We offer merit-based scholarships for academically outstanding students and need-based assistance for families facing financial constraints. Speak to our admissions counsellor for eligibility details.",
            },
            {
              q: "What makes Shemford different from other CBSE schools?",
              a: "Beyond the curriculum, it is our philosophy. The ShemEduMAX™ system, a student-to-teacher ratio that allows personal attention, integrated IIT/NEET preparation, and a campus culture that values both excellence and empathy — these set Shemford apart.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="bg-white dark:bg-gray-800 border-2 border-orange-100 dark:border-orange-900/40 rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow group"
            >
              <summary className="font-semibold text-base text-gray-900 dark:text-white flex items-center gap-3 list-none">
                <span className="text-orange-500 text-xl font-bold group-open:rotate-45 transition-transform inline-block">+</span>
                {faq.q}
              </summary>
              <p className="text-gray-600 dark:text-gray-300 mt-4 ml-7 text-sm leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-xl mb-10 opacity-90 font-light">
            Join hundreds of families who have chosen Shemford as the foundation
            of their child's future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-orange-600 font-bold hover:bg-orange-50 shadow-lg"
              >
                Apply Now
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="bordered"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
