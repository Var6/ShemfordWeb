import { Metadata } from 'next';
import { title } from '@/components/primitives';
import { Timeline } from '@/components/ui/timeline';
import { Target, Users, Award, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Shemford Futuristic School - Our Story & Mission',
  description:
    'Learn about Shemford Futuristic School in Patna, Bihar. Discover our vision, mission, values, and journey since 2012.',
  keywords: ['about school', 'school mission', 'school vision', 'Shemford school'],
  openGraph: {
    title: 'About Shemford Futuristic School',
    description: 'Discover our journey, values, and commitment to education',
    url: 'https://shemford.edu/about',
    type: 'website',
  },
};

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
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="flex justify-center items-center mb-12">
          <div className="text-center">
            <h1 className={`${title()} gradient-text`}>About Shemford Futuristic School</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Building the leaders of tomorrow through quality education in Patna, Bihar
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center gap-3">
              <div className="flex justify-center">
                <Target className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-lg">Vision</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                To provide quality, futuristic education that empowers students to achieve excellence
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center gap-3">
              <div className="flex justify-center">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="font-semibold text-lg">Innovation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Integrating technology and modern pedagogies for effective learning outcomes
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center gap-3">
              <div className="flex justify-center">
                <Users className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg">Community</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fostering an inclusive culture of respect, collaboration, and mutual growth
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center gap-3">
              <div className="flex justify-center">
                <Award className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-semibold text-lg">Excellence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Committed to academic excellence and holistic development of every student
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            At Shemford Futuristic School in Jaganpur, Patna, Bihar, our mission is to create an excellent 
            educational environment that nurtures young minds to become responsible citizens, critical thinkers, 
            and future leaders. We are committed to providing an inclusive, progressive, and challenging education 
            that develops academic excellence, character, creativity, and emotional intelligence. Through our 
            dedicated faculty, modern infrastructure, and innovative teaching methodologies, we strive to transform 
            education and inspire students to achieve their highest potential.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative w-full overflow-clip mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <Timeline data={data} />
        </div>

        {/* Achievements Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Academic Excellence</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Consistent 95%+ pass rate in CBSE Board Exams</li>
                <li>✓ Regular meritorious performances in JEE, NEET</li>
                <li>✓ Strong performance in Olympiads and competitions</li>
                <li>✓ CBSE Affiliation with excellent track record</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Infrastructure & Facilities</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Smart classrooms with interactive boards</li>
                <li>✓ Well-equipped science labs and computer labs</li>
                <li>✓ Spacious library with digital resources</li>
                <li>✓ Modern sports facilities and auditorium</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Sports & Co-curricular</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ State-level achievements in various sports</li>
                <li>✓ Active participation in inter-school competitions</li>
                <li>✓ Regular cultural programs and annual day</li>
                <li>✓ Student clubs and activity-based learning</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Student Development</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Holistic development approach</li>
                <li>✓ Counseling and mentoring support</li>
                <li>✓ Leadership opportunities and responsibilities</li>
                  <li>✓ Regular parent-teacher interactions</li>
                </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose Shemford?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-blue-500">✓</span>
              <div>
                <h4 className="font-semibold mb-1">Experienced Faculty</h4>
                <p className="text-gray-600 dark:text-gray-400">Highly qualified and dedicated teachers with proven teaching methodologies</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-blue-500">✓</span>
              <div>
                <h4 className="font-semibold mb-1">Modern Technology</h4>
                <p className="text-gray-600 dark:text-gray-400">Integration of latest educational technology for enhanced learning</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-blue-500">✓</span>
              <div>
                <h4 className="font-semibold mb-1">Safe & Secure Campus</h4>
                <p className="text-gray-600 dark:text-gray-400">Secure campus with modern facilities ensuring student safety and well-being</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-blue-500">✓</span>
              <div>
                <h4 className="font-semibold mb-1">Affordable Excellence</h4>
                <p className="text-gray-600 dark:text-gray-400">Quality education at reasonable fee structure with scholarship opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
