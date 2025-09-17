import { title } from '@/components/primitives';
import { Timeline } from '@/components/ui/timeline';

export default function About() {
const data = [
  {
    title: "2025 - Present",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Our school continues to focus on holistic education, blending academics,
          sports, arts, and technology. This year we introduced smart classrooms,
          hosted multiple inter-school competitions, and achieved 100% results in
          CBSE Board Examinations.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src="/assets/1.jpg" alt="Annual Day" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/2.jpg" alt="Smart Classroom" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/3.jpg" alt="Science Exhibition" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/4.jpg" alt="Sports Day" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/5.jpg" alt="Teachers Felicitation" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
        </div>
      </div>
    ),
  },
  {
    title: "2018 - 2024",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          This period marked rapid growth – we expanded our infrastructure with
          new science labs, computer labs, and a library. Our students excelled
          in academics, Olympiads, and sports at district and state levels.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src="/assets/6.jpg" alt="Library" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/7.jpeg" alt="Computer Lab" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/8.jpg" alt="Science Lab" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/9.jpeg" alt="Students Achievements" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/10.jpeg" alt="Sports Winners" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
        </div>
      </div>
    ),
  },
  {
    title: "2012 - Foundation Year",
    content: (
      <div>
        <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          The school was founded with a vision to provide quality education and
          shape responsible citizens. We started with a small batch of students,
          passionate teachers, and a dream to make learning joyful.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src="/assets/11.jpeg" alt="School Inauguration" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/12.jpeg" alt="First Batch" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/13.jpeg" alt="Founders" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/14.jpeg" alt="First Classroom" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          <img src="/assets/15.jpeg" alt="Opening Ceremony" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
        </div>
      </div>
    ),
  },
];

  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <h1 className={title()}>About Us</h1>
      </div>
       <div className="relative w-full overflow-clip">
       <Timeline data={data} />
    </div>
    </div>
  );
}
