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
    id: "credit-risk-llm",
    name: "Credit Risk Copilot",
    short:
      "LLM-powered analyst assistant that drafts risk memos from raw financial filings.",
    problem:
      "Manual analyst review of corporate borrowers takes 6–8 hours per file and varies by reviewer.",
    solution:
      "Domain-tuned LLM pipeline ingests filings, extracts ratios, benchmarks against sector cohorts and produces a draft credit memo for analyst review.",
    technologies: ["LLM", "RAG", "LangGraph", "PostgreSQL", "Python"],
    impact: [
      { label: "Time saved per memo", value: "−72%" },
      { label: "Files processed / month", value: "1,400+" },
      { label: "Analyst override rate", value: "11%" }
    ],
    team: ["Diyor R.", "Aziza K.", "Sherzod A."],
    direction: "Credit Scoring",
    status: "Production"
  },
  {
    id: "fraud-graph",
    name: "Real-time Fraud Graph",
    short:
      "Graph neural network that scores transactions against a 40M-edge customer graph in <80ms.",
    problem:
      "Rule-based fraud detection missed coordinated multi-account schemes and produced a 1:18 false-positive ratio.",
    solution:
      "Streaming GNN scores every card-not-present transaction using behavioural and counter-party features, calibrated against historical loss data.",
    technologies: ["GNN", "PyTorch", "Kafka", "Neo4j", "Triton"],
    impact: [
      { label: "Fraud loss reduction", value: "−38%" },
      { label: "False positives", value: "−61%" },
      { label: "Latency p99", value: "78 ms" }
    ],
    team: ["Otabek M.", "Madina S."],
    direction: "Risk",
    status: "Production"
  },
  {
    id: "branch-vision",
    name: "Branch Vision Analytics",
    short:
      "Computer vision platform that measures queue length and service quality across 180 branches.",
    problem:
      "Branch operations had no objective metric for customer wait time or teller utilisation.",
    solution:
      "On-edge YOLO + person re-identification model running on existing CCTV produces anonymised flow analytics streamed into a Power BI dashboard.",
    technologies: ["YOLOv8", "Re-ID", "ONNX", "Edge", "Power BI"],
    impact: [
      { label: "Branches deployed", value: "180" },
      { label: "Average wait time", value: "−24%" },
      { label: "Privacy compliance", value: "100%" }
    ],
    team: ["Jasur H.", "Nigora T.", "Komron Y."],
    direction: "Computer Vision",
    status: "Production"
  },
  {
    id: "voice-banker",
    name: "VoiceBanker NLU",
    short:
      "Uzbek + Russian voice assistant for the contact centre with on-call agent hand-off.",
    problem:
      "Contact centre handled 70% repetitive intents — balance, card status, transfers — with 6+ minute average handle time.",
    solution:
      "Multilingual NLU with Whisper-based ASR, intent classification and orchestrated tool-use to call core-banking APIs; routes complex cases to human agents with full context.",
    technologies: ["Whisper", "Multilingual NLU", "Tool-use", "FastAPI"],
    impact: [
      { label: "Contained calls", value: "62%" },
      { label: "Avg handle time", value: "−47%" },
      { label: "Languages", value: "UZ / RU" }
    ],
    team: ["Rustam B.", "Lola I."],
    direction: "NLP / Chatbots",
    status: "Production"
  },
  {
    id: "doc-ocr",
    name: "Document Intelligence",
    short:
      "Multi-modal OCR + classifier pipeline for retail-loan applications.",
    problem:
      "Loan onboarding required manual entry from 12 document types, blocking same-day approvals.",
    solution:
      "Layout-aware OCR plus a fine-tuned classifier auto-extracts ID, salary, registration and collateral fields; uncertain extractions are routed for human review.",
    technologies: ["LayoutLMv3", "OCR", "Active Learning"],
    impact: [
      { label: "Straight-through processing", value: "73%" },
      { label: "Onboarding time", value: "−65%" },
      { label: "Field-level accuracy", value: "98.4%" }
    ],
    team: ["Aziza K.", "Komron Y."],
    direction: "Automation",
    status: "Production"
  },
  {
    id: "next-best-action",
    name: "Next-Best-Action Engine",
    short:
      "Personalisation engine that recommends the next product or service for each customer.",
    problem:
      "Cross-sell campaigns relied on segment averages and converted at <2%.",
    solution:
      "Bandit-based recommender over event-stream features picks the next-best-action per customer per channel, with built-in fairness and frequency caps.",
    technologies: ["Contextual Bandits", "Feature Store", "Airflow"],
    impact: [
      { label: "Conversion uplift", value: "+3.4×" },
      { label: "Channels", value: "App, SMS, Branch" },
      { label: "Models in prod", value: "9" }
    ],
    team: ["Otabek M.", "Sherzod A.", "Madina S."],
    direction: "Automation",
    status: "PoC"
  },
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
    team: ["Murodjon M.", "Daler E.", "Akbar K."],
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
    projects: ["credit-risk-llm", "voice-banker", "next-best-action"]
  },
  {
    id: "muhammadjon",
    name: "Muhammadjon Nuritdinov",
    role: "Lead Manager",
    bio: "Leads AI initiatives at SQB with 5+ years in fintech: Ijro AI, Financial Assistant AI, LogiCoreAI, SQB Voice.",
    skills: ["AI Strategy", "Program Mgmt", "Architecture", "KPIs"],
    photo: "/team/muhammadjon.jpg",
    projects: ["credit-risk-llm", "voice-banker", "doc-ocr", "next-best-action"]
  },
  {
    id: "umidjon",
    name: "Umidjon Abdukhamidov",
    role: "AI / Business & System Analyst",
    bio: "Shapes business and functional requirements, prepares data and supports AI delivery from idea to integration.",
    skills: ["Business Analysis", "BERT", "Surya OCR", "Data Prep"],
    photo: "/team/umidjon.jpg",
    projects: ["doc-ocr", "voice-banker", "credit-risk-llm"]
  },
  {
    id: "timurjon",
    name: "Timurjon Kumkov",
    role: "Project Manager",
    bio: "Full-cycle PM across IT and AI projects in banking; ex-IT Park Uzbekistan and SQB Mobile / CROBS.",
    skills: ["Scrum", "Kanban", "WBS", "Stakeholders"],
    photo: "/team/timurjon.jpg",
    projects: ["voice-banker", "next-best-action"]
  },
  {
    id: "javokhir",
    name: "Javokhir Aliakbarov",
    role: "Scrum Master",
    bio: "Drives delivery for the AI team in Jira; supports prompt engineering for SQB chat, HR, Audit and CROBS bots.",
    skills: ["Jira", "Scrum", "Prompt Eng.", "Coordination"],
    photo: "/team/javokhir.jpg",
    projects: ["voice-banker"]
  },
  {
    id: "murodjon",
    name: "Murodjon Mirzaev",
    role: "Senior Data Engineer",
    bio: "Banking DWH and DataOps since 2020; delivered enterprise warehouses across multiple banks before returning to SQB.",
    skills: ["PostgreSQL", "PL/SQL", "Power BI", "SSIS"],
    photo: "/team/murodjon.jpg",
    projects: ["credit-risk-llm", "fraud-graph", "next-best-action"]
  },
  {
    id: "abdullo",
    name: "Abdullo Navruzov",
    role: "Software Engineer (Backend)",
    bio: "Backend and AI integration at SQB: SQB Chat Assistant, Obnal AI, Ijro AI; deployed Qwen3-32B and GPT-OSS-20B on GPU.",
    skills: ["Node.js", "OpenAI API", "LLM Ops", "Socket.IO"],
    photo: "/team/abdullo.jpg",
    projects: ["voice-banker", "doc-ocr", "fraud-graph"]
  },
  {
    id: "azizbek",
    name: "Azizbek Qodirov",
    role: "Junior Java Backend Developer",
    bio: "Integrates AI services with Java applications and Telegram bots. Worked on HR bot, chat-bot and CROBS AI assistant.",
    skills: ["Java", "Spring", "Telegram API", "AI Integration"],
    photo: "/team/azizbek.jpg",
    projects: ["voice-banker"]
  },
  {
    id: "daler",
    name: "Daler Ergashev",
    role: "Junior Angular Developer",
    bio: "Builds Angular SPA interfaces and integrates with backend APIs; works on AI-Admin, SQB-Ijro and Monitoring.",
    skills: ["Angular", "TypeScript", "PL/SQL", "REST"],
    photo: "/team/daler.jpg",
    projects: ["doc-ocr", "branch-vision"]
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
    projects: ["branch-vision", "voice-banker"]
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
