export type ProjectStatus = "PoC" | "Production";
export type ProjectDirection =
  | "Risk"
  | "Credit Scoring"
  | "Automation"
  | "NLP / Chatbots"
  | "Computer Vision";

export type Project = {
  id: string;
  name: string;
  short: string;
  problem: string;
  solution: string;
  technologies: string[];
  impact: { label: string; value: string }[];
  team: string[];
  direction: ProjectDirection;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    id: "risk-mgmt-ml",
    name: "Risk Management ML",
    short:
      "ML scoring and automated risk-appetite calculation across the credit book.",
    problem:
      "Customer default risk is not modeled with ML; scoring uses only KATM, DSI and Uzinfocom data; risk-appetite reports take 2 working days to prepare manually.",
    solution:
      "Logistic regression, XGBoost and neural networks predict default probability; integration with telco operators and YHXX bases enriches the scoring model; risk appetite is calculated and monitored automatically in real time.",
    technologies: ["XGBoost", "Logistic Regression", "Neural Networks", "Python", "PostgreSQL"],
    impact: [
      { label: "Risky-customer detection", value: "+25–40%" },
      { label: "Credit decisions speed-up", value: "+15–30%" },
      { label: "Manual errors", value: "−90%" }
    ],
    team: ["Murodjon M.", "Umidjon A.", "Abdullo N."],
    direction: "Risk",
    status: "PoC"
  },
  {
    id: "admin-fleet",
    name: "Fleet & Energy AI",
    short:
      "GPS telematics, ML-based driving evaluation and predictive maintenance for vehicles, solar panels and transformers.",
    problem:
      "Monthly fleet expense reports take 3 working days; 120+ vehicles with 20+ receipts each; driving style is not analysed; data on 5 suppliers, 10+ portals and 40+ generators is scattered.",
    solution:
      "GPS modules and telematics integration digitise route sheets; an ML model evaluates driving style; a unified BI dashboard pulls supplier APIs; predictive-maintenance models flag panel degradation and transformer issues before they cause outages.",
    technologies: ["GPS Telematics", "ML", "Power BI", "Predictive Maintenance"],
    impact: [
      { label: "Labour savings", value: "60–70%" },
      { label: "Calculation errors", value: "−90%" },
      { label: "Annual energy uplift", value: "+2–5%" }
    ],
    team: ["Murodjon M.", "Daler E.", "Azizbek Q."],
    direction: "Automation",
    status: "PoC"
  }
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  photo: string;
  projects: string[];
};

export const team: TeamMember[] = [
  {
    id: "kozlov",
    name: "Sergey Kozlov",
    role: "Chief AI Officer & Advisor to the Chairman",
    bio: "Sets the AI strategy at SQB and advises the Chairman of the Board on AI initiatives.",
    skills: ["AI Strategy", "Governance", "Banking", "Advisory"],
    photo: "/team/kozlov.jpg",
    projects: ["risk-mgmt-ml", "admin-fleet"]
  },
  {
    id: "muhammadjon",
    name: "Muhammadjon Nuritdinov",
    role: "Lead Manager",
    bio: "Leads AI initiatives at SQB with 5+ years in fintech: Ijro AI, Financial Assistant AI, LogiCoreAI, SQB Voice.",
    skills: ["AI Strategy", "Program Mgmt", "Architecture", "KPIs"],
    photo: "/team/muhammadjon.jpg",
    projects: ["risk-mgmt-ml", "admin-fleet"]
  },
  {
    id: "umidjon",
    name: "Umidjon Abdukhamidov",
    role: "AI / Business & System Analyst",
    bio: "Shapes business and functional requirements, prepares data and supports AI delivery from idea to integration.",
    skills: ["Business Analysis", "BERT", "Surya OCR", "Data Prep"],
    photo: "/team/umidjon.jpg",
    projects: ["risk-mgmt-ml"]
  },
  {
    id: "timurjon",
    name: "Timurjon Kumkov",
    role: "Project Manager",
    bio: "Full-cycle PM across IT and AI projects in banking; ex-IT Park Uzbekistan and SQB Mobile / CROBS.",
    skills: ["Scrum", "Kanban", "WBS", "Stakeholders"],
    photo: "/team/timurjon.jpg",
    projects: ["risk-mgmt-ml", "admin-fleet"]
  },
  {
    id: "javokhir",
    name: "Javokhir Aliakbarov",
    role: "Scrum Master",
    bio: "Drives delivery for the AI team in Jira; supports prompt engineering for SQB chat, HR, Audit and CROBS bots.",
    skills: ["Jira", "Scrum", "Prompt Eng.", "Coordination"],
    photo: "/team/javokhir.jpg",
    projects: ["risk-mgmt-ml", "admin-fleet"]
  },
  {
    id: "murodjon",
    name: "Murodjon Mirzaev",
    role: "Senior Data Engineer",
    bio: "Banking DWH and DataOps since 2020; delivered enterprise warehouses across multiple banks before returning to SQB.",
    skills: ["PostgreSQL", "PL/SQL", "Power BI", "SSIS"],
    photo: "/team/murodjon.jpg",
    projects: ["risk-mgmt-ml", "admin-fleet"]
  },
  {
    id: "abdullo",
    name: "Abdullo Navruzov",
    role: "Software Engineer (Backend)",
    bio: "Backend and AI integration at SQB: SQB Chat Assistant, Obnal AI, Ijro AI; deployed Qwen3-32B and GPT-OSS-20B on GPU.",
    skills: ["Node.js", "OpenAI API", "LLM Ops", "Socket.IO"],
    photo: "/team/abdullo.jpg",
    projects: ["risk-mgmt-ml"]
  },
  {
    id: "azizbek",
    name: "Azizbek Qodirov",
    role: "Junior Java Backend Developer",
    bio: "Integrates AI services with Java applications and Telegram bots. Worked on HR bot, chat-bot and CROBS AI assistant.",
    skills: ["Java", "Spring", "Telegram API", "AI Integration"],
    photo: "/team/azizbek.jpg",
    projects: ["admin-fleet"]
  },
  {
    id: "daler",
    name: "Daler Ergashev",
    role: "Junior Angular Developer",
    bio: "Builds Angular SPA interfaces and integrates with backend APIs; works on AI-Admin, SQB-Ijro and Monitoring.",
    skills: ["Angular", "TypeScript", "PL/SQL", "REST"],
    photo: "/team/daler.jpg",
    projects: ["admin-fleet"]
  },
  {
    id: "odiljon",
    name: "Odiljon Anvarov",
    role: "HR Project Manager",
    bio: "Owns IT and AI hiring at SQB; runs the SQB Start program and co-built the AI HR Telegram bot.",
    skills: ["IT Recruitment", "Onboarding", "HR Automation", "iSpring"],
    photo: "/team/odiljon.jpg",
    projects: []
  },
  {
    id: "dilshodbek",
    name: "Dilshodbek Normatov",
    role: "UX/UI Designer",
    bio: "Designs interfaces and prototypes for SQB Monitoring, SQB AI Chat, MFI and CROBS AI Chat; uses AI tools to accelerate delivery.",
    skills: ["Figma", "UX/UI", "Adobe Suite", "Prototyping"],
    photo: "/team/dilshodbek.jpg",
    projects: ["risk-mgmt-ml", "admin-fleet"]
  }
];

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Update" | "Insight" | "Announcement";
  image: string;
};

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "SQB AI Hackathon: at the heart of digital future and innovative solutions",
    excerpt:
      "SQB and New Uzbekistan University co-hosted an AI Hackathon, bringing young developers together to solve real banking and finance challenges.",
    date: "2026-04-25",
    category: "Update",
    image: "/news/n1/p01.jpg"
  },
  {
    id: "n2",
    title: "Artificial Intelligence becomes a driver of Uzbekistan's economy",
    excerpt:
      "An international conference on AI and digital transformation hosted by SQB gathered government, banks and the IT industry on one stage.",
    date: "2026-04-17",
    category: "Insight",
    image: "/news/n2/p01.jpg"
  },
  {
    id: "n3",
    title: "SQB AI Advisor — turn an idea into a real business in minutes",
    excerpt:
      "A digital assistant from SQB that analyses your idea, regional market needs and produces a ready business plan with financing options.",
    date: "2026-04-11",
    category: "Announcement",
    image: "/news/n3/p01.jpg"
  },
  {
    id: "n4",
    title: "Youth, startups and IT: SQB and New Uzbekistan University launch cooperation",
    excerpt:
      "A memorandum signed within the university's accelerator program covers AI, cybersecurity, research and joint startup projects.",
    date: "2026-03-25",
    category: "Announcement",
    image: "/news/n4/p01.jpg"
  },
  {
    id: "n5",
    title: "Youth potential and innovation — a priority direction",
    excerpt:
      "SQB signs a memorandum of cooperation with Turin Polytechnic University to deliver joint AI and IT projects.",
    date: "2026-03-18",
    category: "Announcement",
    image: "/news/n5/p01.jpg"
  }
];

export type EventItem = {
  id: string;
  name: string;
  date: string;
  place: string;
  participants: string;
  image: string;
  gallery: string[];
};

export const events: EventItem[] = [
  {
    id: "e1",
    name: "SQB AI Hackathon",
    date: "2026-04-25",
    place: "Tashkent",
    participants: "AI engineers, developers, students",
    image: "/events/e1/p01.jpg",
    gallery: [
      "/events/e1/p01.jpg",
      "/events/e1/p02.jpg",
      "/events/e1/p03.jpg",
      "/events/e1/p04.jpg"
    ]
  },
  {
    id: "e2",
    name: "International AI Conference",
    date: "2026-04-17",
    place: "Tashkent",
    participants: "Government, banks, experts",
    image: "/events/e2/p01.jpg",
    gallery: [
      "/events/e2/p01.jpg",
      "/events/e2/p02.jpg",
      "/events/e2/p03.jpg",
      "/events/e2/p04.jpg",
      "/events/e2/p05.jpg",
      "/events/e2/p06.jpg"
    ]
  },
  {
    id: "e3",
    name: "Partnership with New Uzbekistan University",
    date: "2026-03-25",
    place: "New Uzbekistan University, Tashkent",
    participants: "University and SQB representatives",
    image: "/events/e3/p01.jpg",
    gallery: [
      "/events/e3/p01.jpg",
      "/events/e3/p02.jpg",
      "/events/e3/p03.jpg",
      "/events/e3/p04.jpg",
      "/events/e3/p05.jpg",
      "/events/e3/p06.jpg"
    ]
  },
  {
    id: "e4",
    name: "Partnership with Turin Polytechnic University",
    date: "2026-03-18",
    place: "Turin Polytechnic University, Tashkent",
    participants: "University and SQB representatives",
    image: "/events/e4/p01.jpg",
    gallery: [
      "/events/e4/p01.jpg",
      "/events/e4/p02.jpg",
      "/events/e4/p03.jpg",
      "/events/e4/p04.jpg",
      "/events/e4/p05.jpg"
    ]
  }
];

export const galleryImages: string[] = [
  "/gallery/m01.jpg",
  "/gallery/m02.jpg",
  "/gallery/m03.jpg",
  "/gallery/m04.jpg",
  "/gallery/m05.jpg",
  "/gallery/m06.jpg",
  "/gallery/m07.jpg",
  "/gallery/m08.jpg",
  "/gallery/m09.jpg"
];

export const kpis = [
  { label: "Risk detection improvement", value: 40, suffix: "%", decimals: 0 },
  { label: "Credit decision speed-up", value: 30, suffix: "%", decimals: 0 },
  { label: "Labour productivity savings", value: 70, suffix: "%", decimals: 0 },
  { label: "Manual errors reduction", value: 90, suffix: "%", decimals: 0 }
];

export const aiDirections = [
  {
    title: "Risk",
    description:
      "Credit, market and operational risk models that learn from streaming data and stay calibrated."
  },
  {
    title: "Credit Scoring",
    description:
      "Retail and SME scoring with explainable models and a path from PoC to production."
  },
  {
    title: "Automation",
    description:
      "Document intelligence, RPA-style copilots and back-office automation."
  },
  {
    title: "NLP / Chatbots",
    description:
      "Multilingual conversational AI for the contact centre and internal staff."
  },
  {
    title: "Computer Vision",
    description:
      "Branch operations analytics and document KYC at scale, on existing hardware."
  }
];
