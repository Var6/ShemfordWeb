import React from 'react';

const PedagogicalPlans: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen p-6 rounded-lg">
      <div className="max-w-7xl mx-auto">

        {/* Title Section */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Pedagogical Plans
        </h1>

        {/* Pedagogy Explanation */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Pedagogical Approach</h3>
          <p className="text-gray-700 dark:text-gray-300 text-left">
            Pedagogy is the manner in which a teacher teaches her/his learners to acquire certain competencies as stated by the outcomes of learning. 
            There are several pedagogical approaches, but in accordance with the NCF 2005, we follow the constructivist approach (CBSE Vide circular Acad 15/2019 dated 9th March 2019).
            According to this approach, the child is placed at the centre of learning and the approach believes that children learn best through experiencing and reflecting on the topics/concepts being taught.
          </p>
        </div>

        {/* Pedagogical Objectives */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Pedagogical Objectives</h3>
          
          <div className="space-y-6">
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-left ">
              <li><strong>To provide a joyful and stress-free teaching-learning environment.</strong></li>
              <li><strong>To promote the all-round development of students with a holistic approach, integrating co-curricular and extra-curricular activities.</strong></li>
              <li><strong>To provide quality education that promotes intellectual, social, and cultural vivacity among its learners.</strong></li>
              <li><strong>To adapt and innovate methods to achieve academic excellence based on psychological, pedagogical, and social principles.</strong></li>
              <li><strong>To generate complete learning outcomes.</strong></li>
              <li><strong>To shape the character and behavior of the students.</strong></li>
            </ul>
          </div>
        </div>

        {/* Language Development */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Language Development Objectives</h3>
          <ul className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-left">
            <li><strong>Develop the ability to speak fluently and accurately in a variety of situations.</strong></li>
            <li><strong>Develop multilingual competence through using multilingualism as a strategy for learning languages and subjects.</strong></li>
            <li><strong>Develop grammatical competencies, moving from procedural knowledge to declarative knowledge.</strong></li>
            <li><strong>Develop the ability to express thoughts effortlessly, confidently, and in an organized manner.</strong></li>
            <li><strong>Use language as a skill for real-life purposes.</strong></li>
          </ul>
        </div>

        {/* Listening & Comprehension Objectives */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Listening and Comprehension Objectives</h3>
          <ul className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-left">
            <li><strong>Comprehend audio/video scripts, read aloud texts, and answer comprehension and inferential questions.</strong></li>
            <li><strong>Use resources like news, films, songs, dramas, role-play, and internet talks to improve listening comprehension and understand the use of tone/intonation/stress in speech.</strong></li>
            <li><strong>Meet people, discuss a variety of issues, organize, and participate in discussions.</strong></li>
            <li><strong>Consult dictionaries, magazines, periodicals, thesaurus, encyclopedia, electronic media, and libraries to improve language proficiency.</strong></li>
            <li><strong>Read and narrate stories, describe incidents with fluency and sequence.</strong></li>
          </ul>
        </div>

        {/* Scientific Approach Objectives */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Scientific Approach Objectives</h3>
          <ul className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-left">
            <li><strong>Develop understanding of concepts, principles, theories, and laws governing the physical world.</strong></li>
            <li><strong>Acquire and use methods of science such as observing, questioning, planning investigations, hypothesizing, collecting, analyzing, and interpreting data.</strong></li>
            <li><strong>Conduct experiments, including quantitative measurements.</strong></li>
            <li><strong>Appreciate how scientific concepts evolve over time.</strong></li>
            <li><strong>Develop scientific temper including objectivity, critical thinking, and freedom from fear and prejudice.</strong></li>
          </ul>
        </div>

        {/* Social Science Objectives */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Social Science Objectives</h3>
          <ul className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-left">
            <li><strong>Classify and compare cause and effect relationships in social and natural processes.</strong></li>
            <li><strong>Understand concepts like unity in diversity, democracy, development, and the forces enriching our cultural heritage.</strong></li>
            <li><strong>Demonstrate skills in observation, enquiry, reflection, empathy, and critical thinking.</strong></li>
            <li><strong>Create awareness of environmental issues, sustainable development, gender disparities, and marginalized sections of society.</strong></li>
            <li><strong>Understand astronomical phenomena, atmosphere, and biosphere.</strong></li>
          </ul>
        </div>

        {/* Geography Objectives */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Geography Objectives</h3>
          <ul className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-left">
            <li><strong>Observe the political map of India, study states, UTs, and important political terms.</strong></li>
            <li><strong>Analyze different types of climates in various regions and the factors affecting the course of a river.</strong></li>
            <li><strong>Use diagrams, models, and audio-visual materials to understand earth motions, stars, planets, and moons.</strong></li>
            <li><strong>Understand the causes and effects of various revolutions and read maps to identify historical places.</strong></li>
            <li><strong>Discuss concepts of democracy, equality, and state governance.</strong></li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default PedagogicalPlans;
