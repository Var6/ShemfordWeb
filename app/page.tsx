import Carousel from '@/components/carousel';
import HolidayRibbon from '@/components/notificationribbon';
import Facilities from '@/components/ui/facilities';
import Feedback from '@/components/ui/feedback';
import Welcometo from '@/components/ui/welcometo';
import Whyshemford from '@/components/ui/whyshemford';
import { Divider } from '@heroui/divider';
const holidays = [
  { day: 'THURSDAY', date: '4/11/2024', holiday: 'EID-UL-FITR' },
  { day: 'SUNDAY', date: '4/14/2024', holiday: 'AMBEDKAR JAYANTI' },
  { day: 'WEDNESDAY', date: '4/17/2024', holiday: 'RAM NAVAMI' },
  { day: 'MONDAY', date: '6/17/2024', holiday: 'EID-UL-ADHA' },
  { day: 'WEDNESDAY', date: '7/17/2024', holiday: 'MUHHARAM' },
  { day: 'THURSDAY', date: '8/15/2024', holiday: 'INDEPENDENCE DAY' },
  { day: 'MONDAY', date: '8/19/2024', holiday: 'RAKSHA BANDHAN' },
  { day: 'MONDAY', date: '8/26/2024', holiday: 'JANMASHTAMI' },
  { day: 'MONDAY', date: '9/16/2024', holiday: 'ID-E-MILAD' },
  { day: 'TUESDAY', date: '9/17/2024', holiday: 'VISWAKARMA PUJA' },
  { day: 'WEDNESDAY', date: '10/2/2024', holiday: 'GANDHI JAYANTI' },
  { day: 'TUE-SAT', date: '08 to 12 Oct 2024', holiday: 'DUSSEHRA' },
  { day: 'THURSDAY', date: '10/31/2024', holiday: 'DIWALI' },
  { day: 'SUNDAY', date: '11/3/2024', holiday: 'BHAI DOOJ' },
  { day: 'THURSDAY', date: '11/7/2024', holiday: 'CHHATH PUJA' },
  { day: 'FRIDAY', date: '11/15/2024', holiday: 'GURU NANAK JAYANTI' },
  { day: 'WEDNESDAY', date: '12/25/2024', holiday: 'CHRISTMAS' },
  { day: 'WEDNESDAY', date: '1/1/2025', holiday: 'NEW YEAR DAY' },
  { day: 'TUESDAY', date: '1/14/2025', holiday: 'MAKAR SANKRANTI' },
  { day: 'SUNDAY', date: '1/26/2025', holiday: 'REPUBLIC DAY' },
  { day: 'SUNDAY', date: '2/2/2025', holiday: 'VASANT PANCHAMI' },
  { day: 'WEDNESDAY', date: '2/26/2025', holiday: 'MAHA SHIVRATRI' },
  { day: 'WED - SAT', date: '12 to 15 March 2025', holiday: 'HOLI' },

  // Adding your birthday for testing purposes
  { day: 'TUESDAY', date: '4/3/2025', holiday: "Rishabh Ranjan's Birthday" },  // Your birthday for testing tomorrow
];

export default function Home() {

  const images: string[] = [
    '/assets/banner1.jpg',
    '/assets/banner2.jpg',
    '/assets/banner3.jpg',
    '/assets/banner4.jpg',
    '/assets/banner5.jpg',
   
    // Add more image URLs here
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-10">
      <div className="inline-block text-center justify-center">
      {/* Holiday Ribbon */}
      <HolidayRibbon holidays={holidays} />
      {/* Your other content */}
        <Carousel images={images} className={"rounded-md h-fit"} />
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

