import React from 'react';
import { Avatar } from '@heroui/avatar';
const Feedback = () => {
  return (
    <div className="mt-10">
      <h1 className="text-orange-500 dark:text-orange-300 text-5xl">
        Students Feedback
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto dark:text-white">
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full flex-shrink-0">
              <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 flex-shrink-0">
                <Avatar
                  size="lg"
                  src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  className="w-30 h-30 text-large"
                  isBordered
                  color="danger"
                />
              </div>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
  ABHINAV KUMAR
</h2>
<p className="leading-relaxed text-base">
  Achieving the top rank in the 2023–24 academic year has been a proud
  milestone in my journey, and I wholeheartedly credit Shemford Futuristic
  School, Patna, for this achievement. The school&apos;s dynamic learning
  ecosystem, innovative teaching methods, and unwavering commitment to
  excellence created the perfect platform for me to grow and succeed. The
  mentorship, motivation, and personalized attention from my teachers
  empowered me to push my limits and transform challenges into opportunities.
  Shemford Futuristic School doesn&apos;t just educate — it inspires students to
  dream bigger, aim higher, and lead with confidence.
</p>
<span className="mt-3 text-yellow-500 inline-flex items-center">
  Academic Excellence Awardee 2023–24
</span>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                Rishahb Ranjan
              </h2>
              <p className="leading-relaxed text-base">
                Yes ! I made it I am immensely grateful to Shemford Futuristic
                School, Patna, for providing me with an exceptional learning
                environment that helped me achieve the top rank in the 2023-24
                academic year. The school's focus on holistic development,
                state-of-the-art facilities, and experienced faculty has been
                instrumental in my success. The support and guidance from my
                teachers have been invaluable, encouraging me to strive for
                excellence and pursue my dreams with confidence. Shemford
                Futuristic School truly lives up to its promise of nurturing
                future leaders.
              </p>
              <span className="mt-3 text-yellow-500 inline-flex items-center">
                2025
              </span>
            </div>
            <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 flex-shrink-0">
              <Avatar
                size="lg"
                src="/assets/Rishabh.jpeg"
                className="w-30 h-30 text-large"
                isBordered
                color="primary"
              />
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col"></div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
