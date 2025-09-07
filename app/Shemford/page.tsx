"use client";
import { useState } from "react";
import Link from "next/link";

export default function ShemfordPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const sections = [
    { id: "achievements", title: "Achievements", icon: "🏆", path: "/Shemford/achievements", color: "bg-yellow-500" },
    { id: "announcements", title: "Announcements", icon: "📢", path: "/Shemford/announcements", color: "bg-blue-500" },
    { id: "calender", title: "Calendar", icon: "📅", path: "/Shemford/calender", color: "bg-green-500" },
    { id: "events", title: "Events", icon: "🎉", path: "/Shemford/events", color: "bg-purple-500" },
    { id: "facilities", title: "Facilities", icon: "🏢", path: "/Shemford/facilities", color: "bg-indigo-500" },
    { id: "faculties", title: "Faculties", icon: "👨‍🏫", path: "/Shemford/faculties", color: "bg-red-500" },
  ];

  const quickStats = [
    { label: "Total Achievements", value: "156", change: "+12", color: "text-yellow-600" },
    { label: "Active Announcements", value: "8", change: "+3", color: "text-blue-600" },
    { label: "Upcoming Events", value: "23", change: "+5", color: "text-purple-600" },
    { label: "Faculty Members", value: "87", change: "+2", color: "text-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-24">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shemford Admin Panel
            </h1>
            <div className="flex items-center space-x-4">
              <Link 
                href="/api/logout"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    <span className={`ml-2 text-sm font-medium ${stat.color}`}>+{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sections.map((section) => (
            <Link key={section.id} href={section.path}>
              <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {section.icon}
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-gray-600 text-sm">Manage {section.title.toLowerCase()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">New achievement added: Science Fair Winner</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Event scheduled: Annual Sports Day</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Announcement published: Holiday Notice</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Faculty profile updated: Er. Rishabh Ranjan</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/Shemford/achievements">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Add Achievement
                </button>
              </Link>
              <Link href="/Shemford/announcements">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  New Announcement
                </button>
              </Link>
              <Link href="/Shemford/events">
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Schedule Event
                </button>
              </Link>
              <Link href="/Shemford/faculties">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Manage Faculty
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
              <div className="text-gray-600 text-sm">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1,245</div>
              <div className="text-gray-600 text-sm">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">42</div>
              <div className="text-gray-600 text-sm">Active Programs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}