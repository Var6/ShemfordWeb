
export default function EventsPage() {
  const events = [
    { title: 'Science Fair 2025', date: 'March 20, 2025', description: 'Showcase your innovative projects.' },
    { title: 'Annual Sports Meet', date: 'April 5, 2025', description: 'Join us for an action-packed sports event.' },
    { title: 'Cultural Fest', date: 'May 10, 2025', description: 'Experience diverse cultural performances.' },
  ];

  return (
    <div className={`min-h-screen p-5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all w-full`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upcoming Events & Notifications</h1>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
