"use client";

import Image from "next/image";
import React from "react";
import AchievementsSection from "./AchivementBar";
import Link from "next/link";
import { usePageContent } from "@/lib/content/client";

const Welcometo = () => {
  const { t } = usePageContent("home");

  return (
    <div className="flex flex-col w-full md:flex-row items-center gap-12 lg:gap-16">

      {/* ── Left: Text ── */}
      <div className="flex flex-col gap-6 w-full md:w-1/2">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
            {t("welcome.eyebrow")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 leading-tight">
            {t("welcome.title")}{" "}
            <span className="text-orange-600">{t("welcome.titleHighlight")}</span>
          </h2>
          <span className="section-accent" />
        </div>

        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {t("welcome.body1")}
        </p>

        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
          {t("welcome.body2")}
        </p>

        <AchievementsSection />

        <div>
          <Link
            href={t("welcome.ctaHref") || "/about"}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700
              text-white font-semibold rounded-lg shadow-xs transition-colors text-sm"
          >
            {t("welcome.ctaLabel")}
          </Link>
        </div>
      </div>

      {/* ── Right: Image ── */}
      <div className="w-full md:w-1/2">
        <Image
          width={640}
          height={520}
          src={t("welcome.image") || "/assets/MainBG.jpg"}
          alt={t("welcome.title") || "Shemford Futuristic School campus"}
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Welcometo;
