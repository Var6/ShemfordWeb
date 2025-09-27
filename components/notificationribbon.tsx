"use client";

import React from "react";

interface Holiday {
  title: string;
  date?: string;   // single-day holiday
  start?: string;  // vacation start
  end?: string;    // vacation end
  reopen?: string; // vacation reopen
}

interface HolidayRibbonProps {
  holidays: Holiday[];
}

const getUpcomingHolidayWithinTwoDays = (holidays: Holiday[]): Holiday | null => {
  const today = new Date();

  for (const holiday of holidays) {
    // Single-day holiday
    if (holiday.date) {
      const holidayDate = new Date(holiday.date);
      const diffDays = (holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays >= 0 && diffDays <= 2) {
        return holiday;
      }
    }

    // Vacation (start–end)
    if (holiday.start && holiday.end) {
      const startDate = new Date(holiday.start);
      const endDate = new Date(holiday.end);

      // Case A: starting soon
      const diffDays = (startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays >= 0 && diffDays <= 2) {
        return holiday;
      }

      // Case B: ongoing vacation
      if (today >= startDate && today <= endDate) {
        return holiday;
      }
    }
  }

  return null;
};

const HolidayRibbon: React.FC<HolidayRibbonProps> = ({ holidays }) => {
  const upcomingHoliday = getUpcomingHolidayWithinTwoDays(holidays);

  if (!upcomingHoliday) return null;

  return (
    <div className="bg-yellow-200 text-black p-3 text-center font-semibold rounded-md mb-2">
      Upcoming Holiday:{" "}
      {upcomingHoliday.title}{" "}
      {upcomingHoliday.date
        ? `on ${new Date(upcomingHoliday.date).toLocaleDateString()}`
        : upcomingHoliday.start && upcomingHoliday.end
        ? `from ${new Date(upcomingHoliday.start).toLocaleDateString()} to ${new Date(
            upcomingHoliday.end
          ).toLocaleDateString()}`
        : ""}
    </div>
  );
};

export default HolidayRibbon;
