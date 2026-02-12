/**
 * Local Q&A System - No API Required
 * Answers common questions about Shemford without needing OpenAI
 * Fallback when API quota is exhausted
 */

interface QAEntry {
  keywords: string[];
  answer: string;
}

export const schoolQA: QAEntry[] = [
  // Contact & Basic Info
  {
    keywords: ["contact", "phone", "call", "number", "email"],
    answer: "📞 Contact Shemford:\n\n📱 Phone: +91 9431201060\n📧 Email: admissions@shemfordpatna.com\n⏱️ Response Time: 24 business hours",
  },
  {
    keywords: ["address", "location", "where", "situated"],
    answer: "📍 Shemford Futuristic School\nJaganpur, Patna, Bihar, India",
  },
  {
    keywords: ["website", "web", "online"],
    answer: "🌐 Official Website: https://shemfordpatna.com\n\nCall us: +91 9431201060 for more details",
  },

  // Admission
  {
    keywords: ["admission", "admit", "join", "enroll", "apply"],
    answer: "🎓 Admissions Open\n\n✓ Classes: Nursery to Class 10\n✓ Admissions: Year-round\n✓ Contact: admissions@shemfordpatna.com\n✓ Phone: +91 9431201060",
  },
  {
    keywords: ["fee", "cost", "price", "tuition", "charges"],
    answer: "💰 Fee Structure\n\nFor detailed fee information, please contact:\n📱 +91 9431201060\n🌐 https://shemfordpatna.com\n\nOur admissions team will provide complete details.",
  },
  {
    keywords: ["scholarship", "financial aid", "discount"],
    answer: "🏆 Scholarships Available\n\n✓ Merit-based scholarships offered\n✓ Contact: admissions@shemfordpatna.com\n✓ Phone: +91 9431201060\n\nWe look forward to welcoming talented students!",
  },
  {
    keywords: ["entrance exam", "test", "assessment", "interview"],
    answer: "📝 Admission Process\n\n1️⃣ Application Form Submission\n2️⃣ Entrance Assessment/Interview\n3️⃣ Document Verification\n4️⃣ Admission Confirmation\n\nContact school for details: +91 9431201060",
  },

  // Classes & Curriculum
  {
    keywords: ["class", "grade", "standard", "which classes"],
    answer: "📚 Our Classes\n\nNursery → Class 10\nCBSE Curriculum\n✓ Comprehensive education\n✓ Holistic development",
  },
  {
    keywords: ["board", "cbse", "icse", "curriculum"],
    answer: "📖 CBSE Curriculum\n\n✓ Central Board of Secondary Education\n✓ Focus: Academic Excellence\n✓ Emphasis: Holistic Development\n✓ Modern Teaching Methods",
  },
  {
    keywords: ["subject", "subjects", "what do you teach"],
    answer: "📚 Subjects Offered\n\nPrimary:\n✓ English\n✓ Mathematics\n✓ Science\n✓ Social Studies\n✓ Hindi\n\nSecondary (Plus):\n✓ Computer Science\n✓ Physical Education",
  },
  {
    keywords: ["medium", "language", "english"],
    answer: "🗣️ Medium of Instruction: English",
  },

  // Timings
  {
    keywords: ["timing", "time", "school hours", "start", "end", "when"],
    answer: "⏰ School Timings\n\n📍 Primary (Nursery-Class 5):\n8:30 AM - 1:30 PM\n\n📍 Secondary (Class 6-10):\n8:30 AM - 3:30 PM\n\n📅 Days: Monday to Friday",
  },
  {
    keywords: ["hours", "schedule"],
    answer: "⏰ Quick Timings\n\nPrimary: 8:30 AM - 1:30 PM\nSecondary: 8:30 AM - 3:30 PM\nMonday - Friday",
  },

  // Facilities
  {
    keywords: ["facility", "facilities", "infrastructure", "what facilities"],
    answer: "🏢 Modern Facilities\n\n✓ Smart Classrooms\n✓ Science & Math Labs\n✓ Computer Lab\n✓ Library with Resources\n✓ Sports Facilities\n✓ Medical Room\n✓ Cafeteria",
  },
  {
    keywords: ["lab", "laboratory", "science", "computer"],
    answer: "🔬 Laboratory Facilities\n\n✓ Modern Science Lab\n✓ Mathematics Lab\n✓ Fully-equipped Computer Lab\n✓ Latest Technology\n✓ Hands-on Learning",
  },
  {
    keywords: ["playground", "sports", "athletics", "game"],
    answer: "⚽ Sports Facilities\n\n✓ Sports Ground\n✓ Basketball Court\n✓ Badminton Court\n✓ Athletics Programs\n✓ Various Sports Activities",
  },

  // Activities & Programs
  {
    keywords: ["activity", "activities", "club", "sports", "cultural", "program"],
    answer: "🎭 Co-Curricular Activities\n\n✓ Sports Programs\n✓ Cultural Programs\n✓ Debate & Public Speaking\n✓ Science Club\n✓ Art & Music\n✓ Computer Club\n✓ Scout & Guide\n✓ Environmental Club",
  },
  {
    keywords: ["event", "function", "competition", "festival"],
    answer: "🎉 Annual Events\n\n✓ Annual Sports Day\n✓ Science Exhibition\n✓ Annual Day Celebration\n✓ Inter-school Competitions\n✓ Cultural Festivals",
  },

  // Documents & Requirements
  {
    keywords: ["document", "documents", "required", "birth certificate", "proof"],
    answer: "📋 Required Documents\n\n✓ Birth Certificate\n✓ Previous School Report Card\n✓ Medical Records\n✓ Address Proof\n✓ Parent/Guardian ID Proof\n\nContact school for complete list: +91 9431201060",
  },

  // Staff & Teachers
  {
    keywords: ["teacher", "staff", "faculty", "principal", "who teaches"],
    answer: "👨‍🏫 Our Faculty\n\n✓ Experienced Teachers\n✓ Qualified & Trained\n✓ Student-Focused Approach\n✓ Dedicated to Development\n\nMeet our team: https://shemfordpatna.com",
  },

  // Transport
  {
    keywords: ["hostel", "boarding", "bus", "transport", "pickup"],
    answer: "🚌 Transport Information\n\nFor details about school buses and pickup routes:\n📞 Call: +91 9431201060\n📧 Email: admissions@shemfordpatna.com",
  },

  // Achievements
  {
    keywords: ["achievement", "result", "success", "award", "rank"],
    answer: "🏆 Our Achievements\n\n✓ Academic Excellence\n✓ Sports Achievements\n✓ Cultural Recognition\n✓ Student Success Stories\n\nVisit: https://shemfordpatna.com for more details",
  },

  // Policies
  {
    keywords: ["dress", "uniform", "code"],
    answer: "👔 School Uniform\n\nFormal school uniform is required.\nDetails provided at admission time.",
  },
  {
    keywords: ["attendance", "discipline", "policy", "rule"],
    answer: "📋 School Policies\n\n✓ Attendance: 75% mandatory\n✓ Discipline: Strictly maintained\n✓ Bullying: Zero tolerance\n✓ Code of Conduct: Enforced",
  },

  // General
  {
    keywords: ["hello", "hi", "hey", "thanks", "thank you"],
    answer: "👋 Hello! I'm Shemford Bot.\n\nI can help you with:\n✓ Admissions\n✓ Classes & Curriculum\n✓ School Facilities\n✓ Contact Information\n✓ Events & Activities\n\nHow can I assist you today?",
  },
  {
    keywords: ["help", "what can you do"],
    answer: "📞 I'm Here to Help!\n\nI can answer questions about:\n✓ Admission Process\n✓ Classes (Nursery-10)\n✓ School Facilities\n✓ Timings & Schedule\n✓ Contact Information\n✓ Activities & Events\n\nWhat would you like to know?",
  },
];

/**
 * Find best matching Q&A entry based on user input
 */
export function findAnswer(userQuestion: string): string | null {
  const lowerQuestion = userQuestion.toLowerCase();

  // Score each QA entry based on keyword matches
  let bestMatch: QAEntry | null = null;
  let bestScore = 0;

  for (const qa of schoolQA) {
    const matchCount = qa.keywords.filter((keyword) =>
      lowerQuestion.includes(keyword.toLowerCase())
    ).length;

    if (matchCount > bestScore) {
      bestScore = matchCount;
      bestMatch = qa;
    }
  }

  return bestMatch ? bestMatch.answer : null;
}

/**
 * Generate chatbot response using local Q&A
 */
export function generateLocalResponse(userQuestion: string): string {
  const answer = findAnswer(userQuestion);

  if (answer) {
    return answer;
  }

  // Fallback if no match found
  return `I don't have that information right now.\n\nPlease contact us directly:\n\n📞 Phone: +91 9431201060\n📧 Email: admissions@shemfordpatna.com\n🌐 Website: https://shemfordpatna.com\n\nWe're here to help! ✨`;
}
