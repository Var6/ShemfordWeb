import { title } from '@/components/primitives';
import Image from 'next/image';

export default function About() {
  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <h1 className={title()}>About</h1>
      </div>
      <div className="flex flex-row w-full">
        <br />
        <div className=" flex gap-4 flex-col mt-3 text-xl mr-8 ">
          <span className=" ">
            <p>
              Best CBSE School in Patna - <b>Shemford Futuristic School </b> :
              We Build Future Here A Future Choice with Futuristic School! As
              the word Futuristic finds its place in the School&apos;s name we
              too absolutely believe in the futuristic approach and look forward
              to achieving it in a very holistic way. Aim of the school is to
              become a hub for the holistic overall development of a student.
            </p>
            <p>
              We have introduced a School Integrated Program with pre-foundation
              andfoundation courses for IIT-JEE and NEET from the current
              academic session. We also aim to introduce sports and
              extracurricular activities as the epicenter of our education
              programme and promulgate in house Sports training facilities with
              world-class facilities. To make this a reality we have already
              collaborated with SportifyAsia, a Singapore based organisation and
              The Fit Monkey, our Sports Curriculum partner and Spardha
              Foundation, our School Integrated Program partner.
            </p>
            <p>
              School Integrated Program is an ambitious and promising plan where
              we aim to gear up and prepare the students without exerting any
              extra burden, be it be financialor academic, by providing boarding
              and day boarding facilities for students coming from rural as well
              as urban background. We aspire to become a unique premier
              institution offering in house facilities for all kinds of
              competitive exams. ( Best CBSE School in Patna ) Having Best
              Faculty Team.
            </p>
          </span>
        </div>
        <Image
          src="/assets/MainBG.jpg"
          height={800}
          className="rounded-lg 
     hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]
     "
          alt="Shemford School Image"
          width={500}
        />
      </div>
    </div>
  );
}
