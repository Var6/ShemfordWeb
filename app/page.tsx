import Carousel from '@/components/carousel';
import Facilities from '@/components/ui/facilities';
import Feedback from '@/components/ui/feedback';
import Welcometo from '@/components/ui/welcometo';
import Whyshemford from '@/components/ui/whyshemford';
import { Divider } from '@heroui/divider';
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
