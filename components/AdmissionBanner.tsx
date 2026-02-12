"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function AdmissionBanner() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      {isOpen && (
        <div className="w-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 py-3 px-4 animate-pulse border-b-4 border-orange-600">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <p className="text-white font-bold text-lg">ADMISSIONS NOW OPEN!</p>
                <p className="text-orange-100 text-sm">Secure your seat at Shemford Futuristic School</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-orange-900 transition p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
