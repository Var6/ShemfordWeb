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
    <div className="mx-auto w-full max-w-7xl rounded-[26px] border border-orange-200/80 bg-gradient-to-r from-orange-100 via-yellow-50 to-white px-4 py-3 text-center text-sm font-semibold text-slate-900 shadow-lg shadow-orange-200/20 ring-1 ring-orange-200/40 mb-4">
      <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-sm">
        🎉 Holiday Alert
      </span>
      <span className="ml-3">
        {upcomingHoliday.title}{" "}
        {upcomingHoliday.date
          ? `on ${new Date(upcomingHoliday.date).toLocaleDateString()}`
          : upcomingHoliday.start && upcomingHoliday.end
          ? `from ${new Date(upcomingHoliday.start).toLocaleDateString()} to ${new Date(
              upcomingHoliday.end
            ).toLocaleDateString()}`
          : ""}
      </span>
    </div>
  );
};

export default HolidayRibbon;
