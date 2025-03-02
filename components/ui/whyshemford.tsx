import Image from 'next/image';
import React from 'react';
import { ContainerScroll } from '@/components/scrollAnimation';

const Whyshemford = () => {
  return (
    <div className="flex flex-col md:flex-col items-center justify-between gap-8 p-6">
      <div className="flex flex-col w-full md:flex-row items-center justify-between gap-8 p-6">
        <div className="flex flex-col space-y-4 w-full md:w-1/2">
          <span className="text-xl bold text-orange-400 ">
            | Best CBSE School in Patna
          </span>
          <br />
          <div className="text-3xl bold text-orange-500 my-3">ShemEduMAX™</div>
          <div className="flex items-center justify-center text-left text-l">
            Designed by award-winning educationists of India, ShemEduMAX™ is a
            unique and powerful proprietary system that infuses life and purpose
            into school education.
            <br />
            It has been developed after many years of extensive research and
            diverse teaching-learning experiences. ShemEduMAX™ empowers
            students with the knowledge and skills to meet the complex demands
            of modern society as responsible individuals
          </div>
        </div>
        {/* Right Side: Image */}
        <div className="w-full text-left md:w-1/2">
          <Image src={'/Whyus.png'} width={500} height={500} alt="WhyUSImage" />
        </div>
      </div>
      {/* division is here */}
      <div>
        <div className="flex flex-col w-full md:flex-row items-center justify-between">
          <div className="flex flex-col space-y-4 w-full md:w-1/2">
            <ContainerScroll
              titleComponent={
                <>
                  <h1 className="text-3xl text-orange-600 sm:text-l md:text-xl  lg:text-3xl font-semibold ">
                    Why Shemford Futuristic School
                    <br />
                  </h1>
                </>
              }
            >
              <Image
                src={`/assets/whyshemford.jpg`}
                alt="hero"
                height={720}
                width={1400}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
          </div>
          {/* Right Side: Image */}
          <div className="w-full md:w-1/2 sm:h-fit sm:mt-15">
            <div className="bold text-clip sm:text-l md:text-xl  lg:text-3xl text-left sm:text-justify sm:mb-13 sm:pb-3 bg-gradient-to-br from-orange-700 to-yellow-400 bg-clip-text text-transparent">
              Develop a Positive Attitude towards Learning.
              <br />
              Get a Sound Foundation for a Bright Future.
              <br />
              Develop Good Communication Skills.
              <br />
              Become a Life-Long Learner.
              <br />
              Build Technology Fluency.
              <br />
              Learn to Work Collaboratively in a Global Environment.
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whyshemford;
