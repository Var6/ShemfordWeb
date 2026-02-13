"use client";

import { useEffect, useState } from "react";
import { Metadata } from "next";
import Carousel from "@/components/carousel";
import Facilities from "@/components/ui/facilities";
import Feedback from "@/components/ui/feedback";
import Welcometo from "@/components/ui/welcometo";
import Whyshemford from "@/components/ui/whyshemford";
import { Divider } from "@heroui/divider";
import HolidayRibbon from "@/components/notificationribbon";
import { Button } from "@heroui/button";
import Link from "next/link";
import { CheckCircle, Users, Medal, Building2 } from "lucide-react";

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
      <div className="inline-block text-center justify-center w-full">
        {/* Holiday Ribbon */}
        {!loading && <HolidayRibbon holidays={holidays} />}

        {/* Banner Carousel */}
        <Carousel images={images} className="rounded-md h-fit w-full" />

        {/* CTA Section for Admissions */}
        <div className="w-full my-8 bg-gradient-to-r from-orange-300 to-orange-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-3">Admissions Open Now!</h2>
          <p className="text-lg mb-6">Join Shemford Futuristic School and shape your future with quality education</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 font-bold">
                Apply Now
              </Button>
            </Link>
            <Link href="/admission">
              <Button size="lg" variant="bordered" className="border-white text-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Statistics Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center gap-2 flex flex-col items-center">
              <Building2 className="w-8 h-8 mx-auto text-blue-500" />
              <h3 className="text-2xl font-bold">15+</h3>
              <p className="text-gray-600 dark:text-gray-400">Modern Facilities</p>
            </div>
          </div>
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center gap-2 flex flex-col items-center">
              <Users className="w-8 h-8 mx-auto text-green-500" />
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-gray-600 dark:text-gray-400">Active Students</p>
            </div>
          </div>
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center gap-2 flex flex-col items-center">
              <Medal className="w-8 h-8 mx-auto text-yellow-500" />
              <h3 className="text-2xl font-bold">95%</h3>
              <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
            </div>
          </div>
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center gap-2 flex flex-col items-center">
              <CheckCircle className="w-8 h-8 mx-auto text-red-500" />
              <h3 className="text-2xl font-bold">CBSE</h3>
              <p className="text-gray-600 dark:text-gray-400">Certified</p>
            </div>
          </div>
        </div>

        {/* Other Sections */}
        <Welcometo />
        <Divider orientation="horizontal" className="my-1" />
        <Facilities />
        <Divider orientation="horizontal" className="my-1" />
        <Whyshemford />
        <Divider orientation="horizontal" className="my-1" />
        <Feedback />

        {/* Final CTA */}
        <div className="w-full mt-12 py-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enroll?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Take the first step towards excellence in education
          </p>
          <Link href="/contact">
            <Button size="lg" color="primary">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
