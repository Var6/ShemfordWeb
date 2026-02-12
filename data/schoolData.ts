/**
 * Shemford Futuristic School - Knowledge Base
 * Used by AI Chatbot to provide accurate information
 * Last Updated: February 2026
 */

export const schoolData = {
  // Basic Information
  school: {
    name: "Shemford Futuristic School",
    tagline: "Premier CBSE School in Jaganpur, Patna, Bihar - Quality Education with Modern Facilities",
    established: "2015",
    type: "Co-educational",
    board: "CBSE (Central Board of Secondary Education)",
  },

  // Location & Contact
  contact: {
    phone: "+91 9431201060",
    email: "admissions@shemfordpatna.com",
    website: "https://shemfordpatna.com",
    address: "Jaganpur, Patna, Bihar, India",
    city: "Patna",
    state: "Bihar",
    country: "India",
    responseTime: "Within 24 business hours",
  },

  // Academic Information
  academics: {
    classes: "Nursery to Class 10",
    curriculum: "CBSE (Central Board of Secondary Education)",
    mediumOfInstruction: "English",
    focusAreas: [
      "Academic Excellence",
      "Holistic Development",
      "Technology Integration",
      "Life Skills",
      "Character Building",
    ],
    subjects: {
      primary: ["English", "Mathematics", "Science", "Social Studies", "Hindi"],
      secondary: [
        "English",
        "Mathematics",
        "Science",
        "Social Studies",
        "Hindi",
        "Computer Science",
        "Physical Education",
      ],
    },
  },

  // Facilities
  facilities: [
    "Modern Classrooms with Smart Boards",
    "Science Laboratories",
    "Mathematics Lab",
    "Computer Lab with Latest Technology",
    "Library with Digital Resources",
    "Sports Ground",
    "Basketball Court",
    "Badminton Court",
    "Cafeteria",
    "Medical Room",
    "Parking Area",
    "Secure Campus with CCTV",
  ],

  // Admission
  admission: {
    status: "Open",
    classesAvailable: "Nursery to Class 10",
    process: [
      "1. Submit Application Form",
      "2. Attend Entrance Assessment/Interview",
      "3. Document Verification",
      "4. Admission Confirmation",
    ],
    requiredDocuments: [
      "Birth Certificate",
      "Previous School Report Card",
      "Medical Records",
      "Address Proof",
      "Parent/Guardian ID Proof",
    ],
    feeStructure: "Please contact school for detailed fee structure",
    scholarship: "Merit-based scholarships available (contact for details)",
    admissionContact: "admissions@shemfordpatna.com",
    admissionPhone: "+91 9431201060",
  },

  // School Timings
  timings: {
    primary: "8:30 AM - 1:30 PM",
    secondary: "8:30 AM - 3:30 PM",
    mondayToFriday: "Monday to Friday",
    saturday: "Saturday (as per school calendar)",
    sunday: "Closed",
    officeHours: "9:00 AM - 4:00 PM (Monday to Friday)",
  },

  // Co-curricular Activities
  activities: [
    "Sports (Cricket, Badminton, Basketball, Athletics)",
    "Cultural Programs",
    "Debate & Public Speaking",
    "Science Club",
    "Art & Music",
    "Computer Club",
    "Scout & Guide",
    "Environmental Club",
    "Annual Sports Day",
    "Science Exhibition",
    "Annual Day Celebration",
  ],

  // Achievement Areas
  achievements: [
    "High Success Rate in CBSE Board Exams",
    "Sports Excellence at Inter-school Competitions",
    "Science & Mathematics Olympiad Participants",
    "Cultural Recognition at State Level",
    "Technology Integration in Learning",
    "Student Welfare & Discipline Awards",
  ],

  // Support Services
  services: [
    "Counseling Services",
    "Academic Support Classes",
    "Remedial Teaching",
    "Talent Development Programs",
    "Parent-Teacher Meetings (Monthly)",
    "Progress Reports",
    "Health & Wellness Programs",
  ],

  // Important Dates (Generic)
  importantDates: {
    admissionOpen: "Throughout the year",
    admissionDeadline: "Contact school for class-specific deadlines",
    sessionStart: "June/July (Academic Year)",
    sessionEnd: "May (Academic Year)",
    summerVacation: "May-June",
    winterVacation: "December-January",
    annualDay: "Varies (Usually November-December)",
  },

  // Policies
  policies: {
    dresscode: "Formal school uniform (Details available at admission)",
    attendance: "Minimum 75% attendance required",
    discipline: "Strict discipline policy maintained",
    bullyingPolicy: "Zero tolerance for bullying",
    technologyPolicy: "Mobile phones not allowed during school hours",
  },

  // Social Media
  socialMedia: {
    facebook: "https://www.facebook.com/shemfordschoolpatna",
    twitter: "https://twitter.com/shemford_patna",
    instagram: "https://instagram.com/shemfordschoolpatna",
    youtube: "https://www.youtube.com/channel/UCVsGbdY1le2-XPoCq2z6Ccg",
    telegram: "https://t.me/shemfordschoolpatna",
  },
};

/**
 * Formatted knowledge base string for AI system prompt
 * This ensures the chatbot has structured information to reference
 */
export const formattedSchoolData = `
SHEMFORD FUTURISTIC SCHOOL - KNOWLEDGE BASE
============================================

SCHOOL INFORMATION:
- Name: ${schoolData.school.name}
- Board: ${schoolData.school.board}
- Classes: ${schoolData.academics.classes}
- Address: ${schoolData.contact.address}
- Phone: ${schoolData.contact.phone}
- Email: ${schoolData.contact.email}
- Website: ${schoolData.contact.website}

ACADEMIC DETAILS:
- Curriculum: ${schoolData.academics.curriculum}
- Medium: ${schoolData.academics.mediumOfInstruction}
- Focus Areas: ${schoolData.academics.focusAreas.join(", ")}

FACILITIES:
${schoolData.facilities.map((f) => `- ${f}`).join("\n")}

SCHOOL TIMINGS:
- Primary (Nursery-Class 5): ${schoolData.timings.primary}
- Secondary (Class 6-10): ${schoolData.timings.secondary}
- Days: ${schoolData.timings.mondayToFriday}
- Office Hours: ${schoolData.timings.officeHours}

ADMISSION:
- Status: ${schoolData.admission.status}
- Classes: ${schoolData.admission.classesAvailable}
- Contact: ${schoolData.admission.admissionContact} | ${schoolData.admission.admissionPhone}
- Fee Structure: Contact school for details
- Scholarships: Merit-based scholarships available

CO-CURRICULAR ACTIVITIES:
${schoolData.activities.map((a) => `- ${a}`).join("\n")}

IMPORTANT POLICY:
- Attendance: ${schoolData.policies.attendance}
- Discipline: ${schoolData.policies.discipline}
- Dress Code: ${schoolData.policies.dresscode}

CONTACT US:
- Phone: ${schoolData.contact.phone}
- Email: ${schoolData.contact.email}
- Website: ${schoolData.contact.website}
- Response Time: ${schoolData.contact.responseTime}

---

IMPORTANT RULES FOR RESPONSES:
1. ONLY use information from this knowledge base
2. If information is not available, respond: "I don't have that specific information. Please contact the school at ${schoolData.contact.phone} or ${schoolData.contact.email}"
3. Never guess, assume, or provide information not in this knowledge base
4. Always be professional and helpful
5. Direct specific queries to the contact channels
6. Encourage visitors to visit the school for campus tours
`;
