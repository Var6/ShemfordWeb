import { Metadata } from 'next';
import { title } from '@/components/primitives';
import { Timeline } from '@/components/ui/timeline';
import { Target, Users, Award, Lightbulb, CheckCircle } from 'lucide-react';

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

const coreValues = [
  {
    icon: <Target className="w-8 h-8 text-orange-600" />,
    title: 'Vision',
    desc: 'To be the most trusted destination for forward-thinking education in Bihar — producing graduates who are academically brilliant and deeply humane.',
    border: 'border-orange-200 dark:border-orange-900/40',
    iconBg: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
    title: 'Innovation',
    desc: 'We integrate smart classrooms, AI-assisted learning, and the ShemEduMAX™ framework to make every lesson relevant to the world students will inherit.',
    border: 'border-amber-200 dark:border-amber-900/40',
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: 'Community',
    desc: 'Education is a shared endeavour. We cultivate a culture of mutual respect, active parent partnerships, and collaborative growth among students and staff.',
    border: 'border-orange-200 dark:border-orange-900/40',
    iconBg: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    icon: <Award className="w-8 h-8 text-orange-600" />,
    title: 'Excellence',
    desc: 'We hold every child to the highest standard — not to create pressure, but to communicate our deep belief in their unlimited potential.',
    border: 'border-orange-200 dark:border-orange-900/40',
    iconBg: 'bg-orange-50 dark:bg-orange-900/20',
  },
];

const achievements = [
  {
    title: 'Academic Excellence',
    items: [
      'Consistent 95%+ pass rate in CBSE Board Examinations',
      'Distinguished performers in JEE Foundation & NEET preparation',
      'State and national Olympiad medal winners every year',
      'CBSE affiliated with exemplary compliance record',
    ],
  },
  {
    title: 'Infrastructure & Facilities',
    items: [
      'Smart classrooms with interactive boards in every section',
      'Fully equipped Physics, Chemistry, Biology & Computer labs',
      'Curated library with 1,000+ titles across 45+ subjects',
      'Modern auditorium, sports complex, and activity rooms',
    ],
  },
  {
    title: 'Sports & Co-curricular',
    items: [
      'State-level podium finishes across multiple sports disciplines',
      'Active representation in inter-school and district competitions',
      'Annual cultural festival and student-produced performances',
      'Thriving student clubs in robotics, debate, arts, and more',
    ],
  },
  {
    title: 'Student Development',
    items: [
      'Holistic growth model blending IQ, EQ, and SQ development',
      'Dedicated counselling and mentorship programme',
      'Student-led leadership councils from Class VI onwards',
      'Regular structured parent–teacher collaboration sessions',
    ],
  },
];

const whyChoose = [
  {
    title: 'Expert, Empathetic Faculty',
    desc: 'Our educators are not only subject-matter specialists but also mentors trained in child psychology and modern pedagogy.',
  },
  {
    title: 'Future-Ready Technology',
    desc: 'From coding labs to AI-integrated classrooms, students gain the digital fluency that every modern career demands.',
  },
  {
    title: 'Safe, Nurturing Campus',
    desc: 'CCTV-monitored, RO-purified, clean and secure — a campus where parents feel peace of mind and children feel at home.',
  },
  {
    title: 'Accessible Excellence',
    desc: 'World-class education at a transparent, reasonable fee structure, backed by merit-based scholarships for deserving families.',
  },
];

export default function About() {
  const data = [
    {
      title: '2025 – Present',
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-neutral-700 md:text-base dark:text-neutral-200 leading-relaxed">
            Shemford enters a new era of excellence — smart classrooms rolled
            out across all sections, a School Integrated Programme for JEE and
            NEET introduced, and 100% results achieved in CBSE Board
            Examinations. Our students now compete and win at state and national
            levels in academics, sports, and the arts.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {['1','2','3','4','5'].map((n) => (
              <img key={n} src={`/assets/${n}.jpg`} alt={`School activity ${n}`}
                className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '2018 – 2024',
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-neutral-700 md:text-base dark:text-neutral-200 leading-relaxed">
            Six transformative years of rapid growth. New science laboratories,
            an expanded computer wing, and a fully stocked library were added.
            Our students claimed district and state honours in Olympiads,
            athletics, and cultural competitions, establishing Shemford as a
            name synonymous with genuine achievement.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {['6','7','8','9','10'].map((n, i) => (
              <img key={n} src={`/assets/${n}.${i === 1 || i >= 3 ? 'jpeg' : 'jpg'}`}
                alt={`Growth milestone ${n}`}
                className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '2012 – Foundation Year',
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-neutral-700 md:text-base dark:text-neutral-200 leading-relaxed">
            Shemford Futuristic School was founded on a single, unwavering
            conviction: that every child, regardless of background, deserves
            an education that unlocks their full potential. We began with a
            small cohort, a passionate founding faculty, and the bold dream of
            making learning joyful, purposeful, and transformative.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {['11','12','13','14','15'].map((n) => (
              <img key={n} src={`/assets/${n}.jpeg`} alt={`Founding year ${n}`}
                className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            Jaganpur, Patna, Bihar — Est. 2012
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Shemford Futuristic School</h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto leading-relaxed">
            For over a decade, we have been shaping curious minds, compassionate
            hearts, and capable citizens — one student at a time.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">


        {/* Core Values — 3D hover lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {coreValues.map((v, i) => (
            <div
              key={i}
              className={`border-2 ${v.border} rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm
                hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default group`}
              style={{ perspective: '800px' }}
            >
              <div className={`w-14 h-14 ${v.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                {v.icon}
              </div>
              <h3 className="font-bold text-lg text-center mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="mb-14 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-10 border border-orange-100 dark:border-orange-900/30">
          <h2 className="text-3xl font-bold mb-5">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            At Shemford Futuristic School, our mission is to create an
            environment where intellectual rigour and human kindness coexist.
            We are committed to a progressive, inclusive, and challenging
            education that develops academic excellence, moral character,
            creative confidence, and emotional intelligence. Through dedicated
            faculty, modern infrastructure, and the innovative ShemEduMAX™
            system, we transform education — inspiring every student to reach
            their highest potential and contribute meaningfully to society.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative w-full overflow-clip mb-14">
          <h2 className="text-3xl font-bold text-center mb-10">Our Journey</h2>
          <Timeline data={data} />
        </div>

        {/* Achievements */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold text-center mb-10">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach, i) => (
              <div
                key={i}
                className="border-2 border-orange-100 dark:border-orange-900/30 rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="font-bold text-lg mb-4 text-orange-600 dark:text-orange-400">
                  {ach.title}
                </h3>
                <ul className="space-y-2">
                  {ach.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-10 border border-orange-100 dark:border-orange-900/30">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Shemford?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChoose.map((w, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-gray-900 dark:text-white">{w.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
