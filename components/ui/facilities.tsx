import React from 'react';
import Carousel from '../carousel';
import { CardStack } from '../cardStack';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Facilities = () => {
  const images: string[] = [
    '/assets/banner1.jpg',
    '/assets/banner2.jpg',
    '/assets/banner3.jpg',
    '/assets/banner4.jpg',
    '/assets/banner5.jpg',
  ];

  return (
    <div>
      <div className="text-3xl text-orange-600 pt-3 sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center">
        World-Class Facilities
      </div>
      <div className="flex flex-col w-full md:flex-row items-center justify-between gap-8 p-6">
        <div className="flex flex-col space-y-4 w-full md:w-1/2">
          <Carousel images={images} className={cn('w-full')} />
        </div>
        {/* Right Side */}
        <div className="w-full md:w-1/2">
          <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
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
}) => {
  return (
    <span
      className={cn(
        'font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5',
        className,
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: 'Library',
    designation: "Knowledge Hub",
    content: (
      <p>
        A thoughtfully curated library with{' '}
        <Highlight>1,000+ books</Highlight> spanning{' '}
        <Highlight>45+ subjects and categories</Highlight> — from classic
        literature to cutting-edge science.
      </p>
    ),
  },
  {
    id: 1,
    name: 'Computer & Science Labs',
    designation: 'Innovation Centre',
    content: (
      <p>
        Four fully equipped laboratories with{' '}
        <Highlight>45+ student capacity</Highlight> each. Our computer lab
        features <Highlight>35+ high-performance workstations</Highlight> with
        high-speed internet and interactive projectors.
      </p>
    ),
  },
  {
    id: 2,
    name: 'Sports Grounds',
    designation: 'Athletics & Fitness',
    content: (
      <p>
        Three dedicated play areas including a{' '}
        <Highlight>Basketball Court, Football Ground, and Cricket Field</Highlight>{' '}
        — plus a dedicated{' '}
        <Highlight>play zone for Kindergarten students</Highlight>.
      </p>
    ),
  },
  {
    id: 3,
    name: 'Kindergarten Wing',
    designation: 'Early Childhood',
    content: (
      <p>
        A warm, nurturing second home for our youngest learners, complete with{' '}
        <Highlight>sensory activity rooms</Highlight> and{' '}
        <Highlight>age-appropriate play equipment</Highlight> designed to
        spark wonder from day one.
      </p>
    ),
  },
  {
    id: 4,
    name: 'Activity & Smart Rooms',
    designation: 'Clubs & Co-curricular',
    content: (
      <p>
        Dedicated spaces equipped with{' '}
        <Highlight>interactive smart boards</Highlight> for clubs, workshops,
        and indoor activities including{' '}
        <Highlight>Chess, Table Tennis, and creative arts</Highlight>.
      </p>
    ),
  },
];
