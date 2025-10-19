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
   
    // Add more image URLs here
  ];

  return (
    <div className="flex flex-col w-full md:flex-row items-center justify-between gap-8 p-6">
      <div className="flex flex-col space-y-4 w-full md:w-1/2">
        <Carousel images={images} />
      </div>
      {/* Right Side: Image */}
      <div className="w-full md:w-1/2">
        <span className="text-xl bold ">Facilities</span>
        <br />
        <div className="mb-12">
          To make learning interesting, engaging and motivating for our
          children, we offer the following facilities at our school.
        </div>
        <div className="flex items-center justify-center">
         <Link href="/Campus">
         <CardStack items={CARDS} />
         </Link> 
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
    designation: `School's Library`,
    content: (
      <p>
        A Well Equipped Library,with <Highlight> 1000+ Books.</Highlight>
        covering More then <Highlight>45 Subjects and Categories</Highlight>
      </p>
    ),
  },
  {
    id: 1,
    name: 'Computer Lab',
    designation: 'One of Many Labs',
    content: (
      <p>
        More then <Highlight>4 types of Labs with</Highlight>
        <Highlight>45+ Student&apos;Capacity</Highlight> each.
        <br /> Computer Lab consisting
        <Highlight>35+ Advance Computers</Highlight>and Projectors
      </p>
    ),
  },
  {
    id: 2,
    name: 'Play Ground',
    designation: 'Sports',
    content: (
      <p>
        3 Types of PlayGround with
        <Highlight>
          {' '}
          BasketBall Court, Footbal Court and Cricket Field
        </Highlight>{' '}
        Special Play area for
        <Highlight>K.G. Students</Highlight>
      </p>
    ),
  },
  {
    id: 3,
    name: 'Kinder Garden',
    designation: 'Nursary',
    content: (
      <p>
        A Second home for Kids,
        <Highlight> Activity Rooms and Play Areas</Highlight>Customisezed Toys
        for
        <Highlight>Kinder Garden </Highlight> Students
      </p>
    ),
  },
  {
    id: 4,
    name: 'Activity Room',
    designation: 'Clubs and Activity',
    content: (
      <p>
        A safe enviroment for activity and GamePlay
        <Highlight> Activity Rooms and Play Areas with Smart Boards</Highlight>
        Indoor Activies and games like
        <Highlight>Chess and TableTennis </Highlight>
      </p>
    ),
  },
];
