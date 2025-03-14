import { useState } from "react";
import Image from "next/image";

interface Message {
  title: string;
  image: string;
  content: string;
}

const messages: Message[] = [
  {
    title: "Principal",
    image: "/assets/Principal.jpeg",
    content:
      ` It gives me great pleasure to welcome you to the aura of Shemford
              Futuristic School. As the Principal of the institution, I feel
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
              their own pace.\n
              The school focuses on identifying and developing the talents and
              potentials of each student. The wide variety of experiences
              provided by the teachers to the students will help them uplift
              their overall personality. I believe that education is a process
              of positive transformation. For making this transformation a
              reality, we expect the whole hearted support from the parents.
              Let&apos;s join our hands together for the betterment of our
              students and to help them reach their full potential. The parents
              are their first teachers. On behalf of the institution, I appeal
              to the parents to ensure\n
              The best atmosphere to the students at home. Expecting
              constructive collaborative effort for the welfare of our student
              community.`,
  },
  {
    title: "Chairperson",
    image: "/assets/Chairperson.jpeg",
    content:
      `शिक्षा सीखने और सिखाने की व सतत और शाश्वत प्रक्रिया है | हमारे
              जीवन का हर अनुभव हमारे लिए एक शिक्षा लेकर आता है |अनुभव हमें चीजों
              की प्रति एक व्यवहारिक दृष्टिकोण देता है और परिपक़्व बनाता है ,
              दूसरे शब्दों में एक गुरु की भांति हमारा मार्गदर्शन करता है और जीवन
              पथ पर लगातार सीखते हुए आगे बढ़ने की प्रेरणा देता है |\n
              मेरे उद्देश्य बच्चों को प्रकृति, पर्यावरण और त्वरित गति से बदलती
              परिस्थितियों के साथ सामंजस्य बिठा कर जीना सिखाते हुए शिक्षित करना
              है , ताकि हर बच्चा भविष्य का एक सफल व्यक्ति के साथ-साथ एक सफल
              नागरिक भी बन सके | धरती का हर व्यक्ति, हर जीवन, हर कण का पृथक
              अस्तित्व होते हुए भी उसके बीच के अन्योन्याश्रय संबंध को नकारा नहीं
              जा सकता है , तदनुसार वे एक दूसरे को प्रत्यक्ष या परोक्ष रूप से
              प्रभावित भी करते है |\n
              हम सब मिलकर पाठ्यक्रम को पुस्तकों के साथ-साथ अपने अनुभवों से अपने
              आप को इतना समृद्ध और शिक्षित करें कि भविष्य में जीवन की चुनौतियों
              को कुशलता से सामना करते हुए जीवन के हर पहलू में संतुलन बनाते हुए ,
              एक परिपक़्व नागरिक की भांति एक शिक्षित और सम्य समाज बनाने में अपना
              योगदान दें | हम सभी मिलकर “अत दीपा विहस्त” के मंत्र को आत्मसात्
              करते हुए सतत् अपना प्रकाश स्वयं बनाने की चेष्टा करें |`,
  },
  {
    title: "Our Mission",
    image: "/assets/images1.png",
    content:
     `Will children really love to come to SHEMFORD?\n
              Sure! All it requires is an understanding of a child&apos;s
              interests, passions and using these as vehicles for motivation. We
              often hear parents saying that their children don&apos;t like to
              go the school, but what if they don&apos;t realise is that when
              education is &apos;presented&apos; in a push model, it becomes the
              slowest, least effective and most uninteresting path to learning.
              Adhering to this method of mass production in an age of digital
              personalization, is a disservice to education. Not only does it
              make learning dull and de-motivating the children, it also makes
              schools boring places.\n\n
              Now, just for a moment, think what would happen if SHEMFORD were
              to turn the system around?\n
              What if we question the traditional rules as we build schools of
              the future?\n
              What if our school make children as excited about learning as they
              are about playing with friends?\n
              What if children at our school don&apos;t have to study hard to
              learn?\n
              What if learning here id both relevant and useful?\n
              Presenting SHEMFORD, a futuristic school, to which, children run
              to; not because they &apos;have&apos; to!\n
              <b>
                Our Mission- &apos;To make learning creative, interesting,
                interactive and engaging, through a system which is
                constructive, comprehensive, practical and futuristic&apos;
              </b>`,
  },
  {
    title: "Our Vision",
    image: "/assets/images1.png",
    content:
      "At SHEMFORD Schools we believe in the power of “What if…”...\n\nWhat if children wake up their parents to go to school every day?...",
  },
];

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        Messages
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {messages.map((msg) => (
          <div
            key={msg.title}
            className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedMessage(msg)}
          >
            <Image
              src={msg.image}
              alt={msg.title}
              width={250}
              height={250}
              className="w-48 h-48 object-cover rounded-lg mb-2"
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {msg.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
       {/* Modal Popup */}
       {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-lg w-full shadow-lg relative flex flex-col max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 text-lg"
              onClick={() => setSelectedMessage(null)}
            >
              ✖
            </button>
            <Image
              src={selectedMessage.image}
              alt={selectedMessage.title}
              width={300}
              height={300}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              {selectedMessage.title}
            </h2>
            <div className="max-h-60 overflow-y-auto p-2">
              <p className="text-gray-800 dark:text-gray-200 text-justify mb-2" dangerouslySetInnerHTML={{ __html: selectedMessage.content.replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}