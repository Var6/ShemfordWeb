import React from 'react';

const SchoolPage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen w-[150vh] p-6">
      <div className=" mx-auto">

        {/* Title Section */}
        <h1 className="text-3xl font-bold text-center mb-6 text-clip bg-gradient-to-l from-orange-700 to-yellow-400 bg-clip-text text-transparent">
          Best CBSE School - ANNUAL PEDAGOGICAL PLAN 2023-2024
        </h1>
        <h2 className="text-2xl font-semibold shadow-sm text-center mb-6 text-clip bg-gradient-to-l from-orange-700 to-yellow-400 bg-clip-text text-transparent">
          SHEMFORD FUTURISTIC SCHOOL PATNA
        </h2>

        {/* School Information */}
        <div className="bg-white text-left dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-2xl mb-8">
          <h3 className="text-xl font-semibold mb-4 text-clip bg-gradient-to-l from-orange-700 to-yellow-400 bg-clip-text text-transparent">Information about the school</h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Name of School:</strong> Shemford Futuristic School Patna</p>
            <p><strong>Address:</strong> Jaganpura Main Road, Mauza P S, Gopalpur, Patna, India, Bihar 804453</p>
            <p><strong>Phone Number:</strong> <a href="tel:+919470057662" className="text-blue-500 hover:text-blue-700">+91 9470057662</a>, 
              <a href="tel:+919534098666" className="text-blue-500 hover:text-blue-700">9534098666 / 67 / 69</a>
            </p>
            <p><strong>Website:</strong> <a href="http://www.shemfordpatna.com" className="text-blue-500 hover:text-blue-700">www.shemfordpatna.com</a></p>
            <p><strong>Email Id:</strong> <a href="mailto:shemfordpatna53@gmail.com" className="text-blue-500 hover:text-blue-700">shemfordpatna53@gmail.com</a>, 
              <a href="mailto:info@shemfordpatna.com" className="text-blue-500 hover:text-blue-700">info@shemfordpatna.com</a>
            </p>
            <p><strong>Name of the Principal:</strong> Ms. Jaisa P J</p>
            <p><strong>Principal Email:</strong> <a href="mailto:principal@pat.shemford.com" className="text-blue-500 hover:text-blue-700">principal@pat.shemford.com</a></p>
            <p><strong>School Affiliation No.:</strong> 330701</p>
            <p><strong>School Code:</strong> 65698</p>
            <p><strong>Year of Affiliation:</strong> 2017</p>
            <p><strong>Validity of Affiliation:</strong> 2028</p>
          </div>
        </div>

        {/* Student Strength Section */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">STUDENT STRENGTH 2023-24</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white">
                <tr>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Boys</th>
                  <th className="px-6 py-3">Girls</th>
                  <th className="px-6 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {/* Data Rows */}
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">PRE-NURSERY</td>
                  <td className="px-6 py-3">-</td>
                  <td className="px-6 py-3">-</td>
                  <td className="px-6 py-3">-</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">NURSURY</td>
                  <td className="px-6 py-3">-</td>
                  <td className="px-6 py-3">-</td>
                  <td className="px-6 py-3">-</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">PREP</td>
                  <td className="px-6 py-3">-</td>
                  <td className="px-6 py-3">-</td>
                  <td className="px-6 py-3">-</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS I</td>
                  <td className="px-6 py-3">13</td>
                  <td className="px-6 py-3">07</td>
                  <td className="px-6 py-3">20</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS II</td>
                  <td className="px-6 py-3">18</td>
                  <td className="px-6 py-3">07</td>
                  <td className="px-6 py-3">25</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS III</td>
                  <td className="px-6 py-3">13</td>
                  <td className="px-6 py-3">29</td>
                  <td className="px-6 py-3">42</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS IV</td>
                  <td className="px-6 py-3">31</td>
                  <td className="px-6 py-3">16</td>
                  <td className="px-6 py-3">47</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS V</td>
                  <td className="px-6 py-3">25</td>
                  <td className="px-6 py-3">18</td>
                  <td className="px-6 py-3">43</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS VI A & B</td>
                  <td className="px-6 py-3">19 + 15</td>
                  <td className="px-6 py-3">08 + 07</td>
                  <td className="px-6 py-3">49</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS VII A & B</td>
                  <td className="px-6 py-3">24 + 21</td>
                  <td className="px-6 py-3">13 + 14</td>
                  <td className="px-6 py-3">72</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS VIII A & B</td>
                  <td className="px-6 py-3">14 + 12</td>
                  <td className="px-6 py-3">13 + 12</td>
                  <td className="px-6 py-3">51</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS IX A & B</td>
                  <td className="px-6 py-3">21 + 14</td>
                  <td className="px-6 py-3">11 + 11</td>
                  <td className="px-6 py-3">57</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS X A & B</td>
                  <td className="px-6 py-3">19 + 18</td>
                  <td className="px-6 py-3">11 + 06</td>
                  <td className="px-6 py-3">54</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS XI</td>
                  <td className="px-6 py-3">6</td>
                  <td className="px-6 py-3">1</td>
                  <td className="px-6 py-3">7</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">CLASS XII</td>
                  <td className="px-6 py-3">2</td>
                  <td className="px-6 py-3">1</td>
                  <td className="px-6 py-3">3</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6 py-3 font-semibold">TOTAL</td>
                  <td className="px-6 py-3 font-semibold">312</td>
                  <td className="px-6 py-3 font-semibold">204</td>
                  <td className="px-6 py-3 font-semibold">516</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolPage;
