import Carousel from '@/components/carousel';
import Facilities from '@/components/ui/facilities';
import Feedback from '@/components/ui/feedback';
import Welcometo from '@/components/ui/welcometo';
import Whyshemford from '@/components/ui/whyshemford';
import { Divider } from '@heroui/divider';
export default function Home() {
  const images: string[] = [
    'https://via.placeholder.com/1200x500/ff7f50/ffffff?text=Slide+1',
    'https://via.placeholder.com/1200x500/87cefa/ffffff?text=Slide+2',
    'https://via.placeholder.com/1200x500/32cd32/ffffff?text=Slide+3',
    // Add more image URLs here
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center">
        <Carousel images={images} />
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
