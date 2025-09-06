"use client";

import React from "react";

interface Holiday {
  day: string;
  date: string;
  holiday: string;
}

interface HolidayRibbonProps {
  holidays: Holiday[];
}

const getUpcomingHolidayWithinTwoDays = (holidays: Holiday[]): Holiday | null => {
  const today = new Date();
  for (const holiday of holidays) {
    const holidayDate = new Date(holiday.date);
    const diffTime = holidayDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    if (diffDays >= 0 && diffDays <= 2) {
      return holiday;
    }
  }
  return null;
};

const HolidayRibbon: React.FC<HolidayRibbonProps> = ({ holidays }) => {
  const upcomingHoliday = getUpcomingHolidayWithinTwoDays(holidays);

  if (!upcomingHoliday) return null;

  return (
    <div className="bg-yellow-200 text-black p-3 text-center font-semibold rounded-md mb-2">
      Upcoming Holiday: {upcomingHoliday.holiday} on{" "}
      {new Date(upcomingHoliday.date).toLocaleDateString()}
    </div>
  );
};

export default HolidayRibbon;
