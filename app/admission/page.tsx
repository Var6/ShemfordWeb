import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { CheckCircle, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/button";

import { getPageContent } from "@/lib/content/server";
import { ContentIcon } from "@/lib/content/icons";

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

interface InfoCard {
  emoji: string;
  title: string;
  body: string;
  note: string;
}

interface IconItem {
  icon: string;
  title: string;
  description: string;
}

export default async function AdmissionPage() {
  const { t, list } = await getPageContent("admission");

  const quickInfo = list<InfoCard>("quickInfo");
  const classesOffered = list<{ class: string; age: string; description: string }>("classes.items");
  const whyChooseShemford = list<IconItem>("why.items");
  const admissionProcess = list<IconItem>("process.steps");
  const faqs = list<{ q: string; a: string }>("faq.items");
  const requiredDocuments = t("documents.items")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 opacity-80">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-95 font-light">
            {t("hero.subtitle")}
          </p>
          <p className="text-base opacity-85 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
            {t("hero.body")}
          </p>
        </div>
      </div>

      {/* Quick-info cards */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickInfo.map((card, i) => (
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
          {t("classes.title")}
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
            {t("why.title")}
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
                    <ContentIcon className="w-7 h-7" name={item.icon} />
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
          {t("process.title")}
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {admissionProcess.map((item, idx) => (
            <div key={idx} className="relative group">
              <div
                className="bg-white dark:bg-gray-800 border-2 border-orange-100 dark:border-orange-900/40 rounded-2xl p-6 h-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ perspective: "800px" }}
              >
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold mb-4 shadow group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <div className="text-orange-500 mb-3">
                  <ContentIcon className="w-7 h-7" name={item.icon} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              {idx < admissionProcess.length - 1 && (
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
          {t("documents.title")}
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
          formType="admission"
          subtitle={t("form.subtitle")}
          title={t("form.title")}
        />
      </div>

      {/* FAQ */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-4xl font-bold text-center mb-3 text-gray-900 dark:text-white">
          {t("faq.title")}
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
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
          <h2 className="text-4xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl mb-10 opacity-90 font-light whitespace-pre-line">
            {t("cta.body")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={t("cta.primaryHref") || "/contact"}>
              <Button
                size="lg"
                className="bg-white text-orange-600 font-bold hover:bg-orange-50 shadow-lg"
              >
                {t("cta.primaryLabel")}
              </Button>
            </Link>
            <Link href={t("cta.secondaryHref") || "/about"}>
              <Button
                size="lg"
                variant="bordered"
                className="border-white text-white hover:bg-white/10"
              >
                {t("cta.secondaryLabel")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
