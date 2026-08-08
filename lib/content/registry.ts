import type { Registry } from "./types";

/**
 * Every editable string and image on the public site.
 *
 * `default` is the text/image the page shipped with, so an empty database
 * renders exactly what was there before. The admin editor at
 * /Shemford/content is generated from this file — adding a field here makes
 * it editable, no UI work required.
 */

const ICON_OPTIONS = [
  { label: "Building", value: "Building2" },
  { label: "Users", value: "Users" },
  { label: "Medal", value: "Medal" },
  { label: "Check", value: "CheckCircle" },
  { label: "Book", value: "BookOpen" },
  { label: "Award", value: "Award" },
  { label: "Star", value: "Star" },
  { label: "Trophy", value: "Trophy" },
  { label: "Heart", value: "Heart" },
  { label: "Target", value: "Target" },
  { label: "Sparkles", value: "Sparkles" },
  { label: "Globe", value: "Globe" },
  { label: "Lightbulb", value: "Lightbulb" },
  { label: "Shield", value: "Shield" },
  { label: "Rocket", value: "Rocket" },
  { label: "Graduation Cap", value: "GraduationCap" },
];

export const REGISTRY: Registry = {
  /* ─────────────────────────── Global ─────────────────────────── */
  site: {
    label: "Global (header, footer, contact)",
    path: "/",
    icon: "🌐",
    groups: [
      {
        label: "Identity",
        fields: [
          { type: "text", key: "name", label: "School name", default: "Shemford Futuristic School" },
          { type: "text", key: "shortName", label: "Short name (footer logo)", default: "Shemford" },
          { type: "text", key: "tagline", label: "Tagline under logo", default: "Futuristic School" },
          { type: "image", key: "logo", label: "Logo", default: "/icon.png" },
          {
            type: "textarea",
            key: "description",
            label: "Site description (SEO)",
            default:
              "Premier CBSE School in Jaganpur, Patna, Bihar - Quality Education with Modern Facilities",
          },
        ],
      },
      {
        label: "Contact details",
        fields: [
          {
            type: "textarea",
            key: "address",
            label: "Address",
            default: "Jaganpura Road, Udaini, Patna, Bihar 804453",
          },
          { type: "text", key: "phone", label: "Phone (display)", default: "+91 94312 01060" },
          { type: "text", key: "phoneHref", label: "Phone (dial link)", default: "+919431201060" },
          { type: "text", key: "email", label: "General email", default: "info@shemfordpatna.com" },
          {
            type: "text",
            key: "admissionsEmail",
            label: "Admissions email",
            default: "admissions@shemfordpatna.com",
          },
          {
            type: "link",
            key: "mapEmbed",
            label: "Google Maps embed URL",
            default:
              "https://maps.google.com/maps?width=600&height=400&hl=en&q=SHEMFORD%20Futuristic%20School%20Patna&t=&z=13&ie=UTF8&iwloc=B&output=embed",
          },
          {
            type: "link",
            key: "mapLink",
            label: "Google Maps directions URL",
            default: "https://maps.google.com/?q=SHEMFORD+Futuristic+School+Patna",
          },
        ],
      },
      {
        label: "Social links",
        fields: [
          {
            type: "link",
            key: "facebook",
            label: "Facebook",
            default: "https://www.facebook.com/shemfordschoolpatna",
          },
          {
            type: "link",
            key: "instagram",
            label: "Instagram",
            default: "https://instagram.com/shemfordschoolpatna",
          },
          {
            type: "link",
            key: "youtube",
            label: "YouTube",
            default: "https://www.youtube.com/channel/UCVsGbdY1le2-XPoCq2z6Ccg",
          },
          {
            type: "link",
            key: "twitter",
            label: "Twitter / X",
            default: "https://twitter.com/shemford_patna?lang=en",
          },
        ],
      },
      {
        label: "Header navigation",
        fields: [
          {
            type: "list",
            key: "navItems",
            label: "Menu items",
            fields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "Link", type: "link" },
            ],
            default: [
              { label: "Admission", href: "/admission" },
              { label: "About Us", href: "/about" },
              { label: "CBSE", href: "/CBSE" },
              { label: "Events", href: "/Events" },
              { label: "Contact", href: "/contact" },
            ],
          },
        ],
      },
      {
        label: "Footer",
        fields: [
          {
            type: "textarea",
            key: "footerBlurb",
            label: "Footer intro paragraph",
            default:
              "Premier CBSE school in Jaganpur, Patna, Bihar — nurturing curious minds and building confident, capable citizens since 2012.",
          },
          {
            type: "text",
            key: "footerQuickLinksTitle",
            label: "Column 1 heading",
            default: "Quick Links",
          },
          {
            type: "list",
            key: "footerQuickLinks",
            label: "Column 1 links",
            fields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "Link", type: "link" },
            ],
            default: [
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Admissions", href: "/admission" },
              { label: "Campus", href: "/Campus" },
              { label: "Events", href: "/Events" },
              { label: "Contact Us", href: "/contact" },
            ],
          },
          {
            type: "text",
            key: "footerAcademicsTitle",
            label: "Column 2 heading",
            default: "Academics",
          },
          {
            type: "list",
            key: "footerAcademicLinks",
            label: "Column 2 links",
            fields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "Link", type: "link" },
            ],
            default: [
              { label: "CBSE Disclosure", href: "/CBSE" },
              { label: "Academic Calendar", href: "/Calender" },
              { label: "Our Faculties", href: "/Faculties" },
              { label: "Facilities", href: "/Facilities" },
              { label: "Achievements", href: "/Achivement" },
              { label: "Announcements", href: "/Announcement" },
            ],
          },
          { type: "text", key: "footerMapTitle", label: "Map column heading", default: "Find Us" },
          {
            type: "text",
            key: "footerDirectionsLabel",
            label: "Directions link label",
            default: "Get Directions",
          },
          {
            type: "text",
            key: "footerCopyright",
            label: "Copyright line (© and year are added automatically)",
            default: "SHEMFORD Futuristic School, Patna. All rights reserved.",
          },
          {
            type: "list",
            key: "footerBottomLinks",
            label: "Bottom bar links",
            fields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "Link", type: "link" },
            ],
            default: [
              { label: "CBSE Disclosure", href: "/CBSE/Disclouser" },
              { label: "Admissions", href: "/admission" },
              { label: "Contact", href: "/contact" },
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────── Home ─────────────────────────── */
  home: {
    label: "Home page",
    path: "/",
    icon: "🏠",
    groups: [
      {
        label: "Hero carousel",
        fields: [
          {
            type: "imageList",
            key: "hero.images",
            label: "Carousel images",
            help: "Shown in order, after the intro video.",
            default: [
              "/assets/banner1.jpg",
              "/assets/banner2.jpg",
              "/assets/banner3.jpg",
              "/assets/banner4.jpg",
              "/assets/banner5.jpg",
            ],
          },
          {
            type: "link",
            key: "hero.videoUrl",
            label: "Hero video URL",
            help: "Leave empty to show only images.",
            default:
              "https://res.cloudinary.com/doef42j0e/video/upload/q_auto,f_auto/shemford_hero",
          },
        ],
      },
      {
        label: "Statistics strip",
        fields: [
          {
            type: "list",
            key: "stats",
            label: "Stat cards",
            fields: [
              { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
              { key: "value", label: "Big number", type: "text" },
              { key: "label", label: "Label", type: "text" },
              { key: "desc", label: "Small description", type: "text" },
            ],
            default: [
              {
                icon: "Building2",
                value: "15+",
                label: "Modern Facilities",
                desc: "Labs, libraries & smart classrooms",
              },
              {
                icon: "Users",
                value: "500+",
                label: "Active Students",
                desc: "Pre-Primary to Class XII",
              },
              {
                icon: "Medal",
                value: "95%+",
                label: "Board Results",
                desc: "Consistent CBSE excellence",
              },
              {
                icon: "CheckCircle",
                value: "CBSE",
                label: "Affiliated",
                desc: "Nationally recognised curriculum",
              },
            ],
          },
        ],
      },
      {
        label: "Welcome section",
        fields: [
          { type: "text", key: "welcome.eyebrow", label: "Eyebrow", default: "Welcome to" },
          {
            type: "text",
            key: "welcome.title",
            label: "Heading",
            default: "Shemford Futuristic School,",
          },
          {
            type: "text",
            key: "welcome.titleHighlight",
            label: "Heading (highlighted word)",
            default: "Patna",
          },
          {
            type: "textarea",
            key: "welcome.body1",
            label: "First paragraph",
            default:
              "At Shemford Futuristic School, we believe that the purpose of education extends far beyond examinations — it is the deliberate cultivation of character, curiosity, and capability. Rooted in the CBSE framework and enriched by the proprietary ShemEduMAX™ system, every child who walks through our doors is prepared not just for a board result, but for life.",
          },
          {
            type: "textarea",
            key: "welcome.body2",
            label: "Second paragraph",
            default:
              "We have integrated a School Integrated Programme featuring pre-foundation and foundation tracks for IIT-JEE and NEET from the very first years of secondary schooling. Alongside rigorous academics, our students thrive in world-class sports infrastructure, performing arts, coding labs, and student-led clubs — because at Shemford, excellence is holistic.",
          },
          {
            type: "text",
            key: "welcome.ctaLabel",
            label: "Button label",
            default: "Discover Our Story →",
          },
          { type: "link", key: "welcome.ctaHref", label: "Button link", default: "/about" },
          {
            type: "image",
            key: "welcome.image",
            label: "Section image",
            default: "/assets/MainBG.jpg",
          },
        ],
      },
      {
        label: "Why Shemford section",
        fields: [
          {
            type: "text",
            key: "why.eyebrow",
            label: "Eyebrow",
            default: "Best CBSE School in Patna",
          },
          { type: "text", key: "why.title", label: "Heading", default: "ShemEduMAX™" },
          {
            type: "textarea",
            key: "why.body1",
            label: "First paragraph",
            default:
              "Designed by award-winning educationists, ShemEduMAX™ is our proprietary learning system — the result of years of rigorous research and real-world classroom experience. It breathes life and purpose into every lesson.",
          },
          {
            type: "textarea",
            key: "why.body2",
            label: "Second paragraph",
            default:
              "ShemEduMAX™ equips students with the knowledge, skills, and emotional resilience to navigate the complex demands of modern society — not merely as performers, but as thoughtful, responsible individuals who lead with integrity.",
          },
          { type: "image", key: "why.image", label: "Section image", default: "/Whyus.png" },
          {
            type: "text",
            key: "why.scrollTitle",
            label: "Scroll card heading",
            default: "Why Choose Shemford Futuristic School?",
          },
          {
            type: "image",
            key: "why.scrollImage",
            label: "Scroll card image",
            default: "/assets/whyshemford.jpg",
          },
          {
            type: "list",
            key: "why.pillars",
            label: "Pillars",
            fields: [
              { key: "title", label: "Title", type: "text" },
              { key: "desc", label: "Description", type: "textarea" },
            ],
            default: [
              {
                title: "Positive Attitude Towards Learning",
                desc: "We nurture intrinsic motivation so students pursue knowledge for its own joy.",
              },
              {
                title: "Sound Foundation for a Bright Future",
                desc: "Structured progression from concept to mastery across all disciplines.",
              },
              {
                title: "Powerful Communication Skills",
                desc: "Public speaking, writing, and critical thinking built into every grade.",
              },
              {
                title: "Life-Long Learning Mindset",
                desc: "We teach students how to learn — a skill that outlasts every curriculum.",
              },
              {
                title: "Technology Fluency",
                desc: "Digital literacy, coding, and AI awareness woven into daily learning.",
              },
              {
                title: "Global Collaborative Thinking",
                desc: "Team projects, inter-school exchanges, and a world-aware perspective.",
              },
            ],
          },
        ],
      },
      {
        label: "Notice board",
        fields: [
          { type: "text", key: "notice.eyebrow", label: "Eyebrow", default: "Notice Board" },
          { type: "text", key: "notice.title", label: "Heading", default: "Latest Notices" },
          { type: "text", key: "notice.linkLabel", label: "Link label", default: "View all" },
          { type: "link", key: "notice.linkHref", label: "Link target", default: "/Announcement" },
        ],
      },
      {
        label: "Quotes carousel",
        fields: [
          {
            type: "text",
            key: "quotes.eyebrow",
            label: "Eyebrow",
            default: "Words That Inspire",
          },
          {
            type: "list",
            key: "quotes.items",
            label: "Quotes",
            fields: [
              { key: "quote", label: "Quote", type: "textarea" },
              { key: "author", label: "Author", type: "text" },
              { key: "role", label: "Author role", type: "text" },
            ],
            default: [
              {
                quote: "Education is not the filling of a pail, but the lighting of a fire.",
                author: "William Butler Yeats",
                role: "Poet & Nobel Laureate",
              },
              {
                quote:
                  "The function of education is to teach one to think intensively and to think critically. Intelligence plus character — that is the goal of true education.",
                author: "Dr. Martin Luther King Jr.",
                role: "Civil Rights Leader & Scholar",
              },
              {
                quote:
                  "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
                author: "Benjamin Franklin",
                role: "Founding Father & Philosopher",
              },
            ],
          },
        ],
      },
      {
        label: "Admissions call-to-action",
        fields: [
          { type: "text", key: "cta.eyebrow", label: "Eyebrow", default: "Academic Year 2025–26" },
          { type: "text", key: "cta.title", label: "Heading", default: "Admissions Now Open" },
          {
            type: "textarea",
            key: "cta.body",
            label: "Body text",
            default:
              "Secure your child's place at Patna's most forward-thinking CBSE school. Limited seats available — apply early.",
          },
          { type: "text", key: "cta.primaryLabel", label: "Primary button", default: "Apply Now" },
          { type: "link", key: "cta.primaryHref", label: "Primary link", default: "/contact" },
          {
            type: "text",
            key: "cta.secondaryLabel",
            label: "Secondary button",
            default: "Admission Guide",
          },
          {
            type: "link",
            key: "cta.secondaryHref",
            label: "Secondary link",
            default: "/admission",
          },
        ],
      },
    ],
  },

  /* ─────────────────────────── About ─────────────────────────── */
  about: {
    label: "About page",
    path: "/about",
    icon: "📖",
    groups: [
      {
        label: "Hero",
        fields: [
          {
            type: "text",
            key: "hero.eyebrow",
            label: "Eyebrow",
            default: "Jaganpur, Patna, Bihar — Est. 2012",
          },
          {
            type: "text",
            key: "hero.title",
            label: "Heading",
            default: "About Shemford Futuristic School",
          },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "For over a decade, we have been shaping curious minds, compassionate hearts, and capable citizens — one student at a time.",
          },
        ],
      },
      {
        label: "Core values",
        fields: [
          {
            type: "list",
            key: "values",
            label: "Value cards",
            fields: [
              { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
              { key: "title", label: "Title", type: "text" },
              { key: "desc", label: "Description", type: "textarea" },
            ],
            default: [
              {
                icon: "Target",
                title: "Vision",
                desc: "To be the most trusted destination for forward-thinking education in Bihar — producing graduates who are academically brilliant and deeply humane.",
              },
              {
                icon: "Lightbulb",
                title: "Innovation",
                desc: "We integrate smart classrooms, AI-assisted learning, and the ShemEduMAX™ framework to make every lesson relevant to the world students will inherit.",
              },
              {
                icon: "Users",
                title: "Community",
                desc: "Education is a shared endeavour. We cultivate a culture of mutual respect, active parent partnerships, and collaborative growth among students and staff.",
              },
              {
                icon: "Award",
                title: "Excellence",
                desc: "We hold every child to the highest standard — not to create pressure, but to communicate our deep belief in their unlimited potential.",
              },
            ],
          },
        ],
      },
      {
        label: "Mission",
        fields: [
          { type: "text", key: "mission.title", label: "Heading", default: "Our Mission" },
          {
            type: "textarea",
            key: "mission.body",
            label: "Body text",
            default:
              "At Shemford Futuristic School, our mission is to create an environment where intellectual rigour and human kindness coexist. We are committed to a progressive, inclusive, and challenging education that develops academic excellence, moral character, creative confidence, and emotional intelligence. Through dedicated faculty, modern infrastructure, and the innovative ShemEduMAX™ system, we transform education — inspiring every student to reach their highest potential and contribute meaningfully to society.",
          },
        ],
      },
      {
        label: "Journey timeline",
        fields: [
          { type: "text", key: "timeline.title", label: "Section heading", default: "Our Journey" },
          {
            type: "list",
            key: "timeline.items",
            label: "Timeline entries",
            help: "Images: paste comma-separated image URLs, or upload below in Gallery fields.",
            fields: [
              { key: "title", label: "Period (e.g. 2025 – Present)", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
            default: [
              {
                title: "2025 – Present",
                body: "Shemford enters a new era of excellence — smart classrooms rolled out across all sections, a School Integrated Programme for JEE and NEET introduced, and 100% results achieved in CBSE Board Examinations. Our students now compete and win at state and national levels in academics, sports, and the arts.",
              },
              {
                title: "2018 – 2024",
                body: "Six transformative years of rapid growth. New science laboratories, an expanded computer wing, and a fully stocked library were added. Our students claimed district and state honours in Olympiads, athletics, and cultural competitions, establishing Shemford as a name synonymous with genuine achievement.",
              },
              {
                title: "2012 – Foundation Year",
                body: "Shemford Futuristic School was founded on a single, unwavering conviction: that every child, regardless of background, deserves an education that unlocks their full potential. We began with a small cohort, a passionate founding faculty, and the bold dream of making learning joyful, purposeful, and transformative.",
              },
            ],
          },
          {
            type: "imageList",
            key: "timeline.images1",
            label: "Photos for entry 1",
            default: ["/assets/1.jpg", "/assets/2.jpg", "/assets/3.jpg", "/assets/4.jpg", "/assets/5.jpg"],
          },
          {
            type: "imageList",
            key: "timeline.images2",
            label: "Photos for entry 2",
            default: [
              "/assets/6.jpg",
              "/assets/7.jpeg",
              "/assets/8.jpg",
              "/assets/9.jpeg",
              "/assets/10.jpeg",
            ],
          },
          {
            type: "imageList",
            key: "timeline.images3",
            label: "Photos for entry 3",
            default: [
              "/assets/11.jpeg",
              "/assets/12.jpeg",
              "/assets/13.jpeg",
              "/assets/14.jpeg",
              "/assets/15.jpeg",
            ],
          },
        ],
      },
      {
        label: "Achievements",
        fields: [
          {
            type: "text",
            key: "achievements.title",
            label: "Section heading",
            default: "Our Achievements",
          },
          {
            type: "list",
            key: "achievements.groups",
            label: "Achievement groups",
            help: "Put each bullet on its own line in the Items box.",
            fields: [
              { key: "title", label: "Group title", type: "text" },
              { key: "items", label: "Items (one per line)", type: "textarea" },
            ],
            default: [
              {
                title: "Academic Excellence",
                items:
                  "Consistent 95%+ pass rate in CBSE Board Examinations\nDistinguished performers in JEE Foundation & NEET preparation\nState and national Olympiad medal winners every year\nCBSE affiliated with exemplary compliance record",
              },
              {
                title: "Infrastructure & Facilities",
                items:
                  "Smart classrooms with interactive boards in every section\nFully equipped Physics, Chemistry, Biology & Computer labs\nCurated library with 1,000+ titles across 45+ subjects\nModern auditorium, sports complex, and activity rooms",
              },
              {
                title: "Sports & Co-curricular",
                items:
                  "State-level podium finishes across multiple sports disciplines\nActive representation in inter-school and district competitions\nAnnual cultural festival and student-produced performances\nThriving student clubs in robotics, debate, arts, and more",
              },
              {
                title: "Student Development",
                items:
                  "Holistic growth model blending IQ, EQ, and SQ development\nDedicated counselling and mentorship programme\nStudent-led leadership councils from Class VI onwards\nRegular structured parent–teacher collaboration sessions",
              },
            ],
          },
        ],
      },
      {
        label: "Why choose us",
        fields: [
          {
            type: "text",
            key: "why.title",
            label: "Section heading",
            default: "Why Choose Shemford?",
          },
          {
            type: "list",
            key: "why.items",
            label: "Reasons",
            fields: [
              { key: "title", label: "Title", type: "text" },
              { key: "desc", label: "Description", type: "textarea" },
            ],
            default: [
              {
                title: "Expert, Empathetic Faculty",
                desc: "Our educators are not only subject-matter specialists but also mentors trained in child psychology and modern pedagogy.",
              },
              {
                title: "Future-Ready Technology",
                desc: "From coding labs to AI-integrated classrooms, students gain the digital fluency that every modern career demands.",
              },
              {
                title: "Safe, Nurturing Campus",
                desc: "CCTV-monitored, RO-purified, clean and secure — a campus where parents feel peace of mind and children feel at home.",
              },
              {
                title: "Accessible Excellence",
                desc: "World-class education at a transparent, reasonable fee structure, backed by merit-based scholarships for deserving families.",
              },
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────── Admission ─────────────────────────── */
  admission: {
    label: "Admission page",
    path: "/admission",
    icon: "🎓",
    groups: [
      {
        label: "Hero",
        fields: [
          {
            type: "text",
            key: "hero.eyebrow",
            label: "Eyebrow",
            default: "Academic Year 2025 – 26 · Admissions Open",
          },
          {
            type: "text",
            key: "hero.title",
            label: "Heading",
            default: "Begin an Extraordinary Journey",
          },
          {
            type: "text",
            key: "hero.subtitle",
            label: "Subheading",
            default: "Where every child is seen, inspired, and empowered.",
          },
          {
            type: "textarea",
            key: "hero.body",
            label: "Intro paragraph",
            default:
              "Shemford Futuristic School offers a transformative education rooted in the CBSE framework and elevated by the ShemEduMAX™ system — nurturing future leaders from Pre-Primary through Class XII.",
          },
        ],
      },
      {
        label: "Quick info cards",
        fields: [
          {
            type: "list",
            key: "quickInfo",
            label: "Cards",
            fields: [
              { key: "emoji", label: "Emoji", type: "text" },
              { key: "title", label: "Title", type: "text" },
              { key: "body", label: "Main line", type: "text" },
              { key: "note", label: "Small note", type: "text" },
            ],
            default: [
              {
                emoji: "📅",
                title: "Admission Season",
                body: "January – March (priority window)",
                note: "Limited seats available year-round",
              },
              {
                emoji: "👶",
                title: "Age Eligibility",
                body: "Pre-Primary: 2½+ years",
                note: "CBSE age norms apply for all other classes",
              },
              {
                emoji: "⚡",
                title: "Decision Timeline",
                body: "Results within 7 working days",
                note: "Swift, transparent, and merit-based",
              },
            ],
          },
        ],
      },
      {
        label: "Classes offered",
        fields: [
          {
            type: "text",
            key: "classes.title",
            label: "Section heading",
            default: "Classes We Offer",
          },
          {
            type: "list",
            key: "classes.items",
            label: "Classes",
            fields: [
              { key: "class", label: "Class name", type: "text" },
              { key: "age", label: "Age range", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
            default: [
              {
                class: "Pre-Primary (Nursery – KG)",
                age: "2½ – 5 years",
                description:
                  "A play-centred environment that builds language, motor skills, and social confidence through structured exploration.",
              },
              {
                class: "Primary (Classes I – V)",
                age: "5 – 11 years",
                description:
                  "Strong conceptual foundations in literacy, numeracy, sciences, and the arts — with emphasis on curiosity over rote learning.",
              },
              {
                class: "Secondary (Classes VI – VIII)",
                age: "11 – 14 years",
                description:
                  "Subject specialisation deepens alongside personality development, leadership opportunities, and the ShemEduMAX™ enrichment tracks.",
              },
              {
                class: "Senior Secondary (Classes IX – XII)",
                age: "14 – 18 years",
                description:
                  "Rigorous CBSE board preparation, IIT-JEE / NEET integrated foundation, and dedicated career counselling for every stream.",
              },
            ],
          },
        ],
      },
      {
        label: "Why Shemford",
        fields: [
          { type: "text", key: "why.title", label: "Section heading", default: "Why Shemford?" },
          {
            type: "list",
            key: "why.items",
            label: "Reasons",
            fields: [
              { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
            default: [
              {
                icon: "Award",
                title: "World-Class Infrastructure",
                description:
                  "Smart classrooms, four specialised laboratories, a 1,000+ volume library, and a multi-sport campus — every space is purpose-built for learning.",
              },
              {
                icon: "Users",
                title: "Expert, Caring Faculty",
                description:
                  "Highly qualified educators with progressive training who treat every child as an individual, not a roll number.",
              },
              {
                icon: "Sparkles",
                title: "Holistic Development",
                description:
                  "Academics, sports, performing arts, coding, and community service — because a well-rounded education produces well-rounded human beings.",
              },
              {
                icon: "Target",
                title: "Future-Focused Curriculum",
                description:
                  "The ShemEduMAX™ system integrates 21st-century skills — critical thinking, digital fluency, and global awareness — into every subject.",
              },
            ],
          },
        ],
      },
      {
        label: "Admission process",
        fields: [
          {
            type: "text",
            key: "process.title",
            label: "Section heading",
            default: "Our 4-Step Admission Process",
          },
          {
            type: "list",
            key: "process.steps",
            label: "Steps",
            fields: [
              { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
            default: [
              {
                icon: "BookOpen",
                title: "Submit Application",
                description:
                  "Complete the online form with accurate details about your child and family. Our team reviews every application personally.",
              },
              {
                icon: "Users",
                title: "Assessment & Interaction",
                description:
                  "An age-appropriate interaction session and brief academic assessment help us understand each child's strengths and learning style.",
              },
              {
                icon: "CheckCircle",
                title: "Merit-Based Selection",
                description:
                  "Results are communicated within 7 working days. Selection is transparent, fair, and based on merit and seat availability.",
              },
              {
                icon: "Target",
                title: "Enrolment & Onboarding",
                description:
                  "Complete the joining formalities, collect your welcome kit, and prepare for an extraordinary academic journey.",
              },
            ],
          },
        ],
      },
      {
        label: "Required documents",
        fields: [
          {
            type: "text",
            key: "documents.title",
            label: "Section heading",
            default: "Documents Required",
          },
          {
            type: "textarea",
            key: "documents.items",
            label: "Documents (one per line)",
            default:
              "Original Birth Certificate\nRecent Passport-size Photographs (4 copies)\nImmunisation / Vaccination Certificate\nPrevious School Transfer Certificate (if applicable)\nProof of Residence (utility bill or rental agreement)\nParent / Guardian Government-issued ID Proof",
          },
        ],
      },
      {
        label: "Enquiry form",
        fields: [
          {
            type: "text",
            key: "form.title",
            label: "Form heading",
            default: "Start Your Admission Process",
          },
          {
            type: "textarea",
            key: "form.subtitle",
            label: "Form subheading",
            default:
              "Fill out the form and our admissions team will reach out within 24 hours.",
          },
        ],
      },
      {
        label: "FAQ",
        fields: [
          {
            type: "text",
            key: "faq.title",
            label: "Section heading",
            default: "Frequently Asked Questions",
          },
          {
            type: "list",
            key: "faq.items",
            label: "Questions",
            fields: [
              { key: "q", label: "Question", type: "text" },
              { key: "a", label: "Answer", type: "textarea" },
            ],
            default: [
              {
                q: "When do admissions open?",
                a: "The priority admission window runs from January to March each year. Applications outside this period are reviewed based on seat availability — so early enquiry is always recommended.",
              },
              {
                q: "What is the application and tuition fee structure?",
                a: "We believe in transparency. Please contact our admissions office for the current fee schedule. We also offer flexible payment plans and merit-based financial assistance for deserving families.",
              },
              {
                q: "Do you accept mid-year transfer admissions?",
                a: "Yes. Transfer cases are considered throughout the year subject to seat availability in the respective class. Please contact us with your child's most recent academic records to initiate the process.",
              },
              {
                q: "Are merit scholarships available?",
                a: "Absolutely. We offer merit-based scholarships for academically outstanding students and need-based assistance for families facing financial constraints. Speak to our admissions counsellor for eligibility details.",
              },
              {
                q: "What makes Shemford different from other CBSE schools?",
                a: "Beyond the curriculum, it is our philosophy. The ShemEduMAX™ system, a student-to-teacher ratio that allows personal attention, integrated IIT/NEET preparation, and a campus culture that values both excellence and empathy — these set Shemford apart.",
              },
            ],
          },
        ],
      },
      {
        label: "Closing call-to-action",
        fields: [
          {
            type: "text",
            key: "cta.title",
            label: "Heading",
            default: "Ready to Take the First Step?",
          },
          {
            type: "textarea",
            key: "cta.body",
            label: "Body",
            default:
              "Join hundreds of families who have chosen Shemford as the foundation of their child's future.",
          },
          { type: "text", key: "cta.primaryLabel", label: "Primary button", default: "Apply Now" },
          { type: "link", key: "cta.primaryHref", label: "Primary link", default: "/contact" },
          {
            type: "text",
            key: "cta.secondaryLabel",
            label: "Secondary button",
            default: "Learn More About Us",
          },
          { type: "link", key: "cta.secondaryHref", label: "Secondary link", default: "/about" },
        ],
      },
    ],
  },

  /* ─────────────────────────── Contact ─────────────────────────── */
  contact: {
    label: "Contact page",
    path: "/contact",
    icon: "✉️",
    groups: [
      {
        label: "Heading",
        fields: [
          { type: "text", key: "title", label: "Title", default: "Get In Touch" },
          {
            type: "textarea",
            key: "subtitle",
            label: "Subtitle",
            default: "Have questions about admissions? Reach out to us!",
          },
        ],
      },
    ],
  },

  /* ────────────────── Section pages (hero + labels) ────────────────── */
  cbse: {
    label: "CBSE page",
    path: "/CBSE",
    icon: "📋",
    groups: [
      {
        label: "Hero",
        fields: [
          {
            type: "text",
            key: "hero.eyebrow",
            label: "Eyebrow",
            default: "Shemford Futuristic School",
          },
          { type: "text", key: "hero.title", label: "Heading", default: "CBSE Compliance" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "Transparent disclosures and school information as required by the Central Board of Secondary Education.",
          },
        ],
      },
      {
        label: "Link cards",
        fields: [
          {
            type: "list",
            key: "links",
            label: "Cards",
            fields: [
              { key: "text", label: "Title", type: "text" },
              { key: "href", label: "Link", type: "link" },
              { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
              { key: "desc", label: "Description", type: "textarea" },
            ],
            default: [
              {
                text: "Mandatory Disclosure",
                href: "/CBSE/Disclouser",
                icon: "BookOpen",
                desc: "View all mandatory CBSE disclosures as required by the board.",
              },
              {
                text: "School Information",
                href: "/CBSE/Information",
                icon: "Globe",
                desc: "Detailed information about the school, affiliations, and infrastructure.",
              },
              {
                text: "Pedagogical Information",
                href: "/CBSE/Pedagogical",
                icon: "GraduationCap",
                desc: "Teaching methodology, curriculum, and pedagogical committee details.",
              },
            ],
          },
        ],
      },
    ],
  },

  events: {
    label: "Events page",
    path: "/Events",
    icon: "🎉",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.eyebrow", label: "Eyebrow", default: "School Events" },
          { type: "text", key: "hero.title", label: "Heading", default: "Upcoming Events" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default: "Discover and participate in exciting school activities and programmes.",
          },
        ],
      },
      {
        label: "Labels",
        fields: [
          {
            type: "text",
            key: "featured.eyebrow",
            label: "Featured eyebrow",
            default: "Highlights",
          },
          {
            type: "text",
            key: "featured.title",
            label: "Featured heading",
            default: "Featured Events",
          },
          {
            type: "text",
            key: "searchPlaceholder",
            label: "Search box placeholder",
            default: "Search events…",
          },
          {
            type: "text",
            key: "categories",
            label: "Filter categories (comma separated)",
            default: "All, Academic, Sports, Cultural, Workshop",
          },
          { type: "text", key: "empty.title", label: "Empty state title", default: "No events found" },
          {
            type: "text",
            key: "empty.body",
            label: "Empty state text",
            default: "Try adjusting your search or filter.",
          },
        ],
      },
    ],
  },

  announcements: {
    label: "Announcements page",
    path: "/Announcement",
    icon: "📢",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.eyebrow", label: "Eyebrow", default: "School Notices" },
          { type: "text", key: "hero.title", label: "Heading", default: "Announcements" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default: "Stay updated with the latest news, notices, and school communications.",
          },
        ],
      },
    ],
  },

  achievements: {
    label: "Achievements page",
    path: "/Achivement",
    icon: "🏆",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.title", label: "Heading", default: "Our Achievements" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "Celebrating the milestones, honors, and recognitions that reflect our commitment to academic excellence and holistic development.",
          },
        ],
      },
    ],
  },

  toppers: {
    label: "Toppers page",
    path: "/Toppers",
    icon: "🏅",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.title", label: "Heading", default: "Our Toppers" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "Celebrating the brilliance of our students — from class champions to CBSE board toppers who made Shemford proud.",
          },
        ],
      },
    ],
  },

  calendar: {
    label: "Calendar page",
    path: "/Calender",
    icon: "📅",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.eyebrow", label: "Eyebrow", default: "Academic Year" },
          { type: "text", key: "hero.title", label: "Heading", default: "School Calendar" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default: "Holidays, vacations, and important notices — all in one place.",
          },
        ],
      },
    ],
  },

  campus: {
    label: "Campus page",
    path: "/Campus",
    icon: "🏫",
    groups: [
      {
        label: "Hero",
        fields: [
          {
            type: "text",
            key: "hero.eyebrow",
            label: "Eyebrow",
            default: "Shemford Futuristic School",
          },
          { type: "text", key: "hero.title", label: "Heading", default: "Our Campus" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "World-class facilities designed to nurture learning, creativity, and holistic development.",
          },
          {
            type: "text",
            key: "hero.badges",
            label: "Hero badges (comma separated)",
            default: "Modern Infrastructure, All-Day Access, Premium Facilities",
          },
        ],
      },
      {
        label: "Category filters",
        fields: [
          {
            type: "text",
            key: "searchPlaceholder",
            label: "Search placeholder",
            default: "Search facilities…",
          },
          {
            type: "list",
            key: "categories",
            label: "Categories",
            help: "The ID must match the category saved on each facility — change labels freely, IDs with care.",
            fields: [
              { key: "id", label: "ID", type: "text" },
              { key: "label", label: "Label", type: "text" },
              { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
            ],
            default: [
              { id: "all", label: "All", icon: "Globe" },
              { id: "academic", label: "Academic", icon: "GraduationCap" },
              { id: "arts", label: "Arts & Culture", icon: "Sparkles" },
              { id: "sports", label: "Sports", icon: "Users" },
              { id: "wellness", label: "Health", icon: "Heart" },
              { id: "technology", label: "Technology", icon: "Rocket" },
              { id: "dining", label: "Dining", icon: "Star" },
              { id: "safety", label: "Safety", icon: "Shield" },
              { id: "sustainability", label: "Eco", icon: "Lightbulb" },
              { id: "events", label: "Events", icon: "Trophy" },
            ],
          },
        ],
      },
      {
        label: "Labels & empty state",
        fields: [
          {
            type: "text",
            key: "empty.title",
            label: "Empty state title",
            default: "No facilities found",
          },
          {
            type: "text",
            key: "empty.body",
            label: "Empty state text",
            default: "No facilities in this category.",
          },
          {
            type: "text",
            key: "modal.featuresTitle",
            label: "Modal features heading",
            default: "Key Features",
          },
          {
            type: "text",
            key: "modal.ctaTitle",
            label: "Modal CTA heading",
            default: "Interested in this facility?",
          },
          {
            type: "text",
            key: "modal.ctaBody",
            label: "Modal CTA text",
            default: "Schedule a campus tour today.",
          },
          {
            type: "text",
            key: "modal.ctaButton",
            label: "Modal CTA button",
            default: "Contact Us →",
          },
        ],
      },
    ],
  },

  facilities: {
    label: "Facilities page",
    path: "/Facilities",
    icon: "🏢",
    groups: [
      {
        label: "Hero",
        fields: [
          {
            type: "text",
            key: "hero.eyebrow",
            label: "Eyebrow",
            default: "Shemford Futuristic School",
          },
          { type: "text", key: "hero.title", label: "Heading", default: "Our Facilities" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "Explore the world-class infrastructure and amenities that make Shemford an exceptional place to learn and grow.",
          },
        ],
      },
      {
        label: "Category filters",
        fields: [
          {
            type: "text",
            key: "searchPlaceholder",
            label: "Search placeholder",
            default: "Search facilities…",
          },
          {
            type: "list",
            key: "categories",
            label: "Categories",
            help: "The ID must match the category saved on each facility — change labels freely, IDs with care.",
            fields: [
              { key: "id", label: "ID", type: "text" },
              { key: "label", label: "Label", type: "text" },
            ],
            default: [
              { id: "all", label: "All" },
              { id: "academic", label: "Academic" },
              { id: "arts", label: "Arts & Culture" },
              { id: "sports", label: "Sports" },
              { id: "wellness", label: "Health" },
              { id: "technology", label: "Technology" },
              { id: "dining", label: "Dining" },
              { id: "safety", label: "Safety" },
              { id: "sustainability", label: "Eco" },
              { id: "events", label: "Events" },
            ],
          },
        ],
      },
      {
        label: "Labels & empty state",
        fields: [
          {
            type: "text",
            key: "empty.title",
            label: "Empty state title",
            default: "No facilities found",
          },
          {
            type: "text",
            key: "empty.body",
            label: "Empty state text",
            default: "No facilities in this category.",
          },
          {
            type: "text",
            key: "modal.featuresTitle",
            label: "Modal features heading",
            default: "Key Features",
          },
          {
            type: "text",
            key: "modal.ctaTitle",
            label: "Modal CTA heading",
            default: "Want to learn more?",
          },
          {
            type: "text",
            key: "modal.ctaBody",
            label: "Modal CTA text",
            default: "Schedule a campus tour today.",
          },
          {
            type: "text",
            key: "modal.ctaButton",
            label: "Modal CTA button",
            default: "Contact Us →",
          },
        ],
      },
    ],
  },

  faculties: {
    label: "Faculty page",
    path: "/Faculties",
    icon: "👩‍🏫",
    groups: [
      {
        label: "Hero",
        fields: [
          {
            type: "text",
            key: "hero.eyebrow",
            label: "Eyebrow",
            default: "Shemford Futuristic School",
          },
          { type: "text", key: "hero.title", label: "Heading", default: "Our Faculty" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            help: "Use {count} to insert the number of faculty members.",
            default:
              "Meet our team of {count} dedicated educators committed to nurturing every child's potential.",
          },
        ],
      },
    ],
  },

  grievances: {
    label: "Grievances page",
    path: "/grievances",
    icon: "⚖️",
    groups: [
      {
        label: "Hero",
        fields: [
          {
            type: "text",
            key: "hero.eyebrow",
            label: "Eyebrow",
            default: "Shemford Futuristic School",
          },
          { type: "text", key: "hero.title", label: "Heading", default: "Grievance Redressal" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "We are committed to a transparent, fair, and prompt resolution of every concern raised by our students, parents, and staff.",
          },
        ],
      },
      {
        label: "Form section",
        fields: [
          {
            type: "text",
            key: "form.eyebrow",
            label: "Eyebrow",
            default: "Submit a Grievance",
          },
          { type: "text", key: "form.title", label: "Heading", default: "Tell Us What's Wrong" },
          {
            type: "textarea",
            key: "form.categories",
            label: "Grievance categories (one per line)",
            default:
              "Academic — Teaching Quality\nAcademic — Curriculum / Syllabus\nAdministrative — Fee / Finance\nAdministrative — Records / Documents\nFacility — Infrastructure\nFacility — Safety & Security\nStaff Conduct\nBullying / Ragging\nTransport\nOther",
          },
          {
            type: "textarea",
            key: "form.relationships",
            label: "\"I am a…\" options (one per line)",
            default: "Parent / Guardian\nStudent\nStaff Member\nAlumni\nOther",
          },
        ],
      },
      {
        label: "Assurance cards",
        fields: [
          {
            type: "list",
            key: "cards",
            label: "Cards",
            fields: [
              { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
              { key: "title", label: "Title", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
            default: [
              {
                icon: "Target",
                title: "48-Hour Acknowledgement",
                body: "Every submission is acknowledged within two working days.",
              },
              {
                icon: "Shield",
                title: "Strictly Confidential",
                body: "Your identity and details are protected at every step.",
              },
              {
                icon: "CheckCircle",
                title: "7-Day Resolution Target",
                body: "Most grievances are resolved within 7 working days.",
              },
            ],
          },
        ],
      },
      {
        label: "FAQ",
        fields: [
          {
            type: "text",
            key: "faq.title",
            label: "Section heading",
            default: "Frequently Asked Questions",
          },
          {
            type: "list",
            key: "faq.items",
            label: "Questions",
            fields: [
              { key: "q", label: "Question", type: "text" },
              { key: "a", label: "Answer", type: "textarea" },
            ],
            default: [
              {
                q: "How long will it take to resolve my grievance?",
                a: "We acknowledge all grievances within 48 hours and aim to resolve them within 7 working days. Complex matters may take up to 21 days.",
              },
              {
                q: "Is my submission confidential?",
                a: "Yes. All grievance submissions are handled with strict confidentiality. Your identity will not be disclosed without your consent.",
              },
              {
                q: "Can I submit a grievance anonymously?",
                a: "You may leave the contact fields blank; however, providing contact details allows us to follow up and resolve your concern more effectively.",
              },
              {
                q: "What happens after I submit?",
                a: "Your grievance is reviewed by the Grievance Redressal Committee. You will receive an acknowledgement by email and be informed of the outcome.",
              },
            ],
          },
        ],
      },
    ],
  },

  cbseDisclosure: {
    label: "CBSE · Mandatory Disclosure",
    path: "/CBSE/Disclouser",
    icon: "📄",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.eyebrow", label: "Eyebrow", default: "CBSE Compliance" },
          { type: "text", key: "hero.title", label: "Heading", default: "Mandatory Disclosure" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "All mandatory disclosures as required by the Central Board of Secondary Education.",
          },
        ],
      },
      {
        label: "Disclosure table",
        fields: [
          {
            type: "list",
            key: "rows",
            label: "Table rows",
            help: "Separate multiple emails or phone numbers with a comma.",
            fields: [
              { key: "label", label: "Information", type: "text" },
              { key: "value", label: "Details", type: "textarea" },
              {
                key: "kind",
                label: "Render as",
                type: "select",
                options: [
              { label: "Plain text", value: "text" },
              { label: "Email address(es)", value: "email" },
              { label: "Phone number(s)", value: "phone" },
            ],
              },
            ],
            default: [
              {
                "label": "Name of School",
                "value": "Shemford Futuristic School Patna",
                "kind": "text"
              },
              {
                "label": "Affiliation Number",
                "value": "330701",
                "kind": "text"
              },
              {
                "label": "School Code",
                "value": "65698",
                "kind": "text"
              },
              {
                "label": "Complete Address",
                "value": "Shemford Futuristic School, Udaini, New Jaganpura Road, PO – Mittanchak, PS – Gopalpur, Patna – 804453",
                "kind": "text"
              },
              {
                "label": "Principal Name",
                "value": "Jaisa P.J",
                "kind": "text"
              },
              {
                "label": "Principal Qualification",
                "value": "M.Sc., M.Ed., NET",
                "kind": "text"
              },
              {
                "label": "School Email ID",
                "value": "admissions@pat.shemford.com, principal@pat.shemford.com, director@pat.shemford.com",
                "kind": "email"
              },
              {
                "label": "Contact Details",
                "value": "+91 9534098666, +91 9431201060, +91 7061928947",
                "kind": "phone"
              }
            ],
          },
        ],
      },
    ],
  },

  cbseInformation: {
    label: "CBSE · School Information",
    path: "/CBSE/Information",
    icon: "ℹ️",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.eyebrow", label: "Eyebrow", default: "CBSE Compliance" },
          { type: "text", key: "hero.title", label: "Heading", default: "School Information" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "Detailed information about Shemford Futuristic School as required by the Central Board of Secondary Education.",
          },
        ],
      },
      {
        label: "Information table",
        fields: [
          {
            type: "list",
            key: "rows",
            label: "Table rows",
            help: "Separate multiple emails or phone numbers with a comma.",
            fields: [
              { key: "label", label: "Information", type: "text" },
              { key: "value", label: "Details", type: "textarea" },
              {
                key: "kind",
                label: "Render as",
                type: "select",
                options: [
              { label: "Plain text", value: "text" },
              { label: "Email address(es)", value: "email" },
              { label: "Phone number(s)", value: "phone" },
            ],
              },
            ],
            default: [
              {
                "label": "Name of School",
                "value": "Shemford Futuristic School Patna",
                "kind": "text"
              },
              {
                "label": "Affiliation Number",
                "value": "330701",
                "kind": "text"
              },
              {
                "label": "School Code",
                "value": "65698",
                "kind": "text"
              },
              {
                "label": "Complete Address",
                "value": "Shemford Futuristic School, Udaini, New Jaganpura Road, PO – Mittanchak, PS – Gopalpur, Patna – 804453",
                "kind": "text"
              },
              {
                "label": "Principal Name",
                "value": "Jaisa P.J",
                "kind": "text"
              },
              {
                "label": "Principal Qualification",
                "value": "M.Sc., M.Ed., NET",
                "kind": "text"
              },
              {
                "label": "School Email ID",
                "value": "admissions@pat.shemford.com, principal@pat.shemford.com, director@pat.shemford.com",
                "kind": "email"
              },
              {
                "label": "Contact Details",
                "value": "+91 9534098666, +91 9431201060, +91 7061928947",
                "kind": "phone"
              }
            ],
          },
        ],
      },
    ],
  },

  cbsePedagogical: {
    label: "CBSE · Pedagogical (landing)",
    path: "/CBSE/Pedagogical",
    icon: "🧑‍🏫",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.eyebrow", label: "Eyebrow", default: "CBSE Compliance" },
          {
            type: "text",
            key: "hero.title",
            label: "Heading",
            default: "Pedagogical Information",
          },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "Teaching methodology, curriculum framework, and committee details for Shemford Futuristic School.",
          },
        ],
      },
      {
        label: "Link cards",
        fields: [
          {
            type: "list",
            key: "links",
            label: "Cards",
            fields: [
              { key: "text", label: "Title", type: "text" },
              { key: "href", label: "Link", type: "link" },
              { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
              { key: "desc", label: "Description", type: "textarea" },
            ],
            default: [
              {
                text: "Pedagogical Plan",
                href: "/CBSE/Pedagogical/plan",
                icon: "GraduationCap",
                desc: "Annual teaching methodology, objectives, and subject-wise pedagogical approaches for the academic year.",
              },
              {
                text: "Pedagogical Committee",
                href: "/CBSE/Pedagogical/Committee",
                icon: "Users",
                desc: "Members of the Annual Pedagogical Planning Committee responsible for curriculum design and review.",
              },
            ],
          },
        ],
      },
    ],
  },

  cbseCommittee: {
    label: "CBSE · Pedagogical Committee",
    path: "/CBSE/Pedagogical/Committee",
    icon: "👥",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.eyebrow", label: "Eyebrow", default: "CBSE Compliance" },
          {
            type: "text",
            key: "hero.title",
            label: "Heading",
            default: "Pedagogical Planning Committee",
          },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "Members of the Annual Pedagogical Planning Committee for Academic Year 2024–25.",
          },
        ],
      },
      {
        label: "Introduction",
        fields: [
          {
            type: "textarea",
            key: "intro",
            label: "Intro paragraph",
            default:
              "An annual plan contains all academic and co-curricular activities to be taken in the specified academic year. It is the act of developing a strategy for the upcoming year based on the experiences gained from the previous year's performance. Pedagogical planning is undertaken after a series of discussions reviewing curricular and co-curricular activities, identifying lacunae, analyzing achievement levels, and considering the needs of the learner and society. Based on these discussions, the School Management Committee has established the Annual Pedagogical Planning Committee to prepare the plan for 2024-25.",
          },
        ],
      },
      {
        label: "Members",
        fields: [
          {
            type: "list",
            key: "members",
            label: "Committee members",
            fields: [
              { key: "name", label: "Name", type: "text" },
              { key: "designation", label: "Designation", type: "text" },
              { key: "role", label: "Role", type: "text" },
            ],
            default: [
              {
                "name": "Ms. Meera Sinha",
                "designation": "Chairperson School Management",
                "role": "Advisor"
              },
              {
                "name": "Mr. Savio Pinto",
                "designation": "Director Academics",
                "role": "Advisor"
              },
              {
                "name": "Ms. Jaisa P J",
                "designation": "Principal",
                "role": "Chairperson"
              },
              {
                "name": "Mr. Manish Chandra Pathak",
                "designation": "Teacher Secondary school",
                "role": "Member"
              },
              {
                "name": "Mr. Abhishek Kumar",
                "designation": "Teacher – Mathematics",
                "role": "Member"
              },
              {
                "name": "Mr. Abhishek Kumar",
                "designation": "Teacher – Science",
                "role": "Member"
              },
              {
                "name": "Mr. Abhishek Kumar",
                "designation": "Teacher – Computer",
                "role": "Member"
              },
              {
                "name": "Ms. Leena Sinha",
                "designation": "Teacher Secondary school",
                "role": "Member"
              },
              {
                "name": "Ms. Vivek Kumar",
                "designation": "Teacher Secondary school",
                "role": "Member"
              },
              {
                "name": "Ms. Anshu Priya",
                "designation": "Teacher Secondary school",
                "role": "Member"
              },
              {
                "name": "Mr. Ayush Kumar",
                "designation": "Teacher Secondary school",
                "role": "Member"
              },
              {
                "name": "Ms. Ruby Priya",
                "designation": "Teacher Secondary school",
                "role": "Member"
              },
              {
                "name": "Ms. Rachana Jha",
                "designation": "Teacher Primary school",
                "role": "Member"
              },
              {
                "name": "Ms. Komili Sharma",
                "designation": "Teacher Primary school",
                "role": "Member"
              },
              {
                "name": "Ms. Preeti Lata",
                "designation": "Teacher Primary school",
                "role": "Member"
              },
              {
                "name": "Ms. Poonam Sinha",
                "designation": "Teacher Primary school",
                "role": "Member"
              },
              {
                "name": "Ms. Neetu Kumari",
                "designation": "Teacher Primary school",
                "role": "Member"
              },
              {
                "name": "Ms. Anushka",
                "designation": "Teacher Primary school",
                "role": "Member"
              },
              {
                "name": "Ms. Arpana Priya",
                "designation": "Teacher Nursery school",
                "role": "Member"
              },
              {
                "name": "Ms. Priyanka Sinha",
                "designation": "Teacher Nursery school",
                "role": "Member"
              },
              {
                "name": "Mr. Manoj Kumar",
                "designation": "Teacher Physical Education",
                "role": "Member"
              },
              {
                "name": "Ms. Priyanka Kumari",
                "designation": "Teacher Art and Craft",
                "role": "Member"
              },
              {
                "name": "Ms. Shwet Prity",
                "designation": "Teacher Music",
                "role": "Member"
              },
              {
                "name": "Mr. Ashutosh Kumar",
                "designation": "Teacher Dance",
                "role": "Member"
              },
              {
                "name": "Ms. Neha Kumari",
                "designation": "HR Manager and Operation Head",
                "role": "Meeting & Documentation"
              },
              {
                "name": "Mr. Mukesh Kumar",
                "designation": "Librarian",
                "role": "Member"
              },
              {
                "name": "Mr. Imran Hussain",
                "designation": "Parent",
                "role": "Member"
              },
              {
                "name": "Ms. Parveen Baby",
                "designation": "Parent",
                "role": "Member"
              }
            ],
          },
        ],
      },
    ],
  },

  cbsePlan: {
    label: "CBSE · Pedagogical Plan",
    path: "/CBSE/Pedagogical/plan",
    icon: "📚",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.eyebrow", label: "Eyebrow", default: "CBSE Compliance" },
          {
            type: "text",
            key: "hero.title",
            label: "Heading",
            default: "Pedagogical Plan",
          },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default: "Annual Pedagogical Plan 2023–24 · Shemford Futuristic School Patna",
          },
        ],
      },
      {
        label: "Sections",
        fields: [
          {
            type: "list",
            key: "sections",
            label: "Plan sections",
            help: "Use Paragraph for prose, or Bullet points for a list — a section can use either.",
            fields: [
              { key: "title", label: "Section title", type: "text" },
              { key: "content", label: "Paragraph", type: "textarea" },
              { key: "items", label: "Bullet points (one per line)", type: "textarea" },
            ],
            default: [
              {
                "title": "Pedagogical Approach",
                "content": "Pedagogy is the manner in which a teacher teaches her/his learners to acquire certain competencies as stated by the outcomes of learning. There are several pedagogical approaches, but in accordance with the NCF 2005, we follow the constructivist approach (CBSE Vide circular Acad 15/2019 dated 9th March 2019). According to this approach, the child is placed at the centre of learning and the approach believes that children learn best through experiencing and reflecting on the topics/concepts being taught.",
                "items": ""
              },
              {
                "title": "Pedagogical Objectives",
                "content": "",
                "items": "To provide a joyful and stress-free teaching-learning environment.\nTo promote the all-round development of students with a holistic approach, integrating co-curricular and extra-curricular activities.\nTo provide quality education that promotes intellectual, social, and cultural vivacity among its learners.\nTo adapt and innovate methods to achieve academic excellence based on psychological, pedagogical, and social principles.\nTo generate complete learning outcomes.\nTo shape the character and behavior of the students."
              },
              {
                "title": "Language Development Objectives",
                "content": "",
                "items": "Develop the ability to speak fluently and accurately in a variety of situations.\nDevelop multilingual competence through using multilingualism as a strategy for learning languages and subjects.\nDevelop grammatical competencies, moving from procedural knowledge to declarative knowledge.\nDevelop the ability to express thoughts effortlessly, confidently, and in an organized manner.\nUse language as a skill for real-life purposes."
              },
              {
                "title": "Listening and Comprehension Objectives",
                "content": "",
                "items": "Comprehend audio/video scripts, read aloud texts, and answer comprehension and inferential questions.\nUse resources like news, films, songs, dramas, role-play, and internet talks to improve listening comprehension.\nMeet people, discuss a variety of issues, organize, and participate in discussions.\nConsult dictionaries, magazines, periodicals, thesaurus, encyclopedia, electronic media, and libraries.\nRead and narrate stories, describe incidents with fluency and sequence."
              },
              {
                "title": "Scientific Approach Objectives",
                "content": "",
                "items": "Develop understanding of concepts, principles, theories, and laws governing the physical world.\nAcquire and use methods of science such as observing, questioning, planning investigations, hypothesizing, collecting, analyzing, and interpreting data.\nConduct experiments, including quantitative measurements.\nAppreciate how scientific concepts evolve over time.\nDevelop scientific temper including objectivity, critical thinking, and freedom from fear and prejudice."
              },
              {
                "title": "Social Science Objectives",
                "content": "",
                "items": "Classify and compare cause and effect relationships in social and natural processes.\nUnderstand concepts like unity in diversity, democracy, development, and the forces enriching our cultural heritage.\nDemonstrate skills in observation, enquiry, reflection, empathy, and critical thinking.\nCreate awareness of environmental issues, sustainable development, gender disparities, and marginalized sections of society.\nUnderstand astronomical phenomena, atmosphere, and biosphere."
              },
              {
                "title": "Geography Objectives",
                "content": "",
                "items": "Observe the political map of India, study states, UTs, and important political terms.\nAnalyze different types of climates in various regions and the factors affecting the course of a river.\nUse diagrams, models, and audio-visual materials to understand earth motions, stars, planets, and moons.\nUnderstand the causes and effects of various revolutions and read maps to identify historical places.\nDiscuss concepts of democracy, equality, and state governance."
              }
            ],
          },
        ],
      },
    ],
  },

  journal: {
    label: "Journal / Blog page",
    path: "/Journal",
    icon: "📰",
    groups: [
      {
        label: "Hero",
        fields: [
          { type: "text", key: "hero.eyebrow", label: "Eyebrow", default: "Shemford Journal" },
          { type: "text", key: "hero.title", label: "Heading", default: "Educational Insights" },
          {
            type: "textarea",
            key: "hero.subtitle",
            label: "Subheading",
            default:
              "Discover expert perspectives on early childhood development and education.",
          },
          {
            type: "text",
            key: "featuredTitle",
            label: "Featured section heading",
            default: "Featured Articles",
          },
          {
            type: "text",
            key: "categories",
            label: "Filter categories (comma separated)",
            default: "All, Education, Development, Psychology, Social Skills",
          },
          {
            type: "text",
            key: "searchPlaceholder",
            label: "Search placeholder",
            default: "Search articles...",
          },
        ],
      },
      {
        label: "Articles",
        fields: [
          {
            type: "list",
            key: "posts",
            label: "Articles",
            help: "In the body, start a line with ## for a subheading and - for a bullet. Blank lines separate paragraphs.",
            fields: [
              { key: "title", label: "Title", type: "text" },
              { key: "excerpt", label: "Excerpt (card preview)", type: "textarea" },
              { key: "category", label: "Category", type: "text" },
              { key: "writer", label: "Author", type: "text" },
              { key: "publishDate", label: "Publish date", type: "text" },
              { key: "readTime", label: "Read time", type: "text" },
              { key: "views", label: "Views", type: "text" },
              { key: "image", label: "Cover image (URL, or leave a gradient class)", type: "text" },
              {
                key: "featured",
                label: "Featured",
                type: "select",
                options: [
                  { label: "No", value: "no" },
                  { label: "Yes", value: "yes" },
                ],
              },
              { key: "body", label: "Article body", type: "textarea" },
            ],
            default: [
              {
                "title": "IMPORTANCE OF PRESCHOOL EDUCATION",
                "excerpt": "Children are born ready to learn; they learn every second of their lives. The first 6 years of a child's life is crucial for brain development...",
                "category": "Education",
                "writer": "Rishabh Ranjan",
                "publishDate": "March 15, 2025",
                "readTime": "8 min read",
                "views": "1250",
                "image": "bg-linear-to-br from-blue-500 to-indigo-600",
                "featured": "yes",
                "body": "Children are born ready to learn; they learn every second of their lives. Though we learn throughout our life but the first 6 years of child's life is very important for learning as brain development is on its peak during this period.\n\nIn the first 6 years of life, more than one million neural connections are formed each second and 90% child's brain develops. The quality of a child's experiences during this period makes a critical difference as their brains develop, providing either strong or weak foundations for learning.\n\n## The Foundation Years\n\nThe early years are the most important time to start building a strong foundation for your child as he strives to reach his developmental milestones. Though his learning begins at home and he learns basic skills of language, colors, eating, etc. from you and other family members but as he turn 2, now its time to send him to a good preschool because quality early childhood education can make a big difference.\n\n## The Magic of Preschool\n\nThe preschool plays a magic role in the development of child's skills. Your Child have first time come out of the entirely protected home environment to an open environment of preschool and transit from being entirely dependent on you, to being independent.\n\nThis is the time when he starts asking 'who', 'what', 'where', 'how', and 'why' all the time and looking for answer for his every small question.\n\nPreschool is an entirely new world where he will have structured and playful social environment and the place where he will find answers of most of his questions. He will form new connections with his peer group, teachers and caregivers."
              },
              {
                "title": "COGNITIVE DEVELOPMENT IN EARLY YEARS",
                "excerpt": "Cognitive skills are the core skills our brain uses to think, read, learn, remember, reason, and pay attention...",
                "category": "Development",
                "writer": "Rishabh Stark",
                "publishDate": "March 12, 2025",
                "readTime": "6 min read",
                "views": "980",
                "image": "bg-linear-to-br from-purple-500 to-pink-600",
                "featured": "yes",
                "body": "Cognitive skills are the core skills our brain uses to think, read, learn, remember, reason, and pay attention. Working together, they gain information and move process it into knowledge we apply in our everyday life.\n\n## Understanding Cognitive Skills\n\nCognitive skill refers to the ability of your child to think, explore and understand. Development of cognitive skill for your child is the development of knowledge, ability to solving problems, figuring out things himself and his capacity to understand the world around him.\n\n## The Power of Play\n\nPlay is most important for your cognitive development of your child and in his preschool he will learn every thing by play-way method it will enhance his ability to think, understand, communicate, remember, imagine and work out what might happen next.\n\n- • Learning to solve puzzles from simple to complex\n\n- • Understanding concepts like 'bigger' and 'taller'\n\n- • Developing sense of humor and delight in jokes\n\n- • Predicting what will happen next in stories\n\n- • Learning to negotiate with friends\n\n- • Developing concept of time"
              },
              {
                "title": "SOCIO-EMOTIONAL DEVELOPMENT",
                "excerpt": "Socio-emotional skills are one of the most important skills children develop as they grow. These skills prepare children for effective communication...",
                "category": "Psychology",
                "writer": "Meera Sinha",
                "publishDate": "March 10, 2025",
                "readTime": "10 min read",
                "views": "1420",
                "image": "bg-linear-to-br from-green-500 to-teal-600",
                "featured": "no",
                "body": "Socio-emotional skills are one of the most important skills children develop as they grow. Developing social skills in your child will prepare him for effective communication and cooperation with others.\n\n## Social Skills Development\n\nOnce your child reaches age three, he will be more likely to play with other children instead of playing with you. During this process, he will start realizing the fact that not everyone thinks exactly the way he does.\n\n- To identify and understand his own feelings and regulate his own behavior\n\n- To understand other's feelings\n\n- To develop empathy for others\n\n- To establish and maintain good relationships\n\n## The Role of Preschool\n\nPreschool plays a very important role in the cultivation of social and emotional skills in a child. The socio-emotional skills they learn at this stage pave the way for them to understand friendship, develop routines, and interpret various situations."
              },
              {
                "title": "BUILDING SOCIAL SKILLS IN PRESCHOOL",
                "excerpt": "Preschool plays a major role in shaping a child's social skills. Learn how structured environments help children develop essential social competencies...",
                "category": "Social Skills",
                "writer": "Alice Johnson",
                "publishDate": "March 8, 2025",
                "readTime": "5 min read",
                "views": "750",
                "image": "bg-linear-to-br from-orange-500 to-red-600",
                "featured": "no",
                "body": "Preschool plays a major role in shaping a child's social skills. In a structured yet nurturing environment, children learn to interact with peers, share resources, and develop empathy.\n\n## Key Social Milestones\n\nThrough guided activities and free play, children develop crucial social competencies that will serve them throughout their lives."
              }
            ],
          },
        ],
      },
    ],
  },

  message: {
    label: "Messages page",
    path: "/Message",
    icon: "💬",
    groups: [
      {
        label: "Mobile view",
        fields: [
          {
            type: "text",
            key: "mobileTitle",
            label: "Mobile page title",
            default: "Messages",
          },
        ],
      },
      {
        label: "Tabs",
        fields: [
          {
            type: "list",
            key: "tabs",
            label: "Message tabs",
            help: "Body paragraphs are separated by blank lines. Bullets go one per line.",
            fields: [
              { key: "title", label: "Tab label", type: "text" },
              { key: "heading", label: "Heading inside the tab", type: "text" },
              { key: "body", label: "Body paragraphs", type: "textarea" },
              { key: "bullets", label: "Bullet points (one per line)", type: "textarea" },
              { key: "emphasis", label: "Closing bold line", type: "textarea" },
              { key: "image", label: "Photo", type: "image" },
              {
                key: "layout",
                label: "Layout",
                type: "select",
                options: [
                  { label: "Text beside photo", value: "side" },
                  { label: "Photo below text", value: "stacked" },
                ],
              },
            ],
            default: [
              {
                title: "Principal",
                heading: "Principal's Message",
                body: "It gives me great pleasure to welcome you to the aura of Shemford Futuristic School. As the Principal of the institution, I feel honoured and privileged to be a part of an educational institution where every stakeholder is a learner, motivating each other. This school strives to bring forth conscientious, confident citizens of India, who are capable of preserving and refining our cultural values. Our school provides remarkable educational experiences to students right from Nursery (age 3) to grade 12. While following the CBSE syllabus, at Shemford we try to draw out the best in each of our students, support and encourage them to achieve their goals. The school ensures effective and stress free teaching and learning environment for our students. Individual attention is provided to each student and thus helping them to learn things at their own pace.\n\nThe school focuses on identifying and developing the talents and potentials of each student. The wide variety of experiences provided by the teachers to the students will help them uplift their overall personality. I believe that education is a process of positive transformation. For making this transformation a reality, we expect the whole hearted support from the parents. Let's join our hands together for the betterment of our students and to help them reach their full potential. The parents are their first teachers. On behalf of the institution, I appeal to the parents to ensure\n\nThe best atmosphere to the students at home. Expecting constructive collaborative effort for the welfare of our student community.",
                bullets: "",
                emphasis: "",
                image: "/assets/Principal.jpeg",
                layout: "side",
              },
              {
                title: "Chairperson",
                heading: "Chairperson's Message",
                body: "शिक्षा सीखने और सिखाने की व सतत और शाश्वत प्रक्रिया है | हमारे जीवन का हर अनुभव हमारे लिए एक शिक्षा लेकर आता है | अनुभव हमें चीजों की प्रति एक व्यवहारिक दृष्टिकोण देता है और परिपक़्व बनाता है, दूसरे शब्दों में एक गुरु की भांति हमारा मार्गदर्शन करता है और जीवन पथ पर लगातार सीखते हुए आगे बढ़ने की प्रेरणा देता है |\n\nमेरे उद्देश्य बच्चों को प्रकृति, पर्यावरण और त्वरित गति से बदलती परिस्थितियों के साथ सामंजस्य बिठा कर जीना सिखाते हुए शिक्षित करना है, ताकि हर बच्चा भविष्य का एक सफल व्यक्ति के साथ-साथ एक सफल नागरिक भी बन सके | धरती का हर व्यक्ति, हर जीवन, हर कण का पृथक अस्तित्व होते हुए भी उसके बीच के अन्योन्याश्रय संबंध को नकारा नहीं जा सकता है, तदनुसार वे एक दूसरे को प्रत्यक्ष या परोक्ष रूप से प्रभावित भी करते है |\n\nहम सब मिलकर पाठ्यक्रम को पुस्तकों के साथ-साथ अपने अनुभवों से अपने आप को इतना समृद्ध और शिक्षित करें कि भविष्य में जीवन की चुनौतियों को कुशलता से सामना करते हुए जीवन के हर पहलू में संतुलन बनाते हुए, एक परिपक़्व नागरिक की भांति एक शिक्षित और सम्य समाज बनाने में अपना योगदान दें | हम सभी मिलकर “अत दीपा विहस्त” के मंत्र को आत्मसात् करते हुए सतत् अपना प्रकाश स्वयं बनाने की चेष्टा करें |",
                bullets: "",
                emphasis: "",
                image: "/assets/Chairperson.jpeg",
                layout: "side",
              },
              {
                title: "Our Mission",
                heading: "Our Mission",
                body: "Will children really love to come to SHEMFORD?\n\nSure! All it requires is an understanding of a child's interests, passions and using these as vehicles for motivation. We often hear parents saying that their children don't like to go the school, but what if they don't realise is that when education is 'presented' in a push model, it becomes the slowest, least effective and most uninteresting path to learning. Adhering to this method of mass production in an age of digital personalization, is a disservice to education. Not only does it make learning dull and de-motivating the children, it also makes schools boring places.\n\nNow, just for a moment, think what would happen if SHEMFORD were to turn the system around?\n\nWhat if we question the traditional rules as we build schools of the future?\n\nWhat if our school make children as excited about learning as they are about playing with friends?\n\nWhat if children at our school don't have to study hard to learn?\n\nWhat if learning here is both relevant and useful?\n\nPresenting SHEMFORD, a futuristic school, to which, children run to; not because they 'have' to!",
                bullets: "",
                emphasis:
                  "Our Mission - 'To make learning creative, interesting, interactive and engaging, through a system which is constructive, comprehensive, practical and futuristic'",
                image: "/assets/images1.png",
                layout: "side",
              },
              {
                title: "Our Vision",
                heading: "Our Vision",
                body: "",
                bullets:
                  "At SHEMFORD Schools we believe in the power of “What if…”\nWhat if children wake up their parents to go to school every day?\nWhat if they run to school and walk back home?\nWhat if they are as excited about learning as they are about playing?\nWhat if they look forward to tests?\nWhat if children love school days more than holidays?\n'What if…' is a question that inventors ask themselves every day. It drives people to innovate their world.\nAt Shemford, we love this question. It makes us think of the unusual, of the extraordinary, and allows us to explore new possibilities.\nPossibilities of making schooling interesting, engaging, and motivating.",
                emphasis: "",
                image: "/assets/images1.png",
                layout: "stacked",
              },
            ],
          },
        ],
      },
    ],
  },
};

export const PAGE_KEYS = Object.keys(REGISTRY);
