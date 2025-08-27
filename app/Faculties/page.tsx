'use client';
import { useState } from "react";
import { GraduationCap, Award, Calendar, Briefcase, X, Users, BookOpen, Star, Quote, Clock, MapPin } from "lucide-react";

type Faculty = {
  id: number;
  name: string;
  subject: string;
  achievements: string;
  experience: string;
  joinedDate: string;
  bio: string;
  message: string;
  profileUrl: string;
};

const realFaculties: Faculty[] = [
  {
    id: 1,
    name: "Ashok Kumar",
    subject: "English",
    achievements: "CBSE Resource person in 2024, attended Training for 2 days as a Resource person",
    experience: "11 years",
    joinedDate: "April 8, 2024",
    bio: "I am teacher of English. I have done M.A., M.ed from DDUGU University. I like to read magazine and novels. I am fully dedicated to my work. I want to do research in my subject.",
    message: "I want to say that the environment of the school is very good.",
    profileUrl: "https://drive.google.com/uc?id=1nYo4fWCk5i1hPwXkwPblshEFPVTPkUOa"
  },
  {
    id: 2,
    name: "Leena Sinha",
    subject: "Social Science",
    achievements: "Best Teacher Award by the CM of Bihar",
    experience: "27 years",
    joinedDate: "August 7, 2025",
    bio: "I strongly believe that there's no substitute for hard work. To embrace life, you've to come to terms with both your strengths and weaknesses. I chase knowledge - life never stops teaching you.",
    message: "Education is your true wealth so focus on building a strong foundation to secure your future.",
    profileUrl: "https://drive.google.com/uc?id=15JQIII78IGCK1BrGBIr0Vwl7ErSS5Yah"
  },
  {
    id: 3,
    name: "Soni Rani",
    subject: "All Subjects (Mother Teacher)",
    achievements: "Not Applicable",
    experience: "1 year as Librarian & 1 year as Mother Teacher",
    joinedDate: "March 28, 2025",
    bio: "I want to develop my career in educational sector by creating new approaches and latest technologies for better education among learners. And also resolve the educational parameters that are challenging everyday among learners.",
    message: "Appreciation of nurturing environment, highlight on positive impact, highlight on sustainable environment and develop best approaches for slow learners.",
    profileUrl: "https://drive.google.com/uc?id=15VwdviA4j8Sp-iRlyB7i6m0MTIpqaWf2"
  },
  {
    id: 4,
    name: "Neetu Kumari",
    subject: "EVS, Social Studies",
    achievements: "MA, B.Ed",
    experience: "5 years",
    joinedDate: "January 4, 2023",
    bio: "I am devoted, kind hearted, creative",
    message: "This school is good place for overall development of a child.",
    profileUrl: "https://drive.google.com/uc?id=1Ww7h6cCi69PcDqqw5_KoXre3-ciURNyA"
  },
  {
    id: 5,
    name: "Sanjeev Kumar",
    subject: "Sanskrit",
    achievements: "Successfully guiding a team to complete a project, meeting deadlines, and achieving desired outcomes",
    experience: "10 years",
    joinedDate: "March 28, 2024",
    bio: "I am M.A. B.Ed. My hobby is teaching. I am motivated and a quick learner, always seeking new challenges and opportunities to grow. I have experience in teaching and am skilled in best teaching and control class. I believe in being open and honest and always strive to be fair in my dealings. I enjoy working with a team and am always happy to offer my support to others.",
    message: "Creative a positive organisational culture.",
    profileUrl: "https://drive.google.com/uc?id=1DVQSuN8Y2l9dJ8l5WINNRtzvr95MwRTi"
  },
  {
    id: 6,
    name: "Mukesh Kumar",
    subject: "Hindi and Library",
    achievements: "UGC NET QUALIFIED",
    experience: "4 years",
    joinedDate: "March 2, 2022",
    bio: "My subject is Hindi and library. I have done my graduation from Delhi University and post graduation from Patna University.",
    message: "Every ship needs a captain. A teacher is the driver of a student. Being a teacher is not at all easy. It is a very challenging profession. Teachers play an essential role in moulding an individual. Teachers are the pillars of a nation.",
    profileUrl: "https://drive.google.com/uc?id=1NRbud45wWQpYYiCYlkrdT3qlED976rML"
  },
  {
    id: 7,
    name: "Arpana Priya",
    subject: "Pre Primary (All Subjects)",
    achievements: "Teachers Award 2024 given in recognition of valuable services",
    experience: "14 years",
    joinedDate: "April 1, 2015",
    bio: "I am 45 years old and have been teaching young children for more than ten years. I love spending time with little kids because their curiosity and smiles make every day joyful. Teaching small children is not just my profession, it is my passion.",
    message: "For small kids, remember to always stay curious, ask questions, help your friends, and show kindness to everyone around you. You are special, and you can do wonderful things!",
    profileUrl: "https://drive.google.com/uc?id=1GhFsx3iFFh_Tdh4u8ZnrqfIk0HBI65ae"
  },
  {
    id: 8,
    name: "Abhishek Kumar",
    subject: "Physics",
    achievements: "Innovative & experimental learning approach",
    experience: "4+ years",
    joinedDate: "April 8, 2024",
    bio: "I am a young and dynamic person who actively engages himself in fostering scientific temperament among young buds through innovative & experimental learning.",
    message: "Making an act when an action is needed is often in vain.",
    profileUrl: "https://drive.google.com/uc?id=1CARC8BEw55vn6kn3-yF1k5SIKiDM-ffa"
  },
  {
    id: 9,
    name: "Manoj Kumar",
    subject: "Physical and Health Education",
    achievements: "Participated in CBSE cluster - 2025",
    experience: "25 years",
    joinedDate: "April 22, 2024",
    bio: "Hard working and energetic person with positive result.",
    message: "Positive thoughts makes a man success in life.",
    profileUrl: "https://drive.google.com/uc?id=1HsudwuzZLxvBZ_jQJ2t-nPKbphniru2o"
  },
  {
    id: 10,
    name: "Poonam Sinha",
    subject: "Multiple Subjects (Grade 3 & 4)",
    achievements: "Completed 150+ CBSE conducted teacher training, presented classroom management topics",
    experience: "30 years",
    joinedDate: "April 1, 2021",
    bio: "I have been dedicated to the field of education for over 30 years. My teaching philosophy revolves around active engagement, critical thinking, and individualized support. I believe that every student has unique strengths and learning styles.",
    message: "Learning should never stop at any given point in life. Always help others in need in whatever way possible should be one's motto. Be curious onwards & upwards.",
    profileUrl: "https://drive.google.com/uc?id=1m3G6E-bCMXLltfQL2HwVyLJBDoSP2HRl"
  },
  {
    id: 11,
    name: "Shailendra Kumar",
    subject: "Sports and Games",
    achievements: "Taekwando national participation",
    experience: "5 years",
    joinedDate: "March 25, 2025",
    bio: "Achieve my target in games",
    message: "Sports develops fitness of students",
    profileUrl: "https://drive.google.com/uc?id=1lVTPBXbgF_at9gvvKO8ZQBkmSzkCHPVm"
  },
  {
    id: 12,
    name: "Preeti Lata",
    subject: "Science",
    achievements: "Certificate in the field of environment science",
    experience: "16 years",
    joinedDate: "January 19, 2023",
    bio: "I am a passionate and dedicated educator with 16 years of teaching experience in Science. I believe in creating an engaging and interactive learning environment that helps students understand concepts deeply.",
    message: "To work in learning and challenging environment with an opportunity for growth and career advancement.",
    profileUrl: "https://drive.google.com/uc?id=1wVpX3OZy_XspTr7QdLy8uNQds6_Hgkzb"
  },
  {
    id: 13,
    name: "Priyanka Sinha",
    subject: "Pre Primary (All Subjects)",
    achievements: "Dedicated service in early childhood education",
    experience: "12 years",
    joinedDate: "August 3, 2024",
    bio: "I am an honest person, a dedicated teacher and flexible.",
    message: "Education world should be extremely honest in shaping future of a child. Because it is the beginning of someone journey in this selfish world.",
    profileUrl: "https://drive.google.com/uc?id=1Gx1XBpw2D3lLq_iYBqWFIMwKZaosOk6d"
  },
  {
    id: 14,
    name: "Kumari Shalini",
    subject: "Hindi",
    achievements: "Awarded as best Dancer",
    experience: "8 years",
    joinedDate: "January 29, 2024",
    bio: "Living my best life, one moment at a time.",
    message: "Best place for education.",
    profileUrl: "https://drive.google.com/uc?id=11XFKP6SKjhFxKWvgqVnEz0P2zSVGR8wW"
  },
  {
    id: 15,
    name: "Rachana Jha",
    subject: "Mathematics",
    achievements: "Recipient of top honours in College Debate Competition on Women Empowerment, laureate of multiple oratory contests",
    experience: "19 years",
    joinedDate: "July 3, 2012",
    bio: "Everyday I try my best to plant seeds of knowledge, kindness and hope in student. I want to be life long learner, a guide and a friend in many children's journey.",
    message: "A teacher's true joy lies not only in imparting knowledge but in nurturing curiosity, character, and confidence in every child.",
    profileUrl: "https://drive.google.com/uc?id=1EbSsBtcz-eE5GRkQ-G2tZ0BU96HBYjz4"
  },
  {
    id: 16,
    name: "Ayush Kumar",
    subject: "Social Science",
    achievements: "Dedicated to educational excellence",
    experience: "2 years",
    joinedDate: "February 5, 2024",
    bio: "If you look behind every exceptional person there is an exceptional teacher",
    message: "In every moment a choice exists. We can cling to the past or embrace the inevitability of change and allow a brighter future to unfold before us.",
    profileUrl: "https://drive.google.com/uc?id=1egqhVE9e-X26nyrUWvtmxlXxuVzSz2UP"
  },
  {
    id: 17,
    name: "Komili Sharma",
    subject: "English",
    achievements: "Mastering in Office XP from TATA INFOTECH EDUCATION (2004-2005)",
    experience: "18 years",
    joinedDate: "March 18, 2017",
    bio: "I am an educator where every day in the classroom feels like a new journey of discovery. For me, teaching is not limited to books and lessons — it is about shaping curious minds, encouraging questions, and helping children see the world with confidence and creativity.",
    message: "Embrace learning with an open heart, respect the journey, and never underestimate the power of kindness and perseverance.",
    profileUrl: "https://drive.google.com/uc?id=194tov5Kf6AdCkP3TaqKx5xShssPf2aUJ"
  },
  {
    id: 18,
    name: "Abhishek Kumar",
    subject: "Computer",
    achievements: "Masters in Computer Application",
    experience: "2 years",
    joinedDate: "June 29, 2024",
    bio: "I am a teacher who don't just want to teach but also want to make my students a better human being.",
    message: "We need to be open minded",
    profileUrl: "https://drive.google.com/uc?id=1r0I5gcBIeiGm5tr9DjN3-WYQcrykquEI"
  },
  {
    id: 19,
    name: "Sanjana Singh",
    subject: "Science",
    achievements: "Dedicated educator with passion for meaningful learning",
    experience: "2 years",
    joinedDate: "January 22, 2024",
    bio: "Dedicated educator with a passion for making learning meaningful and engaging.",
    message: "Believe in yourself—you are capable of more than you imagine.",
    profileUrl: "https://drive.google.com/uc?id=15-LSMk6Meq8nBXCbstdCjHCzA7YLwpGy"
  },
  {
    id: 20,
    name: "Abhishek Kumar",
    subject: "Mathematics",
    achievements: "CTET Qualified, STET Qualified",
    experience: "4 years",
    joinedDate: "July 2, 2022",
    bio: "I believe in creating a classroom environment where curiosity is celebrated and mistakes are seen as opportunities for growth. I use a variety of teaching methods, from hands-on activities to interactive problem-solving sessions.",
    message: "Maths isn't just about memorizing formulas; it's about building problem-solving skills, thinking logically, and understanding the world in a new way.",
    profileUrl: "https://drive.google.com/uc?id=1uE7TxjH32wv9CzjXILhOEQnsRRiBVfEN"
  }
];

export default function Faculties() {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  // Get unique subjects for filter
  const subjects = ["All", ...Array.from(new Set(realFaculties.map(f => f.subject)))];

  const filteredFaculties = realFaculties.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "All" || faculty.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      "English": "from-blue-500 to-cyan-600",
      "Social Science": "from-purple-500 to-indigo-600",
      "Mathematics": "from-green-500 to-emerald-600",
      "Science": "from-orange-500 to-red-600",
      "Physics": "from-teal-500 to-green-600",
      "Hindi": "from-pink-500 to-rose-600",
      "Computer": "from-indigo-500 to-blue-600",
      "Sanskrit": "from-amber-500 to-yellow-600",
      "EVS": "from-emerald-500 to-teal-600",
      "Pre Primary": "from-rose-500 to-pink-600",
      "Sports": "from-red-500 to-orange-600"
    };
    
    // Find matching color based on keywords in subject
    for (const [key, color] of Object.entries(colors)) {
      if (subject.toLowerCase().includes(key.toLowerCase())) {
        return color;
      }
    }
    return "from-gray-500 to-slate-600";
  };

  const getExperienceYears = (experience: string): number => {
    const match = experience.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-16 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-green-400/20 to-emerald-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/15 to-rose-600/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 shadow-lg">
            <Users className="w-6 h-6 text-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Meet Our Faculty</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent leading-tight">
            Our Faculties
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet our exceptional team of {realFaculties.length} dedicated educators, researchers, and mentors committed to academic excellence
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search faculty by name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            
            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredFaculties.map((faculty) => {
            const isHovered = hoveredCard === faculty.id;
            const subjectGradient = getSubjectColor(faculty.subject);
            const experienceYears = getExperienceYears(faculty.experience);
            
            return (
              <div
                key={faculty.id}
                className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 ${isHovered ? 'transform scale-105' : ''}`}
                onMouseEnter={() => setHoveredCard(faculty.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedFaculty(faculty)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${subjectGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-6 flex flex-col items-center text-center space-y-4">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${subjectGradient} rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                      {
                        faculty.profileUrl ? (
                          <img
                            src={faculty.profileUrl}
                            alt={faculty.name}
                            className=""
                          />
                        ) : (
                          <GraduationCap className="w-12 h-12 text-gray-500 dark:text-gray-400" />)
                      }
                    </div>
                  </div>

                  {/* Faculty Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {faculty.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {faculty.subject}
                    </p>
                  </div>

                  {/* Subject Badge */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${subjectGradient} text-white text-xs font-semibold rounded-full shadow-lg`}>
                    <BookOpen className="w-3 h-3" />
                    {faculty.subject.split('(')[0].trim()}
                  </div>

                  {/* Experience Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, Math.max(1, Math.ceil(experienceYears / 6))) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                      {experienceYears}yr{experienceYears !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Experience */}
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Joined {new Date(faculty.joinedDate).getFullYear()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Modal */}
        {selectedFaculty && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-4xl w-full border border-white/20 dark:border-gray-700/20 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setSelectedFaculty(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200 group z-10"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
              </button>

              {/* Modal Content */}
              <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className={`absolute -inset-2 bg-gradient-to-r ${getSubjectColor(selectedFaculty.subject)} rounded-full blur opacity-75`}></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center shadow-xl overflow-hidden">
                      {
                        selectedFaculty.profileUrl ? (
                          <img
                            src={selectedFaculty.profileUrl}
                            alt={selectedFaculty.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <GraduationCap className="w-16 h-16 text-gray-500 dark:text-gray-400" />
                        )
                      }
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                      {selectedFaculty.name}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {selectedFaculty.subject}
                    </p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getSubjectColor(selectedFaculty.subject)} text-white text-sm font-semibold rounded-full shadow-lg`}>
                      <BookOpen className="w-4 h-4" />
                      {selectedFaculty.subject}
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-700/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedFaculty.bio}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Achievements */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200/50 dark:border-green-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedFaculty.achievements}
                    </p>
                  </div>

                  {/* Experience & Details */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border border-amber-200/50 dark:border-amber-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-500 rounded-lg">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Experience</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-gray-700 dark:text-gray-300">{selectedFaculty.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span className="text-gray-700 dark:text-gray-300">Joined {selectedFaculty.joinedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Section */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200/50 dark:border-purple-700/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Quote className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Message</h3>
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{selectedFaculty.message}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredFaculties.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Faculty Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{realFaculties.length}</div>
              <div className="text-sm opacity-90">Total Faculty</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{subjects.length - 1}</div>
              <div className="text-sm opacity-90">Subjects</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {Math.round(realFaculties.reduce((sum, f) => sum + getExperienceYears(f.experience), 0) / realFaculties.length)}
              </div>
              <div className="text-sm opacity-90">Avg. Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Dedication</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}