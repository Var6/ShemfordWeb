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
    answer: "📞 Contact us at +91 9431201060 or email admissions@shemfordpatna.com. We respond within 24 business hours.",
  },
  {
    keywords: ["address", "location", "where", "situated"],
    answer: "📍 Shemford Futuristic School is located in Jaganpur, Patna, Bihar, India.",
  },
  {
    keywords: ["website", "web", "online"],
    answer: "🌐 Visit us at https://shemfordpatna.com or call +91 9431201060 for more information.",
  },

  // Admission
  {
    keywords: ["admission", "admit", "join", "enroll", "apply"],
    answer: "🎓 Admissions are open year-round for Nursery to Class 10. Contact admissions@shemfordpatna.com or call +91 9431201060 to start the process.",
  },
  {
    keywords: ["fee", "cost", "price", "tuition", "charges"],
    answer: "💰 For detailed fee structure, please contact the school directly at +91 9431201060 or visit https://shemfordpatna.com.",
  },
  {
    keywords: ["scholarship", "financial aid", "discount"],
    answer: "🏆 Merit-based scholarships are available. Contact admissions@shemfordpatna.com for detailed information.",
  },
  {
    keywords: ["entrance exam", "test", "assessment", "interview"],
    answer: "📝 Admission includes entrance assessment/interview. Contact the school for details about the process.",
  },

  // Classes & Curriculum
  {
    keywords: ["class", "grade", "standard", "which classes"],
    answer: "📚 We offer classes from Nursery to Class 10 following CBSE curriculum.",
  },
  {
    keywords: ["board", "cbse", "icse", "curriculum"],
    answer: "📖 Shemford follows the CBSE (Central Board of Secondary Education) curriculum with a focus on academic excellence and holistic development.",
  },
  {
    keywords: ["subject", "subjects", "what do you teach"],
    answer: "📚 Primary: English, Mathematics, Science, Social Studies, Hindi. Secondary: Plus Computer Science and Physical Education.",
  },
  {
    keywords: ["medium", "language", "english"],
    answer: "🗣️ The medium of instruction is English.",
  },

  // Timings
  {
    keywords: ["timing", "time", "school hours", "start", "end", "when"],
    answer: "⏰ Primary (Nursery-Class 5): 8:30 AM - 1:30 PM\nSecondary (Class 6-10): 8:30 AM - 3:30 PM\nMonday to Friday",
  },
  {
    keywords: ["hours", "schedule", "timing"],
    answer: "⏰ Primary: 8:30 AM - 1:30 PM | Secondary: 8:30 AM - 3:30 PM",
  },

  // Facilities
  {
    keywords: ["facility", "facilities", "infrastructure", "lab", "sports", "what facilities"],
    answer: "🏢 Facilities include: Smart classrooms, Science labs, Computer lab, Library, Sports ground, Basketball court, Badminton court, Medical room, and Cafeteria.",
  },
  {
    keywords: ["lab", "laboratory", "science", "computer"],
    answer: "🔬 We have modern Science labs, Mathematics lab, and a fully-equipped Computer lab with latest technology.",
  },
  {
    keywords: ["playground", "sports", "athletics", "game"],
    answer: "⚽ Sports facilities include: Sports ground, Basketball court, Badminton court, and various athletics programs.",
  },

  // Activities & Programs
  {
    keywords: ["activity", "activities", "club", "sports", "cultural", "program"],
    answer: "🎭 Activities: Sports, cultural programs, debate, science club, art & music, computer club, scout & guide, environmental club, and annual events.",
  },
  {
    keywords: ["event", "function", "competition", "festival"],
    answer: "🎉 We organize Annual Sports Day, Science Exhibition, Annual Day celebration, and inter-school competitions.",
  },

  // Documents & Requirements
  {
    keywords: ["document", "documents", "required", "birth certificate", "proof"],
    answer: "📋 Required documents: Birth certificate, previous school report card, medical records, address proof, parent ID proof. Contact school for detailed list.",
  },

  // Staff & Teachers
  {
    keywords: ["teacher", "staff", "faculty", "principal", "who teaches"],
    answer: "👨‍🏫 We have experienced faculty dedicated to academic excellence and student development. Visit https://shemfordpatna.com to see our team.",
  },

  // Boarding/Transport
  {
    keywords: ["hostel", "boarding", "bus", "transport", "pickup"],
    answer: "🚌 For information about transport and other facilities, please contact +91 9431201060.",
  },

  // Achievements
  {
    keywords: ["achievement", "result", "success", "award", "rank"],
    answer: "🏆 Our students excel in academics, sports, and cultural activities. For details on achievements, visit our website or contact the school.",
  },

  // Policies
  {
    keywords: ["dress", "uniform", "code"],
    answer: "👔 Formal school uniform is required. Details are provided at the time of admission.",
  },
  {
    keywords: ["attendance", "discipline", "policy", "rule"],
    answer: "📋 75% attendance is mandatory. We maintain strict discipline and have zero tolerance for bullying.",
  },

  // General
  {
    keywords: ["hello", "hi", "hey", "thanks", "thank you"],
    answer: "👋 Hello! I'm Shemford Bot. How can I help you today? Ask about admissions, classes, facilities, or contact us at +91 9431201060.",
  },
  {
    keywords: ["help", "what can you do"],
    answer: "📞 I can help with: Admission info, class details, facilities, school timings, contact information, and more. Ask away!",
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
  return `I don't have that specific information. Please contact us directly:\n📞 Phone: +91 9431201060\n📧 Email: admissions@shemfordpatna.com\n🌐 Website: https://shemfordpatna.com`;
}
