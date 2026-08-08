"use client";

import Image from "next/image";
import React from "react";
import { ContainerScroll } from "@/components/scrollAnimation";
import { usePageContent } from "@/lib/content/client";

interface Pillar {
  title: string;
  desc: string;
}

const Whyshemford = () => {
  const { t, list } = usePageContent("home");
  const pillars = list<Pillar>("why.pillars");

  return (
    <div className="flex flex-col gap-16">

      {/* ── ShemEduMAX section ── */}
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">

        {/* Text */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
              {t("why.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {t("why.title")}
            </h2>
            <span className="section-accent" />
          </div>

          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {t("why.body1")}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
            {t("why.body2")}
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={t("why.image") || "/Whyus.png"}
            width={500}
            height={500}
            alt={t("why.title") || "ShemEduMAX framework"}
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </div>
      </div>

      {/* ── 3D scroll card + pillars ── */}
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">

        {/* ContainerScroll */}
        <div className="w-full md:w-1/2">
          <ContainerScroll
            titleComponent={
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center">
                {t("why.scrollTitle")}
              </h2>
            }
          >
            <Image
              src={t("why.scrollImage") || "/assets/whyshemford.jpg"}
              alt="Shemford campus life"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>

        {/* Pillars */}
        <div className="w-full md:w-1/2 grid grid-cols-1 gap-5">
          {pillars.map((p, i) => (
            <div key={i} className="flex items-start gap-3 group">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 shrink-0 group-hover:scale-150 transition-transform" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{p.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Whyshemford;
