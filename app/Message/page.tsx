import { Tabs } from '@/components/tabs';
import Image from 'next/image';

export default function Message() {
  const tabs = [
    {
      title: 'Principal',
      value: 'principal',
      content: (
        <div className="flex flex-row w-full md:flex-col items-center justify-between gap-5 overflow-hidden relative rounded-2xl p-10 text-white bg-gradient-to-tr from-orange-700 to-yellow-100 text-justify shadow-xl ">
          <span className="text-3xl text-primary">
            Principal&apos;s Message
          </span>
          <div className="flex flex-col w-full md:flex-row items-center justify-between gap-5">
            <span>
              It gives me great pleasure to welcome you to the aura of Shemford
              Futuristic School. As the Principal of the institution , I feel
              honoured and privileged to be a part of an educational institution
              where every stakeholder is a learner, motivating each other. This
              school strives to bring forth conscientious, confident citizens of
              India, who are capable of preserving and refining our cultural
              values. Our school provides remarkable educational experiences to
              students right from Nursery (age 3) to grade 12. While following
              the CBSE syllabus, at Shemford we try to draw out the best in each
              of our students, support and encourage them to achieve their goals
              .The school ensures effective and stress free teaching and
              learning environment for our students. Individual attention is
              provided to each student and thus helping them to learn things at
              their own pace.
              <br />
              The school focuses on identifying and developing the talents and
              potentials of each student. The wide variety of experiences
              provided by the teachers to the students will help them uplift
              their overall personality. I believe that education is a process
              of positive transformation. For making this transformation a
              reality, we expect the whole hearted support from the parents.
              Let&apos;s join our hands together for the betterment of our
              students and to help them reach their full potential . The parents
              are their first teachers. On behalf of the institution, I appeal
              to the parents to ensure
              <br />
              The best atmosphere to the students at home. Expecting
              constructive collaborative effort for the welfare of our student
              community.
            </span>
            <Image
              src="/assets/Principal.jpeg"
              alt="dummy image"
              width={500}
              height={500}
              className=" rounded-xl mx-auto object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Chairperson',
      value: 'Chairperson',
      content: (
        <div className="flex flex-row w-full md:flex-col items-center justify-between gap-5 overflow-hidden relative rounded-2xl p-10 text-white bg-gradient-to-tr from-purple-700 to-violet-100 text-justify shadow-xl ">
          <span className="text-3xl text-primary">
            Chairperson&apos;s Message
          </span>
          <div className="flex flex-col w-full md:flex-row items-center justify-between gap-5">
            <span className="text-2xl">
              शिक्षा सीखने और सिखाने की व सतत और शाश्वत प्रक्रिया है | हमारे
              जीवन का हर अनुभव हमारे लिए एक शिक्षा लेकर आता है |अनुभव हमें चीजों
              की प्रति एक व्यवहारिक दृष्टिकोण देता है और परिपक़्व बनाता है ,
              दूसरे शब्दों में एक गुरु की भांति हमारा मार्गदर्शन करता है और जीवन
              पथ पर लगातार सीखते हुए आगे बढ़ने की प्रेरणा देता है |
              <br />
              मेरे उद्देश्य बच्चों को प्रकृति, पर्यावरण और त्वरित गति से बदलती
              परिस्थितियों के साथ सामंजस्य बिठा कर जीना सिखाते हुए शिक्षित करना
              है , ताकि हर बच्चा भविष्य का एक सफल व्यक्ति के साथ-साथ एक सफल
              नागरिक भी बन सके | धरती का हर व्यक्ति, हर जीवन, हर कण का पृथक
              अस्तित्व होते हुए भी उसके बीच के अन्योन्याश्रय संबंध को नकारा नहीं
              जा सकता है , तदनुसार वे एक दूसरे को प्रत्यक्ष या परोक्ष रूप से
              प्रभावित भी करते है |
              <br />
              हम सब मिलकर पाठ्यक्रम को पुस्तकों के साथ-साथ अपने अनुभवों से अपने
              आप को इतना समृद्ध और शिक्षित करें कि भविष्य में जीवन की चुनौतियों
              को कुशलता से सामना करते हुए जीवन के हर पहलू में संतुलन बनाते हुए ,
              एक परिपक़्व नागरिक की भांति एक शिक्षित और सम्य समाज बनाने में अपना
              योगदान दें | हम सभी मिलकर “अत दीपा विहस्त” के मंत्र को आत्मसात्
              करते हुए सतत् अपना प्रकाश स्वयं बनाने की चेष्टा करें |
            </span>
            <Image
              src="/assets/Chairperson.jpeg"
              alt="dummy image"
              width={500}
              height={500}
              className=" rounded-xl mx-auto object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Our Mission',
      value: 'Our Mission',
      content: (
        <div className="flex flex-row w-full md:flex-col items-center justify-between gap-5 overflow-hidden relative rounded-2xl p-10 text-white bg-gradient-to-tr from-red-600 to-violet-100 text-justify shadow-xl ">
          <span className="text-3xl text-primary">Our Mission</span>
          <div className="flex flex-col w-full md:flex-row items-center justify-between gap-5">
            <span className="text-xl">
              Will children really love to come to SHEMFORD?
              <br />
              Sure! All it requires is an understanding of a child&apos;s
              interests, passions and using these as vehicles for motivation. We
              often hear parents saying that their children don&apos;t like to
              go the school, but what if they don&apos;t realise is that when
              education is &apos;presented&apos; in a push model, it becomes the
              slowest, least effective and most uninteresting path to learning.
              Adhering to this method of mass production in an age of digital
              personalization, is a disservice to education. Not only does it
              make learning dull and de-motivating the children, it also makes
              schools boring places.
              <br />
              Now, just for a moment, think what would happen if SHEMFORD were
              to turn the system around?
              <br />
              What if we question the traditional rules as we build schools of
              the future?
              <br />
              What if our school make children as excited about learning as they
              are about playing with friends?
              <br />
              What if children at our school don&apos;t have to study hard to
              learn?
              <br />
              What if learning here id both relevant and useful?
              <br />
              Presenting SHEMFORD, a futuristic school, to which, children run
              to; not because they &apos;have&apos; to!
              <br />
              <br />
              <b>
                Our Mission- &apos;To make learning creative, interesting,
                interactive and engaging, through a system which is
                constructive, comprehensive, practical and futuristic&apos;
              </b>
            </span>
            <Image
              src="/assets/images1.png"
              alt="dummy image"
              width={500}
              height={500}
              className=" rounded-xl h-fit mx-auto object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Our Vision',
      value: 'Our Vision',
      content: (
        <div className="flex flex-col w-full items-center gap-5 overflow-hidden relative rounded-2xl p-6 text-white bg-gradient-to-tr from-blue-700 to-blue-200 text-justify shadow-xl">
          {/* Centered Title */}
          <h2 className="text-3xl text-primary text-center">Our Vision</h2>
          
          {/* Content Container */}
          <div className="flex flex-col w-full gap-5 text-lg">
            <ul className="space-y-2 px-4 md:px-10">
              <li>At SHEMFORD Schools we believe in the power of “What if…”</li>
              <li>What if children wake up their parents to go to school every day?</li>
              <li>What if they run to school and walk back home?</li>
              <li>What if they are as excited about learning as they are about playing?</li>
            </ul>
            
            {/* Image in Between */}
            <div className="flex justify-center">
              <Image
                src="/assets/images1.png"
                alt="dummy image"
                width={400}
                height={400}
                className="rounded-xl h-auto object-cover"
              />
            </div>
            
            <ul className="space-y-2 px-4 md:px-10">
              <li>What if they look forward to tests?</li>
              <li>What if children love school days more than holidays?</li>
              <li>'What if…' is a question that inventors ask themselves every day. It drives people to innovate their world.</li>
              <li>At Shemford, we love this question. It makes us think of the unusual, of the extraordinary, and allows us to explore new possibilities.</li>
              <li>Possibilities of making schooling interesting, engaging, and motivating.</li>
            </ul>
          </div>
        </div>
      ),

    },
  ];

  return (
    <div>
      <div className="h-full md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start mb-40">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
