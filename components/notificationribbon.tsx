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
    <div className="mx-auto w-full max-w-7xl rounded-[32px] border border-orange-300/90 bg-gradient-to-r from-orange-200 via-amber-100 to-white p-4 text-center shadow-2xl shadow-orange-200/20 mb-4 ring-1 ring-orange-200/40">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-center md:gap-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-white shadow-sm">
          🎉 Holiday Alert
        </span>
        <p className="text-sm font-semibold text-slate-900 md:text-base">
          {upcomingHoliday.title}{" "}
          {upcomingHoliday.date
            ? `on ${new Date(upcomingHoliday.date).toLocaleDateString()}`
            : upcomingHoliday.start && upcomingHoliday.end
            ? `from ${new Date(upcomingHoliday.start).toLocaleDateString()} to ${new Date(
                upcomingHoliday.end
              ).toLocaleDateString()}`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default HolidayRibbon;
