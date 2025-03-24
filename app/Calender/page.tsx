import HolidayRibbon from '@/components/notificationribbon';
import React from 'react';

const NotificationPage: React.FC = () => {
  const holidays = [
    { day: 'THURSDAY', date: '4/11/2024', holiday: 'EID-UL-FITR' },
    { day: 'SUNDAY', date: '4/14/2024', holiday: 'AMBEDKAR JAYANTI' },
    { day: 'WEDNESDAY', date: '4/17/2024', holiday: 'RAM NAVAMI' },
    { day: 'MONDAY', date: '6/17/2024', holiday: 'EID-UL-ADHA' },
    { day: 'WEDNESDAY', date: '7/17/2024', holiday: 'MUHHARAM' },
    { day: 'THURSDAY', date: '8/15/2024', holiday: 'INDEPENDENCE DAY' },
    { day: 'MONDAY', date: '8/19/2024', holiday: 'RAKSHA BANDHAN' },
    { day: 'MONDAY', date: '8/26/2024', holiday: 'JANMASHTAMI' },
    { day: 'MONDAY', date: '9/16/2024', holiday: 'ID-E-MILAD' },
    { day: 'TUESDAY', date: '9/17/2024', holiday: 'VISWAKARMA PUJA' },
    { day: 'WEDNESDAY', date: '10/2/2024', holiday: 'GANDHI JAYANTI' },
    { day: 'TUE-SAT', date: '08 to 12 Oct 2024', holiday: 'DUSSEHRA' },
    { day: 'THURSDAY', date: '10/31/2024', holiday: 'DIWALI' },
    { day: 'SUNDAY', date: '11/3/2024', holiday: 'BHAI DOOJ' },
    { day: 'THURSDAY', date: '11/7/2024', holiday: 'CHHATH PUJA' },
    { day: 'FRIDAY', date: '11/15/2024', holiday: 'GURU NANAK JAYANTI' },
    { day: 'WEDNESDAY', date: '12/25/2024', holiday: 'CHRISTMAS' },
    { day: 'WEDNESDAY', date: '1/1/2025', holiday: 'NEW YEAR DAY' },
    { day: 'TUESDAY', date: '1/14/2025', holiday: 'MAKAR SANKRANTI' },
    { day: 'SUNDAY', date: '1/26/2025', holiday: 'REPUBLIC DAY' },
    { day: 'SUNDAY', date: '2/2/2025', holiday: 'VASANT PANCHAMI' },
    { day: 'WEDNESDAY', date: '2/26/2025', holiday: 'MAHA SHIVRATRI' },
    { day: 'WED - SAT', date: '12 to 15 March 2025', holiday: 'HOLI' },
  ];

  const vacationDetails = [
    { name: 'SUMMER VACATION', start: '23rd MAY 2024', end: '22nd JUNE 2024', reopen: '24th JUNE 2024' },
    { name: 'DURGA PUJA', start: '08th OCTOBER 2024', end: '12th OCTOBER 2024', reopen: '14th OCTOBER 2024' },
    { name: 'DIWALI', start: '31st OCTOBER 2024', end: '9th NOVEMBER 2024', reopen: '11th NOVEMBER 2024' },
    { name: 'WINTER BREAK', start: '24th DECEMBER 2024', end: '02nd JANUARY 2025', reopen: '03rd JANUARY 2025' },
    { name: 'SUMMER CAMP', start: '24th MAY 2024', end: '30th MAY 2024' },
  ];
  const holidaysAlert = [
    { day: 'THURSDAY', date: '4/11/2024', holiday: 'EID-UL-FITR' },
    { day: 'SUNDAY', date: '4/14/2024', holiday: 'AMBEDKAR JAYANTI' },
    { day: 'WEDNESDAY', date: '4/17/2024', holiday: 'RAM NAVAMI' },
    { day: 'MONDAY', date: '6/17/2024', holiday: 'EID-UL-ADHA' },
    { day: 'WEDNESDAY', date: '7/17/2024', holiday: 'MUHHARAM' },
    { day: 'THURSDAY', date: '8/15/2024', holiday: 'INDEPENDENCE DAY' },
    { day: 'MONDAY', date: '8/19/2024', holiday: 'RAKSHA BANDHAN' },
    { day: 'MONDAY', date: '8/26/2024', holiday: 'JANMASHTAMI' },
    { day: 'MONDAY', date: '9/16/2024', holiday: 'ID-E-MILAD' },
    { day: 'TUESDAY', date: '9/17/2024', holiday: 'VISWAKARMA PUJA' },
    { day: 'WEDNESDAY', date: '10/2/2024', holiday: 'GANDHI JAYANTI' },
    { day: 'TUE-SAT', date: '08 to 12 Oct 2024', holiday: 'DUSSEHRA' },
    { day: 'THURSDAY', date: '10/31/2024', holiday: 'DIWALI' },
    { day: 'SUNDAY', date: '11/3/2024', holiday: 'BHAI DOOJ' },
    { day: 'THURSDAY', date: '11/7/2024', holiday: 'CHHATH PUJA' },
    { day: 'FRIDAY', date: '11/15/2024', holiday: 'GURU NANAK JAYANTI' },
    { day: 'WEDNESDAY', date: '12/25/2024', holiday: 'CHRISTMAS' },
    { day: 'WEDNESDAY', date: '1/1/2025', holiday: 'NEW YEAR DAY' },
    { day: 'TUESDAY', date: '1/14/2025', holiday: 'MAKAR SANKRANTI' },
    { day: 'SUNDAY', date: '1/26/2025', holiday: 'REPUBLIC DAY' },
    { day: 'SUNDAY', date: '2/2/2025', holiday: 'VASANT PANCHAMI' },
    { day: 'WEDNESDAY', date: '2/26/2025', holiday: 'MAHA SHIVRATRI' },
    { day: 'WED - SAT', date: '12 to 15 March 2025', holiday: 'HOLI' },
  
    // Adding your birthday for testing purposes
    { day: 'TUESDAY', date: '26/3/2025', holiday: "Rishabh Ranjan's Birthday" },  // Your birthday for testing tomorrow
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen">

      {/* Notifications Section */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Notification Banner */}
        <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Important Notice!</h2>
          <p className="text-sm">
            The school will remain closed on the 25th of December for Christmas.
          </p>
        </div>

        {/* Download Notices Section */}
        <section>
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Download Calenders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Notice Cards */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                Notice 1: Risahbh Ranjan's Birthday Holiday
              </h3>
              <a
               download href="/docs/CV.pdf"
               rel='noopenner noreferrer'
                className="text-blue-500 hover:underline"
              >
                Download Notice
              </a>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                Notice 2: Holiday Schedule for 2024
              </h3>
              <a
                href="/path/to/notice2.pdf"
                download
                className="text-blue-500 hover:underline"
              >
                Download Notice
              </a>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                Notice 3: Examination Dates
              </h3>
              <a
                href="/path/to/notice3.pdf"
                download
                className="text-blue-500 hover:underline"
              >
                Download Notice
              </a>
            </div>
          </div>
        </section>

        {/* Holidays Section */}
        <section>
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Upcoming Holidays
          </h2>
        <HolidayRibbon holidays={holidaysAlert} />
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
            {holidays.map((holiday, index) => (
              <div key={index} className="flex justify-between items-center  hover:bg-neutral-200 p-2  rounded-sm">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {holiday.holiday} ({holiday.day})
                </span>
                <span className="text-lg text-gray-600 dark:text-gray-300">
                  {holiday.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Vacation Details Section */}
        <section>
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Vacation Details
          </h2>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl space-y-4">
            {vacationDetails.map((vacation, index) => (
              <div key={index} className="flex justify-between items-center hover:bg-neutral-200 p-2  rounded-sm">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {vacation.name}
                </span>
                <span className="text-lg text-gray-600 dark:text-gray-300">
                  {vacation.start} to {vacation.end}, Reopens on {vacation.reopen || 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotificationPage;
