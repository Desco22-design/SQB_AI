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
    id: "sqb-mahalla",
    name: "SQB Mahalla",
    short:
      "AI business advisor and regional analytics platform covering all regions and districts of Uzbekistan.",
    problem:
      "Entrepreneurs across the country lack access to localized market insights and ready-to-use business plans; manual regional research is slow, fragmented and out of reach for most mahallas.",
    solution:
      "An AI platform that analyses a business idea against regional market needs across all viloyats and tumans, generates a ready business plan in minutes and connects entrepreneurs with SQB financing options.",
    technologies: ["LLM", "Next.js", "PostgreSQL", "Python", "OpenAI API"],
    impact: [
      { label: "Geography covered", value: "All regions" },
      { label: "Districts in dataset", value: "200+" },
      { label: "Business plan generation", value: "Minutes" }
    ],
    team: ["Murodjon M.", "Umidjon A.", "Abdullo N."],
    direction: "NLP / Chatbots",
    status: "Production"
  },
  {
    id: "ai-advisor",
    name: "SQB AI Advisor",
    short:
      "Conversational AI assistant that turns a business idea into a ready business plan with matching SQB financing in minutes.",
    problem:
      "First-time entrepreneurs and SMEs struggle to translate raw ideas into structured, finance-ready business plans; consultants are expensive and slow, and most applicants approach the bank without a viable plan.",
    solution:
      "A multilingual AI advisor that interviews the user about their idea, pulls regional market signals, generates a structured plan with revenue and cost projections and routes the user to the right SQB financing product end-to-end.",
    technologies: ["LLM", "RAG", "Node.js", "Next.js", "OpenAI API"],
    impact: [
      { label: "Plan generation", value: "Minutes" },
      { label: "Languages", value: "UZ / RU / EN" },
      { label: "Financing routes", value: "Multiple" }
    ],
    team: ["Muhammadjon N.", "Abdullo N.", "Javokhir A."],
    direction: "NLP / Chatbots",
    status: "Production"
  },
  {
    id: "ai-ijro",
    name: "SQB AI Ijro",
    short:
      "AI-powered intake and routing for incoming bank correspondence — OCR, LLM and embedding-based dispatch to responsible departments.",
    problem:
      "500+ incoming letters per day are registered by hand; each item has to be read and routed manually to the right owner, consuming significant Ijro management department time.",
    solution:
      "OCR extracts text from incoming letters, an LLM analyses content and auto-registers each item, and an embedding model routes the letter to the responsible department end-to-end.",
    technologies: ["LLM", "OCR", "Embeddings", "Python", "Node.js"],
    impact: [
      { label: "Daily documents", value: "500+" },
      { label: "Manual handling", value: "−80–90%" },
      { label: "Auto-routing", value: "Real-time" }
    ],
    team: ["Abdullo N.", "Muhammadjon N.", "Daler E."],
    direction: "Automation",
    status: "Production"
  },
  {
    id: "ai-lex",
    name: "AI Lex.uz",
    short:
      "AI/ML legal-document verification integrated with lex.uz and the bank's internal repository — detects outdated norms, spelling and technical errors automatically.",
    problem:
      "Internal documents are not in a single repository, so legal staff burn most of their time searching and cross-checking; there is no automated spelling/technical-error check; and without integration with the national legislation base, internal docs may reference norms that have lost effect.",
    solution:
      "An automated analysis system integrated with lex.uz and the bank's database to track legislative changes in real time; a unified centralized server / cloud repository for all internal documents; AI/ML-based content verification and OCR + NLP analysers for in-text error detection.",
    technologies: ["LLM", "OCR", "NLP", "Embeddings", "lex.uz API"],
    impact: [
      { label: "Document review time", value: "−50–70%" },
      { label: "Error detection", value: "+90%" },
      { label: "Compliance-risk drop", value: "−70–80%" }
    ],
    team: ["Umidjon A.", "Abdullo N.", "Murodjon M."],
    direction: "Automation",
    status: "PoC"
  },
  {
    id: "ai-callcenter",
    name: "Call Center AI",
    short:
      "AI co-pilot for the call center: handles routine and templated client questions and seamlessly hands off complex or personal-data cases to a live operator.",
    problem:
      "The call center receives a high volume of templated and recurring questions, yet every single one ties up a human operator — increasing wait time and cost per contact.",
    solution:
      "An OpenAI-powered assistant trained on the bank's structure, systems and most frequent questions resolves simple FAQs end-to-end and routes unfamiliar topics or anything involving personal data to a live operator.",
    technologies: ["OpenAI API", "LLM", "RAG", "Node.js"],
    impact: [
      { label: "Operator workload", value: "Lower" },
      { label: "Routine queries", value: "Auto-resolved" },
      { label: "Sensitive cases", value: "Live operator" }
    ],
    team: ["Abdullo N.", "Javokhir A.", "Azizbek Q."],
    direction: "NLP / Chatbots",
    status: "Production"
  },
  {
    id: "sqb-fleet-ai",
    name: "SQB Fleet AI",
    short:
      "AI fleet-management platform with real-time monitoring, ML-based driver scoring and predictive maintenance for 129 vehicles and generators across 13 regions.",
    problem:
      "129 vehicles and generators were monitored manually via scattered GPS reports — no unified analytics for driver behaviour, fuel costs, regional load or maintenance schedules; driver evaluation was subjective and lacked quantitative metrics.",
    solution:
      "An XGBoost model scores driver behaviour from GPS events (speeding, hard braking, idle time) and seven analytical engines run in parallel: driver scoring, non-target-use detection, regional load distribution, fuel and cost analytics, predictive maintenance, generator monitoring and route analysis. Data flows in real time via GPS-tracker REST APIs into PostgreSQL with a 2-minute refresh.",
    technologies: ["Python", "XGBoost", "PostgreSQL", "Flask", "React", "Leaflet.js"],
    impact: [
      { label: "Vehicles & generators", value: "129" },
      { label: "Regions covered", value: "13" },
      { label: "Driver scoring automation", value: "100%" }
    ],
    team: ["Murodjon M.", "Daler E.", "Azizbek Q."],
    direction: "Automation",
    status: "Production"
  },
  {
    id: "sqb-solar-forecaster",
    name: "SQB Solar Forecaster",
    short:
      "AI assistant for solar-station operators that forecasts hourly energy generation 14 days ahead and flags underperforming stations in real time.",
    problem:
      "Solar-station operators have no reliable forecast of upcoming energy generation — by-eye estimates from generic weather forecasts miss by 25–30%, making electricity-sale planning hard and delaying detection of equipment faults.",
    solution:
      "An ML model trained on each station's historical telemetry and weather forecasts automatically computes hourly generation for every station for the next 14 days; the dashboard instantly highlights stations underperforming the model's prediction.",
    technologies: ["ML", "Weather Forecast API", "PostgreSQL", "Web Dashboard", "Inverter Telemetry"],
    impact: [
      { label: "Forecast accuracy", value: "90%+" },
      { label: "Forecast horizon", value: "14 days" },
      { label: "Manual operator work", value: "0" }
    ],
    team: ["Murodjon M.", "Abdullo N.", "Daler E."],
    direction: "Automation",
    status: "Production"
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
    projects: ["sqb-mahalla", "ai-advisor", "ai-ijro", "ai-lex", "ai-callcenter", "sqb-fleet-ai", "sqb-solar-forecaster"]
  },
  {
    id: "muhammadjon",
    name: "Muhammadjon Nuritdinov",
    role: "Lead Manager",
    bio: "Leads AI initiatives at SQB with 5+ years in fintech: Ijro AI, Financial Assistant AI, LogiCoreAI, SQB Voice.",
    skills: ["AI Strategy", "Program Mgmt", "Architecture", "KPIs"],
    photo: "/team/muhammadjon.jpg",
    projects: ["sqb-mahalla", "ai-advisor", "ai-ijro", "ai-lex", "ai-callcenter", "sqb-fleet-ai", "sqb-solar-forecaster"]
  },
  {
    id: "umidjon",
    name: "Umidjon Abdukhamidov",
    role: "AI / Business & System Analyst",
    bio: "Shapes business and functional requirements, prepares data and supports AI delivery from idea to integration.",
    skills: ["Business Analysis", "BERT", "Surya OCR", "Data Prep"],
    photo: "/team/umidjon.jpg",
    projects: ["sqb-mahalla", "ai-lex"]
  },
  {
    id: "timurjon",
    name: "Timurjon Kumkov",
    role: "Project Manager",
    bio: "Full-cycle PM across IT and AI projects in banking; ex-IT Park Uzbekistan and SQB Mobile / CROBS.",
    skills: ["Scrum", "Kanban", "WBS", "Stakeholders"],
    photo: "/team/timurjon.jpg",
    projects: ["sqb-mahalla", "ai-advisor", "ai-ijro", "ai-lex", "ai-callcenter", "sqb-fleet-ai", "sqb-solar-forecaster"]
  },
  {
    id: "javokhir",
    name: "Javokhir Aliakbarov",
    role: "Scrum Master",
    bio: "Drives delivery for the AI team in Jira; supports prompt engineering for SQB chat, HR, Audit and CROBS bots.",
    skills: ["Jira", "Scrum", "Prompt Eng.", "Coordination"],
    photo: "/team/javokhir.jpg",
    projects: ["sqb-mahalla", "ai-advisor", "ai-ijro", "ai-lex", "ai-callcenter", "sqb-fleet-ai", "sqb-solar-forecaster"]
  },
  {
    id: "murodjon",
    name: "Murodjon Mirzaev",
    role: "Senior Data Engineer",
    bio: "Banking DWH and DataOps since 2020; delivered enterprise warehouses across multiple banks before returning to SQB.",
    skills: ["PostgreSQL", "PL/SQL", "Power BI", "SSIS"],
    photo: "/team/murodjon.jpg",
    projects: ["sqb-mahalla", "ai-lex", "sqb-fleet-ai", "sqb-solar-forecaster"]
  },
  {
    id: "abdullo",
    name: "Abdullo Navruzov",
    role: "Software Engineer (Backend)",
    bio: "Backend and AI integration at SQB: SQB Chat Assistant, Obnal AI, Ijro AI; deployed Qwen3-32B and GPT-OSS-20B on GPU.",
    skills: ["Node.js", "OpenAI API", "LLM Ops", "Socket.IO"],
    photo: "/team/abdullo.jpg",
    projects: ["sqb-mahalla", "ai-advisor", "ai-ijro", "ai-lex", "ai-callcenter", "sqb-solar-forecaster"]
  },
  {
    id: "azizbek",
    name: "Azizbek Qodirov",
    role: "Junior Java Backend Developer",
    bio: "Integrates AI services with Java applications and Telegram bots. Worked on HR bot, chat-bot and CROBS AI assistant.",
    skills: ["Java", "Spring", "Telegram API", "AI Integration"],
    photo: "/team/azizbek.jpg",
    projects: ["ai-callcenter", "sqb-fleet-ai"]
  },
  {
    id: "daler",
    name: "Daler Ergashev",
    role: "Junior Angular Developer",
    bio: "Builds Angular SPA interfaces and integrates with backend APIs; works on AI-Admin, SQB-Ijro and Monitoring.",
    skills: ["Angular", "TypeScript", "PL/SQL", "REST"],
    photo: "/team/daler.jpg",
    projects: ["ai-ijro", "sqb-fleet-ai", "sqb-solar-forecaster"]
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
    projects: ["sqb-mahalla", "ai-advisor", "ai-ijro", "ai-lex", "ai-callcenter", "sqb-fleet-ai", "sqb-solar-forecaster"]
  }
];

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  body?: string;
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
  { label: "Document review time saved", value: 70, suffix: "%", decimals: 0 },
  { label: "Manual handling reduction", value: 90, suffix: "%", decimals: 0 },
  { label: "Compliance risk reduction", value: 80, suffix: "%", decimals: 0 },
  { label: "Labour savings", value: 70, suffix: "%", decimals: 0 }
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
