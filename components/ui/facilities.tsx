import React from "react";
import Carousel from "../carousel";
import { CardStack } from "../cardStack";
import { cn } from "@/lib/utils";
import Link from "next/link";

const facilityImages: string[] = [
  "/assets/banner1.jpg",
  "/assets/banner2.jpg",
  "/assets/banner3.jpg",
  "/assets/banner4.jpg",
  "/assets/banner5.jpg",
];

const Facilities = () => {
  return (
    <div className="flex flex-col w-full gap-12">

      {/* ── Section heading ── */}
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
          Infrastructure
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
          World-Class Facilities
        </h2>
        <span className="section-accent" />
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">

        {/* Carousel */}
        <div className="w-full md:w-1/2">
          <Carousel images={facilityImages} className={cn("w-full rounded-2xl overflow-hidden shadow-lg")} />
        </div>

        {/* Card stack */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Learning flourishes in the right environment. At Shemford, every
            space — from labs to playgrounds — is thoughtfully designed to
            ignite curiosity, foster collaboration, and unlock every child's
            potential.
          </p>

          <div className="flex items-center justify-center">
            <Link href="/Campus">
              <CardStack items={CARDS} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "font-semibold bg-orange-100 text-orange-700 dark:bg-orange-700/20 dark:text-orange-400 px-1 py-0.5 rounded",
      className,
    )}
  >
    {children}
  </span>
);

const CARDS = [
  {
    id: 0,
    name: "Library",
    designation: "Knowledge Hub",
    content: (
      <p>
        A thoughtfully curated library with{" "}
        <Highlight>1,000+ books</Highlight> spanning{" "}
        <Highlight>45+ subjects and categories</Highlight> — from classic
        literature to cutting-edge science.
      </p>
    ),
  },
  {
    id: 1,
    name: "Computer & Science Labs",
    designation: "Innovation Centre",
    content: (
      <p>
        Four fully equipped laboratories with{" "}
        <Highlight>45+ student capacity</Highlight> each. Our computer lab
        features <Highlight>35+ high-performance workstations</Highlight> with
        high-speed internet and interactive projectors.
      </p>
    ),
  },
  {
    id: 2,
    name: "Sports Grounds",
    designation: "Athletics & Fitness",
    content: (
      <p>
        Three dedicated play areas including a{" "}
        <Highlight>
          Basketball Court, Football Ground, and Cricket Field
        </Highlight>{" "}
        — plus a dedicated{" "}
        <Highlight>play zone for Kindergarten students</Highlight>.
      </p>
    ),
  },
  {
    id: 3,
    name: "Kindergarten Wing",
    designation: "Early Childhood",
    content: (
      <p>
        A warm, nurturing second home for our youngest learners, complete with{" "}
        <Highlight>sensory activity rooms</Highlight> and{" "}
        <Highlight>age-appropriate play equipment</Highlight> designed to spark
        wonder from day one.
      </p>
    ),
  },
  {
    id: 4,
    name: "Activity & Smart Rooms",
    designation: "Clubs & Co-curricular",
    content: (
      <p>
        Dedicated spaces equipped with{" "}
        <Highlight>interactive smart boards</Highlight> for clubs, workshops,
        and indoor activities including{" "}
        <Highlight>Chess, Table Tennis, and creative arts</Highlight>.
      </p>
    ),
  },
];
