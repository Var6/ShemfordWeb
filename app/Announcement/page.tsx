'use client';

import { useState } from 'react';

interface Announcement {
  id: number;
  title: string;
  date: string;
  description: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Exam Date Sheet Released',
    date: 'March 15, 2025',
    description: 'The final exam date sheet for all grades has been published. Students are advised to check the schedule and prepare accordingly.',
  },
  {
    id: 2,
    title: 'Syllabus Update',
    date: 'March 10, 2025',
    description: 'A minor update has been made to the syllabus for Grade 10 Science. Please download the latest syllabus from the student portal.',
  },
  {
    id: 3,
    title: 'Exam Date Sheet Released',
    date: 'March 15, 2025',
    description: 'The final exam date sheet for all grades has been published. Students are advised to check the schedule and prepare accordingly.',
  },
  {
    id: 4,
    title: 'Syllabus Update',
    date: 'March 10, 2025',
    description: 'A minor update has been made to the syllabus for Grade 10 Science. Please download the latest syllabus from the student portal.',
  },
];

export default function AnnouncementsPage() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 " >
      <h1 className="text-3xl font-bold text-center mb-6">Announcements</h1>
      
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-4 text-left flex-row border rounded-lg shadow-md bg-white hover:shadow-lg dark:bg-gray-800">
            <h2 className="text-xl font-semibold">{announcement.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{announcement.date}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setSelectedAnnouncement(announcement)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg">
            <h2 className="text-2xl font-bold">{selectedAnnouncement.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{selectedAnnouncement.date}</p>
            <p className="mb-4">{selectedAnnouncement.description}</p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => setSelectedAnnouncement(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}