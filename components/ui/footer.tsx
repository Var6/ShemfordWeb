"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

import { Facebook, Instagram, Twitter, Youtube } from "@/components/icons/social";

import { usePageContent } from "@/lib/content/client";

interface NavLink {
  label: string;
  href: string;
}

export default function Footer() {
  const { t, list } = usePageContent("site");

  const quickLinks = list<NavLink>("footerQuickLinks");
  const academicLinks = list<NavLink>("footerAcademicLinks");
  const bottomLinks = list<NavLink>("footerBottomLinks");

  const socialLinks = [
    { label: "Facebook", href: t("facebook"), Icon: Facebook },
    { label: "Instagram", href: t("instagram"), Icon: Instagram },
    { label: "YouTube", href: t("youtube"), Icon: Youtube },
    { label: "Twitter", href: t("twitter"), Icon: Twitter },
  ].filter((s) => s.href);

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── School info ── */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image src={t("logo") || "/icon.png"} alt={t("shortName")} width={44} height={44} />
              <div>
                <p className="font-bold text-white text-lg leading-tight">{t("shortName")}</p>
                <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
                  {t("tagline")}
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-sm whitespace-pre-line">
              {t("footerBlurb")}
            </p>

            <div className="space-y-2.5 mb-6">
              {t("address") && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>{t("address")}</span>
                </div>
              )}
              {t("phone") && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-orange-500 shrink-0" />
                  <a
                    href={`tel:${t("phoneHref") || t("phone")}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {t("phone")}
                  </a>
                </div>
              )}
              {t("email") && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                  <a href={`mailto:${t("email")}`} className="hover:text-orange-400 transition-colors">
                    {t("email")}
                  </a>
                </div>
              )}
              {t("admissionsEmail") && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                  <a
                    href={`mailto:${t("admissionsEmail")}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {t("admissionsEmail")}
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800
                    hover:bg-orange-600 text-gray-400 hover:text-white transition-colors"
                >
                  <s.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t("footerQuickLinksTitle")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href || "/"}
                    className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Academics ── */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t("footerAcademicsTitle")}
            </h3>
            <ul className="space-y-2.5">
              {academicLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href || "/"}
                    className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Map ── */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t("footerMapTitle")}
            </h3>
            {t("mapEmbed") && (
              <div className="rounded-xl overflow-hidden h-44">
                <iframe
                  className="w-full h-full"
                  src={t("mapEmbed")}
                  loading="lazy"
                  title={`${t("name")} location`}
                />
              </div>
            )}
            {t("mapLink") && (
              <a
                href={t("mapLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm text-orange-400
                  hover:text-orange-300 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                {t("footerDirectionsLabel")}
              </a>
            )}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row
          items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {t("footerCopyright")}</p>
          <div className="flex items-center gap-5">
            {bottomLinks.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href || "/"}
                className="hover:text-orange-400 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
