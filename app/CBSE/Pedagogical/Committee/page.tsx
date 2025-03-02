import React from 'react';

const PedagogicalPlanningCommittee: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen p-6 rounded-lg">
      <div className="max-w-7xl mx-auto">

        {/* Title Section */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Pedagogical Planning Committee
        </h1>

        {/* Introduction Section */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-2xl mb-8">
          <p className="text-gray-700 dark:text-gray-300">
            An annual plan contains all academic and co-curricular activities to be taken in the specified academic year. It is the act of developing a strategy for the upcoming year based on the experiences that have been gained from the previous year's performance.
            Pedagogical planning is undertaken after a series of discussions over the review of the curricular and co-curricular activities that had been conducted in the previous school session, identifying the lacunae to be filled, analyzing the level of achievement in different areas, and considering the needs of the learner and society. Effective methodologies are then adopted to impart quality education.
            Based on the above discussions, the School Management Committee has decided to set up an Annual Pedagogical Planning Committee to prepare an annual plan for the academic year 2024-25.
          </p>
        </div>

        {/* Committee Members Section */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Pedagogical Planning Committee Members</h3>
          
          <table className="min-w-full table-auto text-left text-gray-700 dark:text-gray-300 hover:shadow-lg">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-600">
                <th className="py-3 px-4 text-sm font-semibold">S.No.</th>
                <th className="py-3 px-4 text-sm font-semibold">Name</th>
                <th className="py-3 px-4 text-sm font-semibold">Designation</th>
                <th className="py-3 px-4 text-sm font-semibold">Role Assigned</th>
              </tr>
            </thead>
            <tbody>
              {[
                { no: 1, name: "Ms. Meera Sinha", designation: "Chairperson School Management", role: "Advisor" },
                { no: 2, name: "Mr. Savio Pinto", designation: "Director Academics", role: "Advisor" },
                { no: 3, name: "Ms. Jaisa P J", designation: "Principal", role: "Chairperson" },
                { no: 4, name: "Mr. Manish Chandra Pathak", designation: "Teacher Secondary school", role: "Member" },
                { no: 5, name: "Mr. Abhishek Kumar (Maths)", designation: "Teacher Secondary school", role: "Member" },
                { no: 6, name: "Mr. Abhishek Kumar (Science)", designation: "Teacher Secondary school", role: "Member" },
                { no: 7, name: "Mr. Abhishek Kumar (Computer)", designation: "Teacher Secondary school", role: "Member" },
                { no: 8, name: "Ms. Leena Sinha", designation: "Teacher Secondary school", role: "Member" },
                { no: 9, name: "Ms. Vivek Kumar", designation: "Teacher Secondary school", role: "Member" },
                { no: 10, name: "Ms. Anshu Priya", designation: "Teacher Secondary school", role: "Member" },
                { no: 11, name: "Mr. Ayush Kumar", designation: "Teacher Secondary school", role: "Member" },
                { no: 12, name: "Ms. Ruby Priya", designation: "Teacher Secondary school", role: "Member" },
                { no: 13, name: "Ms. Rachana Jha", designation: "Teacher Primary school", role: "Member" },
                { no: 14, name: "Ms. Komili Sharma", designation: "Teacher Primary school", role: "Member" },
                { no: 15, name: "Ms. Preeti Lata", designation: "Teacher Primary school", role: "Member" },
                { no: 16, name: "Ms. Poonam Sinha", designation: "Teacher Primary school", role: "Member" },
                { no: 17, name: "Ms. Neetu Kumari", designation: "Teacher Primary school", role: "" },
                { no: 18, name: "Ms. Anushka", designation: "Teacher Primary school", role: "" },
                { no: 19, name: "Ms. Arpana Priya", designation: "Teacher Nursery school", role: "Member" },
                { no: 20, name: "Ms. Priyanka Sinha", designation: "Teacher Nursery school", role: "Member" },
                { no: 21, name: "Mr. Manoj Kumar", designation: "Teacher Physical Education", role: "Member" },
                { no: 22, name: "Ms. Priyanka Kumari", designation: "Teacher Art and Craft", role: "Member" },
                { no: 23, name: "Ms. Shwet Prity", designation: "Teacher Music", role: "Member" },
                { no: 24, name: "Mr. Ashutosh Kumar", designation: "Teacher Dance", role: "Member" },
                { no: 25, name: "Ms. Neha Kumari", designation: "HR Manager and Operation Head", role: "Meeting and Documentation" },
                { no: 26, name: "Mr. Mukesh Kumar", designation: "Librarian", role: "Member" },
                { no: 27, name: "Mr. Imran Hussain", designation: "Parent", role: "Member" },
                { no: 28, name: "Ms. Parveen Baby", designation: "Parent", role: "Member" },
              ].map((member, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "hover:bg-gray-400 bg-gray-50 dark:bg-gray-600" : "hover:bg-gray-400 bg-white dark:bg-gray-700"}`}>
                  <td className="py-3 px-4 text-sm">{member.no}</td>
                  <td className="py-3 px-4 text-sm">{member.name}</td>
                  <td className="py-3 px-4 text-sm">{member.designation}</td>
                  <td className="py-3 px-4 text-sm">{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default PedagogicalPlanningCommittee;
