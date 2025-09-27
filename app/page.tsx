"use client";

import { useEffect, useState } from "react";
import Carousel from "@/components/carousel";
import Facilities from "@/components/ui/facilities";
import Feedback from "@/components/ui/feedback";
import Welcometo from "@/components/ui/welcometo";
import Whyshemford from "@/components/ui/whyshemford";
import { Divider } from "@heroui/divider";
import HolidayRibbon from "@/components/notificationribbon";

interface Holiday {
  title: string;
  date?: string;
  start?: string;
  end?: string;
  reopen?: string;
}

export default function Home() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await fetch("/api/calendar");
        if (!res.ok) throw new Error("Failed to fetch calendar");
        const data = await res.json();
        setHolidays(data);
      } catch (err) {
        console.error("Error fetching holidays:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  const images: string[] = [
    "/assets/banner1.jpg",
    "/assets/banner2.jpg",
    "/assets/banner3.jpg",
    "/assets/banner4.jpg",
    "/assets/banner5.jpg",
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-10">
      <div className="inline-block text-center justify-center">
        {/* Holiday Ribbon */}
        {!loading && <HolidayRibbon holidays={holidays} />}

        {/* Banner Carousel */}
        <Carousel images={images} className="rounded-md h-fit" />

        {/* Other Sections */}
        <Welcometo />
        <Divider orientation="horizontal" className="my-1" />
        <Facilities />
        <Divider orientation="horizontal" className="my-1" />
        <Whyshemford />
        <Divider orientation="horizontal" className="my-1" />
        <Feedback />
      </div>
    </section>
  );
}
