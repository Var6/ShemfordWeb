'use client'
import React, { useEffect, useState } from 'react';

interface Holiday {
  day: string;
  date: string;
  holiday: string;
}

const getUpcomingHolidayWithinTwoDays = (holidays: Holiday[]) => {
  const today = new Date();

  const upcomingHoliday = holidays
    .map((holiday) => {
      // Handle holiday date ranges like '08 to 12 Oct 2025'
      if (holiday.date.includes('to')) {
        const [startDate, endDate] = holiday.date.split(' to ');
        const [day, month, year] = startDate.split(' ');
        const formattedDate = `${year}-${month}-${day.padStart(2, '0')}`;
        return { ...holiday, dateObj: new Date(formattedDate) };
      }

      // Handle other dates, parse the format `MM/DD/YYYY` or `DD/MM/YYYY`
      const [day, month, year] = holiday.date.split('/');
      const formattedDate = `${year}-${month}-${day.padStart(2, '0')}`;
      return { ...holiday, dateObj: new Date(formattedDate) };
    })
    .filter((holiday) => {
      if (isNaN(holiday.dateObj.getTime())) return false;

      const diffInTime = holiday.dateObj.getTime() - today.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert time difference to days
      console.log(`${holiday.holiday}: ${diffInDays} days away`); // Debugging log
      return diffInDays > 0 && diffInDays <= 2; // Only return holidays in the next 1 or 2 days
    })
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime()); // Sort by date

  return upcomingHoliday.length > 0 ? upcomingHoliday[0] : null; // Return the first upcoming holiday within 2 days, or null if none
};

interface HolidayRibbonProps {
  holidays: Holiday[];
}

const HolidayRibbon: React.FC<HolidayRibbonProps> = ({ holidays }) => {
  const [upcomingHoliday, setUpcomingHoliday] = useState<Holiday | null>(null);

  useEffect(() => {
    const holiday = getUpcomingHolidayWithinTwoDays(holidays);
    setUpcomingHoliday(holiday);
  }, [holidays]);

  if (!upcomingHoliday) return null; // Don't render if no upcoming holiday

  return (
    <div className="bg-transparent text-danger p-4 text-center font-bold">
      <div className="overflow-hidden whitespace-nowrap">
        <p className="inline-block animate-marquee">
          Upcoming Holiday: {upcomingHoliday.holiday} on {upcomingHoliday.day}, {upcomingHoliday.date}
        </p>
      </div>
    </div>
  );
};

export default HolidayRibbon;
