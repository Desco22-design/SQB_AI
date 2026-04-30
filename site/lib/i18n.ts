export type Locale = "uz" | "ru" | "en";

export const LOCALES: Locale[] = ["uz", "ru", "en"];
export const LOCALE_LABELS: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN"
};
export const DEFAULT_LOCALE: Locale = "uz";

type Dict = {
  nav: {
    about: string;
    projects: string;
    features: string;
    team: string;
    impact: string;
    news: string;
    faq: string;
    getStarted: string;
    apply: string;
  };
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string;
    h1c: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trusted: string;
  };
  about: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    h2c: string;
    sub: string;
    benefits: { title: string; body: string }[];
  };
  features: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    decisioningEyebrow: string;
    decisioningTitle: string;
    decisioningBody: string;
    decisioningDetails: string[];
    forecastingEyebrow: string;
    forecastingTitle: string;
    forecastingBody: string;
    forecastingDetails: string[];
    seeInAction: string;
    modalClose: string;
    statusApprove: string;
    statusReview: string;
    statusDecline: string;
  };
  projects: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    h2c: string;
    sub: string;
    direction: string;
    statusLabel: string;
    viewCards: string;
    viewTable: string;
    all: string;
    production: string;
    poc: string;
    contributors: string;
    readCase: string;
    empty: string;
    table: {
      project: string;
      direction: string;
      status: string;
      impact: string;
      tech: string;
      team: string;
      people: string;
    };
    modal: {
      problem: string;
      solution: string;
      impact: string;
      team: string;
    };
    directions: {
      Risk: string;
      "Credit Scoring": string;
      Automation: string;
      "NLP / Chatbots": string;
      "Computer Vision": string;
    };
    list: Record<
      string,
      { name: string; short: string; problem: string; solution: string }
    >;
  };
  team: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    projects: string;
    members: Record<string, { name: string; role: string; bio: string }>;
  };
  impact: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    updated: string;
    items: { label: string }[];
  };
  news: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    read: string;
    back: string;
    categories: { Update: string; Insight: string; Announcement: string };
    items: Record<
      string,
      { title: string; excerpt: string; body: string[] }
    >;
  };
  events: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    h2c: string;
    sub: string;
    items: Record<string, { name: string; place: string; participants: string }>;
  };
  gallery: { eyebrow: string; h2a: string; h2b: string; sub: string };
  faq: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    stillHave: string;
    items: { q: string; a: string }[];
  };
  contact: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    fields: {
      name: string;
      namePh: string;
      email: string;
      emailPh: string;
      company: string;
      companyPh: string;
      message: string;
      messagePh: string;
    };
    send: string;
    sending: string;
    sent: string;
    privacy: string;
    address: string;
    errAll: string;
    errEmail: string;
  };
  footer: {
    tagline: string;
    explore: string;
    engage: string;
    contact: string;
    rights: string;
    disclaimer: string;
  };
};

const en: Dict = {
  nav: {
    about: "About",
    projects: "Projects",
    features: "Features",
    team: "Team",
    impact: "Impact",
    news: "News",
    faq: "FAQ",
    getStarted: "Get Started",
    apply: "Contact us"
  },
  hero: {
    eyebrow: "Welcome to SQB AI",
    h1a: "Artificial",
    h1b: "Intelligence,",
    h1c: "creating results",
    sub: "We design, build and operate AI systems at SQB — from credit risk and fraud to multilingual conversational banking — and measure them in basis points, not blog posts.",
    ctaPrimary: "Explore Projects",
    ctaSecondary: "Meet the Team",
    trusted: "Trusted across the bank and beyond"
  },
  about: {
    eyebrow: "About",
    h2a: "How AI creates ",
    h2b: "measurable value",
    h2c: " at SQB",
    sub: "We embed AI into the bank's decision loop — not as a demo, but as a measured component of risk, customer experience and operations.",
    benefits: [
      {
        title: "Real-time decisions",
        body: "Scoring and decision-making on applications and transactions in milliseconds — without losing accuracy."
      },
      {
        title: "Intelligent risk management",
        body: "AI models predict defaults, detect anomalies and reduce credit and operational risks."
      },
      {
        title: "End-to-end process automation",
        body: "From application intake to final decision — AI reduces manual work and accelerates operations."
      },
      {
        title: "Measurable business impact",
        body: "Conversion uplift, cost reduction and efficiency gains — every result is backed by data."
      }
    ]
  },
  features: {
    eyebrow: "Features",
    h2a: "How SQB AI ",
    h2b: "transforms banking processes",
    sub: "Every AI solution at SQB is backed by performance metrics — from response time to model accuracy.",
    decisioningEyebrow: "Benchmark",
    decisioningTitle: "AI for the Uzbek language",
    decisioningBody:
      "The first banking AI benchmark for Uzbek — evaluates 17 models on 1377 questions across 6 task types and 3 speech registers.",
    decisioningDetails: [
      "ULAB Benchmark is the first banking AI benchmark for the Uzbek language, created in March 2026. The goal is to identify which AI model best understands Uzbek.",
      "The benchmark evaluates 17 leading AI models on 1377 questions, split across 6 task types (comprehension, generation, classification, translation, dialogue, error-handling) and 3 speech registers (formal, neutral, conversational).",
      "Top-3 results: Kimi K2.5 — 70.2%, Mistral Large 2410 — 69.3%, Cogito 67B — 68.1%. The benchmark is used to select the best models for banking tasks across the contact centre, onboarding and document workflows."
    ],
    forecastingEyebrow: "Analytics & Forecasting",
    forecastingTitle: "AI in analytics and forecasting",
    forecastingBody:
      "Strategic decision support based on data and interpretable machine-learning models — forecasting risks, customer behaviour and portfolio performance.",
    forecastingDetails: [
      "Forecasting risks, customer behaviour and portfolio performance using interpretable models — every forecast comes with confidence intervals and feature attributions, not just a point estimate.",
      "Calibrated PD curves and early-warning signals across the SME and retail credit book, refreshed weekly and reviewed by risk every quarter.",
      "Beyond credit, the same toolkit produces capital-planning scenarios, deposit-attrition forecasts and contact-centre demand projections — anywhere a portfolio-level number drives a decision."
    ],
    seeInAction: "View cases",
    modalClose: "Close",
    statusApprove: "Approve",
    statusReview: "Review",
    statusDecline: "Decline"
  },
  projects: {
    eyebrow: "Projects",
    h2a: "Investigating the latest ",
    h2b: "AI projects",
    h2c: " in production",
    sub: "Real cases shipped at SQB. Filter by direction or status — switch between visual cards and a metrics table.",
    direction: "Direction",
    statusLabel: "Status",
    viewCards: "Cards",
    viewTable: "Table",
    all: "All",
    production: "Production",
    poc: "PoC",
    contributors: "contributors",
    readCase: "Read case",
    empty: "No projects match the selected filters.",
    table: {
      project: "Project",
      direction: "Direction",
      status: "Status",
      impact: "Impact",
      tech: "Tech",
      team: "Team",
      people: "people"
    },
    modal: {
      problem: "Problem",
      solution: "AI Solution",
      impact: "Impact",
      team: "Team"
    },
    directions: {
      Risk: "Risk",
      "Credit Scoring": "Credit Scoring",
      Automation: "Automation",
      "NLP / Chatbots": "NLP / Chatbots",
      "Computer Vision": "Computer Vision"
    },
    list: {
      "credit-risk-llm": {
        name: "Credit Risk Copilot",
        short:
          "LLM-powered analyst assistant that drafts risk memos from raw financial filings.",
        problem:
          "Manual analyst review of corporate borrowers takes 6–8 hours per file and varies by reviewer.",
        solution:
          "Domain-tuned LLM pipeline ingests filings, extracts ratios, benchmarks against sector cohorts and produces a draft credit memo for analyst review."
      },
      "fraud-graph": {
        name: "Real-time Fraud Graph",
        short:
          "Graph neural network that scores transactions against a 40M-edge customer graph in <80ms.",
        problem:
          "Rule-based fraud detection missed coordinated multi-account schemes and produced a 1:18 false-positive ratio.",
        solution:
          "Streaming GNN scores every card-not-present transaction using behavioural and counter-party features, calibrated against historical loss data."
      },
      "branch-vision": {
        name: "Branch Vision Analytics",
        short:
          "Computer vision platform that measures queue length and service quality across 180 branches.",
        problem:
          "Branch operations had no objective metric for customer wait time or teller utilisation.",
        solution:
          "On-edge YOLO + person re-identification model running on existing CCTV produces anonymised flow analytics streamed into a Power BI dashboard."
      },
      "voice-banker": {
        name: "VoiceBanker NLU",
        short:
          "Uzbek + Russian voice assistant for the contact centre with on-call agent hand-off.",
        problem:
          "Contact centre handled 70% repetitive intents — balance, card status, transfers — with 6+ minute average handle time.",
        solution:
          "Multilingual NLU with Whisper-based ASR, intent classification and orchestrated tool-use to call core-banking APIs; routes complex cases to human agents with full context."
      },
      "doc-ocr": {
        name: "Document Intelligence",
        short:
          "Multi-modal OCR + classifier pipeline for retail-loan applications.",
        problem:
          "Loan onboarding required manual entry from 12 document types, blocking same-day approvals.",
        solution:
          "Layout-aware OCR plus a fine-tuned classifier auto-extracts ID, salary, registration and collateral fields; uncertain extractions are routed for human review."
      },
      "next-best-action": {
        name: "Next-Best-Action Engine",
        short:
          "Personalisation engine that recommends the next product or service for each customer.",
        problem:
          "Cross-sell campaigns relied on segment averages and converted at <2%.",
        solution:
          "Bandit-based recommender over event-stream features picks the next-best-action per customer per channel, with built-in fairness and frequency caps."
      },
      "risk-mgmt-ml": {
        name: "Risk Management ML",
        short:
          "ML scoring and automated risk-appetite calculation across the credit book.",
        problem:
          "Customer default risk is not modeled with ML; scoring uses only KATM, DSI and Uzinfocom data; risk-appetite reports take 2 working days to prepare manually.",
        solution:
          "Logistic regression, XGBoost and neural networks predict default probability; integration with telco operators and YHXX bases enriches the scoring model; risk appetite is calculated and monitored automatically in real time."
      },
      "admin-fleet": {
        name: "Fleet & Energy AI",
        short:
          "GPS telematics, ML-based driving evaluation and predictive maintenance for vehicles, solar panels and transformers.",
        problem:
          "Monthly fleet expense reports take 3 working days; 120+ vehicles with 20+ receipts each; driving style is not analysed; data on 5 suppliers, 10+ portals and 40+ generators is scattered.",
        solution:
          "GPS modules and telematics integration digitise route sheets; an ML model evaluates driving style; a unified BI dashboard pulls supplier APIs; predictive-maintenance models flag panel degradation and transformer issues before they cause outages."
      }
    }
  },
  team: {
    eyebrow: "Team",
    h2a: "People ",
    h2b: "behind the models",
    sub: "A cross-functional AI team — engineers, scientists and product — working hand-in-hand with risk, retail and operations.",
    projects: "Projects",
    members: {
      kozlov: {
        name: "Sergey Kozlov",
        role: "Chief AI Officer & Advisor to the Chairman",
        bio: "Sets the AI strategy at SQB and advises the Chairman of the Board on AI initiatives across the bank."
      },
      muhammadjon: {
        name: "Muhammadjon Nuritdinov",
        role: "Head of AI",
        bio: "Leads strategic AI initiatives at SQB with 5+ years in fintech: Ijro AI, Financial Assistant AI, LogiCoreAI, SQB Voice."
      },
      umidjon: {
        name: "Umidjon Abdukhamidov",
        role: "AI / Business & Systems Analyst",
        bio: "Shapes business and functional requirements, prepares data and supports AI delivery across all stages."
      },
      timurjon: {
        name: "Timurjon Kumkov",
        role: "Project Manager",
        bio: "Full-cycle PM across IT and AI projects in banking; previously led SQB Mobile and CROBS as Scrum Master."
      },
      javokhir: {
        name: "Javokhir Aliakbarov",
        role: "Scrum Master",
        bio: "Drives delivery for the AI team in Jira and supports prompt engineering for the SQB chat-bot, HR, Audit and CROBS assistants."
      },
      murodjon: {
        name: "Murodjon Mirzaev",
        role: "Senior Data Engineer",
        bio: "Banking DWH and DataOps since 2020; delivered enterprise warehouses across multiple banks before returning to SQB."
      },
      abdullo: {
        name: "Abdullo Navruzov",
        role: "Backend Developer",
        bio: "Backend and AI integration at SQB: SQB Chat Assistant, Obnal AI, Ijro AI; deployed Qwen3-32B and GPT-OSS-20B on GPU."
      },
      azizbek: {
        name: "Azizbek Qodirov",
        role: "Junior Java Backend Developer",
        bio: "Integrates AI services with Java applications and Telegram bots; works on the HR bot, chat-bot and CROBS AI assistant."
      },
      daler: {
        name: "Daler Ergashev",
        role: "Junior Angular Developer",
        bio: "Builds Angular SPA interfaces and integrates with backend APIs; works on AI-Admin, SQB-Ijro and Monitoring."
      },
      odiljon: {
        name: "Odiljon Anvarov",
        role: "HR Project Manager",
        bio: "Owns IT and AI hiring at SQB; runs the SQB Start program and co-built the AI-powered HR Telegram bot."
      },
      dilshodbek: {
        name: "Dilshodbek Normatov",
        role: "UX/UI Designer",
        bio: "Designs interfaces and prototypes for SQB Monitoring, SQB AI Chat, MFI and CROBS AI Chat; leverages AI tools in design."
      }
    }
  },
  impact: {
    eyebrow: "AI Impact",
    h2a: "Numbers that ",
    h2b: "move the needle",
    sub: "Aggregate impact of the AI Department across credit risk, fraud, automation and customer experience — measured against pre-AI baselines and audited quarterly.",
    updated: "Updated April 2026 · based on Risk Mgmt and Admin/Fleet AI projects",
    items: [
      { label: "Risky-customer detection (improvement)" },
      { label: "Credit decisions speed-up" },
      { label: "Labour productivity savings" },
      { label: "Manual errors (reduction)" }
    ]
  },
  news: {
    eyebrow: "News & Updates",
    h2a: "What's ",
    h2b: "new",
    sub: "Announcements, deep-dives and updates from the AI Department.",
    read: "Read article",
    back: "Back",
    categories: {
      Update: "Update",
      Insight: "Insight",
      Announcement: "Announcement"
    },
    items: {
      n1: {
        title: "SQB AI Hackathon: at the heart of digital future and innovative solutions",
        excerpt:
          "SQB and New Uzbekistan University co-hosted an AI Hackathon, bringing young developers together to solve real banking and finance challenges.",
        body: [
          "As part of the priority tasks set by the country's leadership for digital-economy development and the wide adoption of artificial intelligence (AI) technologies, SQB and New Uzbekistan University co-organised the \"AI Hackathon\".",
          "The initiative engages young developers and startup teams in finding innovative solutions for real-world challenges in banking and finance, helping create new jobs and shape modern professional skills. The bank now puts special focus on using AI to simplify services and deeply analyse customer needs to deliver personalised offers.",
          "Hackathon results: 1st place — a regional-analytics-based decision-making platform for entrepreneurs; 2nd place — an ATM network optimisation project covering cash flow and cash-in-transit logistics; 3rd place — a solution recommending new business directions based on regional competition and demand analysis.",
          "Initiatives like these are an important step toward turning SQB not only into a financial institution, but also into a national centre of advanced technology and innovation."
        ]
      },
      n2: {
        title: "Artificial Intelligence becomes a driver of Uzbekistan's economy",
        excerpt:
          "An international conference on AI and digital transformation hosted by SQB gathered government, banks and the IT industry on one stage.",
        body: [
          "Uzsanoatqurilishbank (SQB) hosted an international conference in Tashkent: \"Artificial Intelligence and Digital Transformation: A New Stage in Uzbekistan's Economic Development\".",
          "President Shavkat Mirziyoyev has set priority tasks for developing AI technologies and embedding them across the economy and social sectors. The reforms in this direction are crucial for shaping a digital economy and securing innovation-led growth.",
          "The event focused on bringing AI technologies into the real economy, accelerating digital transformation, and lifting cooperation between government, business and academia to a new level. Representatives of academia, government and the IT industry shared a single stage as the country's main AI drivers.",
          "Speakers included Sh. Ayupov (President, Academy of Sciences) on priority directions in fundamental and applied science; O. Pekos (First Deputy Minister of Digital Technologies) on digital-economy and AI infrastructure; A. Abdullaev (Director, Centre for Digital Education and AI Development) on AI training and education-system transformation; and M. Muksinova (Deputy CEO, IT Park Uzbekistan) on the IT ecosystem and export-oriented digital businesses.",
          "As a practical outcome, SQB presented its \"AI Advisor\" platform — designed to support entrepreneurship by analysing citizens' business ideas, assessing profitability and shaping financing options."
        ]
      },
      n3: {
        title: "SQB AI Advisor — turn an idea into a real business in minutes",
        excerpt:
          "A digital assistant from SQB that analyses your idea, regional market needs and produces a ready business plan with financing options.",
        body: [
          "Got an idea but don't know how or where to start your business? It's no longer a problem.",
          "SQB AI Advisor — a digital solution from SQB that turns an idea into a real business in just a few minutes. You only enter the idea — the system does the rest: analyses your experience and capabilities, studies market needs in your region, and identifies the most suitable business direction.",
          "The pilot is currently live in the Gijduvan and Shofirkon districts of Bukhara region.",
          "In just 5–10 minutes you get: a ready business plan, the required volume of financial resources, the project payback period and a step-by-step action plan. The platform also lets you pick a matching loan and submit an online financing application — no long deliberations, no risky decisions, just a clear plan and action.",
          "SQB — building the future together."
        ]
      },
      n4: {
        title: "Youth, startups and IT: SQB and New Uzbekistan University launch cooperation",
        excerpt:
          "A memorandum signed within the university's accelerator program covers AI, cybersecurity, research and joint startup projects.",
        body: [
          "A memorandum of cooperation between New Uzbekistan University and SQB has been signed as part of the university's startup-acceleration programme.",
          "The memorandum is aimed at integrating education with practice, training specialists with up-to-date competencies, and developing a long-term partnership between the university and the bank.",
          "Priority cooperation areas include information technology, artificial intelligence, cybersecurity, scientific research and startup-project development.",
          "The agreement opens new opportunities for students — internships, joint courses and trainings, work on real-world cases, and the development of their own startup initiatives.",
          "For the bank, the partnership becomes a tool for building a talent pipeline, attracting young IT specialists and accelerating digital transformation."
        ]
      },
      n5: {
        title: "Youth potential and innovation — a priority direction",
        excerpt:
          "SQB signs a memorandum of cooperation with Turin Polytechnic University to deliver joint AI and IT projects.",
        body: [
          "In an open dialogue with young people last year, the country's leadership emphasised that information technology and artificial intelligence are among the key drivers of future development, and that supporting youth in these fields is a priority.",
          "To that end, Uzsanoatqurilishbank (SQB) is consistently expanding cooperation with higher-education institutions. In particular, a memorandum of cooperation has been signed between the bank and Turin Polytechnic University.",
          "Within the partnership: joint projects in IT and artificial intelligence will be carried out; talented students will be involved in the bank's digital initiatives; students will be systematically engaged in practical work; and a talent pipeline of promising IT specialists will be formed.",
          "The cooperation creates new opportunities for young people's professional growth and for acquiring modern knowledge and practical skills.",
          "SQB — building the future together with the youth!"
        ]
      }
    }
  },
  events: {
    eyebrow: "Events",
    h2a: "",
    h2b: "Conferences",
    h2c: ", meetups, internal days",
    sub: "Where the AI Department speaks, hosts and learns.",
    items: {
      e1: {
        name: "SQB AI Hackathon",
        place: "Tashkent",
        participants: "AI engineers, developers, students"
      },
      e2: {
        name: "International Conference: AI and Digital Transformation — A New Stage of Uzbekistan's Economy",
        place: "Tashkent",
        participants: "Government, banks, experts"
      },
      e3: {
        name: "Partnership between SQB and \"New Uzbekistan\" University",
        place: "New Uzbekistan University, Tashkent",
        participants: "University and SQB representatives"
      },
      e4: {
        name: "Partnership between SQB and Turin Polytechnic University",
        place: "Turin Polytechnic University, Tashkent",
        participants: "University and SQB representatives"
      }
    }
  },
  gallery: {
    eyebrow: "Media Gallery",
    h2a: "",
    h2b: "Moments from the team",
    sub: "Highlights from talks, hackathons and everyday work."
  },
  faq: {
    eyebrow: "FAQ",
    h2a: "Answers to your ",
    h2b: "questions",
    sub: "Quick answers about the AI Department, how to engage with us, and how our models work in production.",
    stillHave: "Still have questions? Get in touch",
    items: [
      {
        q: "What is the SQB AI Department?",
        a: "We are the bank's in-house AI team. We design, build and operate machine-learning systems across credit risk, fraud, automation, NLP and computer vision — and we measure their business impact against pre-AI baselines."
      },
      {
        q: "How do I get started with SQB AI?",
        a: "Use the Collaborate form below or write to ai@sqb.uz with a short brief — your problem, target metric and any data you can share. We respond within two business days and triage to a relevant team lead."
      },
      {
        q: "Does SQB AI work on cryptocurrencies?",
        a: "No. The AI Department is focused on banking decisions — credit, risk, fraud and customer experience. For other inquiries please contact the SQB Innovation Office."
      },
      {
        q: "How do you ensure the safety of AI decisions?",
        a: "Our models inform decisioning inside the bank's production systems with full audit trails, version control and rollback. Safety and explainability are non-negotiable."
      },
      {
        q: "Can external partners collaborate with the AI team?",
        a: "Yes — vendors, universities and fintech partners are welcome. Use the Collaborate form to start the conversation."
      },
      {
        q: "How are AI models monitored in production?",
        a: "Every production model has a monitoring dashboard — input drift, prediction distribution, calibration and business KPIs. We auto-alert on drift and review every model quarterly with risk and audit."
      }
    ]
  },
  contact: {
    eyebrow: "Collaborate",
    h2a: "Let's build something",
    h2b: "measurable.",
    sub: "Partners, vendors, candidates and internal teams — tell us what you're working on and we'll get back within two business days.",
    fields: {
      name: "Full name",
      namePh: "Your name",
      email: "Work email",
      emailPh: "you@company.com",
      company: "Company / Team",
      companyPh: "Optional",
      message: "How can we help?",
      messagePh: "Briefly describe your use case, dataset and target metric."
    },
    send: "Send message",
    sending: "Sending…",
    sent: "Sent",
    privacy: "We don't share your message. Public-data inquiries only.",
    address: "Republic of Uzbekistan, Tashkent, 100000, Shakhrisabz street, 3",
    errAll: "Please fill in all required fields.",
    errEmail: "Please enter a valid email address."
  },
  footer: {
    tagline:
      "We design, build and operate AI systems that move real banking metrics — credit risk, fraud, automation, customer experience.",
    explore: "Explore",
    engage: "Engage",
    contact: "Contact",
    rights: "All rights reserved.",
    disclaimer: "Public information only. No personal or sensitive data displayed."
  }
};

const uz: Dict = {
  nav: {
    about: "Biz haqimizda",
    projects: "Loyihalar",
    features: "Imkoniyatlar",
    team: "Jamoa",
    impact: "Natija",
    news: "Yangiliklar",
    faq: "Savollar",
    getStarted: "Boshlash",
    apply: "Bog‘lanish"
  },
  hero: {
    eyebrow: "SQB AI'ga xush kelibsiz",
    h1a: "Natija yaratuvchi",
    h1b: "sun'iy",
    h1c: "intellekt",
    sub: "SQB'da AI tizimlarini ishlab chiqamiz va boshqaramiz — kredit riski va firibgarlikdan tortib ko‘p tilli suhbat-bankgacha — natijalarni esa blog post emas, bazis nuqtalarda o‘lchaymiz.",
    ctaPrimary: "Loyihalarni ko‘rish",
    ctaSecondary: "Jamoa bilan tanishing",
    trusted: "Bank ichida va tashqarisida ishonch qozongan"
  },
  about: {
    eyebrow: "Biz haqimizda",
    h2a: "AI SQB'da qanday qilib ",
    h2b: "o‘lchanadigan qiymat",
    h2c: " yaratadi",
    sub: "AI'ni bankning qaror qabul qilish jarayoniga joriy etamiz — namoyish uchun emas, balki risk, mijoz tajribasi va operatsiyalarda o‘lchanadigan komponent sifatida.",
    benefits: [
      {
        title: "Real vaqtdagi qarorlar",
        body: "Arizalar va tranzaksiyalar bo‘yicha skoring va qaror qabul qilish — millisekundlarda, aniqlikni yo‘qotmasdan."
      },
      {
        title: "Aqlli risk boshqaruvi",
        body: "AI modellari defoltlarni bashorat qiladi, anomaliyalarni aniqlaydi hamda kredit va operatsion risklarni kamaytiradi."
      },
      {
        title: "Jarayonlarning to‘liq avtomatlashuvi",
        body: "Ariza qabulidan yakuniy qarorgacha — AI qo‘l mehnatini qisqartiradi va operatsiyalarni tezlashtiradi."
      },
      {
        title: "O‘lchanadigan biznes natija",
        body: "Konversiya o‘sishi, xarajatlar kamayishi va samaradorlik o‘sishi — barcha natijalar ma'lumotlar bilan tasdiqlangan."
      }
    ]
  },
  features: {
    eyebrow: "Imkoniyatlar",
    h2a: "SQB AI bank jarayonlarini ",
    h2b: "qanday o‘zgartiradi",
    sub: "SQB'dagi har bir AI yechim samaradorlik ko‘rsatkichlari bilan tasdiqlanadi — javob vaqtidan model aniqligigacha.",
    decisioningEyebrow: "Benchmark",
    decisioningTitle: "O‘zbek tili uchun AI",
    decisioningBody:
      "O‘zbek tili uchun birinchi bank AI-benchmarki — 17 ta modelni 1377 ta savol va 6 turdagi til vazifasi bo‘yicha baholaydi.",
    decisioningDetails: [
      "ULAB Benchmark — 2026-yil martda yaratilgan, o‘zbek tili uchun birinchi bank AI-benchmarki. Maqsad — qaysi AI-model o‘zbek tilini eng yaxshi biladi, aniqlash.",
      "Benchmark 17 ta yetakchi AI-modelni 1377 ta savol bo‘yicha baholaydi: 6 turdagi til vazifasi (tushunish, generatsiya, klassifikatsiya, tarjima, dialog, xatolar bilan ishlash) va 3 nutq registri (rasmiy, neytral, suhbat).",
      "Top-3 natija: Kimi K2.5 — 70.2%, Mistral Large 2410 — 69.3%, Cogito 67B — 68.1%. Benchmark aloqa markazi, onboarding va hujjat oqimida bank vazifalari uchun eng yaxshi modellarni tanlash uchun ishlatiladi."
    ],
    forecastingEyebrow: "Analitika va prognoz",
    forecastingTitle: "Analitika va prognozda AI",
    forecastingBody:
      "Ma'lumotlar va tushunarli mashinaviy o‘qitish modellariga asoslangan strategik qaror qabul qilishni qo‘llab-quvvatlash — risklar, mijoz xulq-atvori va portfel samaradorligini bashorat qiladi.",
    forecastingDetails: [
      "Risklar, mijoz xulq-atvori va portfel samaradorligini tushunarli modellar yordamida bashorat qilish — har bir prognoz nuqtali baho emas, ishonch oraliqlari va feature hissalari bilan keladi.",
      "MMT va riteyl kredit portfelida kalibrlangan PD egri chiziqlari va erta ogohlantirish signallari, har hafta yangilanadi va har chorakda risk jamoasi tomonidan ko‘rib chiqiladi.",
      "Kreditdan tashqari, xuddi shu vositalar kapital rejalashtirish ssenariylarini, depozit oqimi prognozlarini va aloqa markazi talabini bashorat qiladi — portfel darajasidagi raqam qarorga ta'sir qiladigan har qanday joyda."
    ],
    seeInAction: "Keyslarni ko‘rish",
    modalClose: "Yopish",
    statusApprove: "Tasdiqlash",
    statusReview: "Tekshiruv",
    statusDecline: "Rad etish"
  },
  projects: {
    eyebrow: "Loyihalar",
    h2a: "Production'dagi eng so‘nggi ",
    h2b: "AI loyihalari",
    h2c: "ni o‘rganib chiqamiz",
    sub: "SQB'da ishga tushirilgan haqiqiy keyslar. Yo‘nalish yoki status bo‘yicha filtrlang — kartochka va metrik jadvali o‘rtasida almashtiring.",
    direction: "Yo‘nalish",
    statusLabel: "Status",
    viewCards: "Kartochkalar",
    viewTable: "Jadval",
    all: "Hammasi",
    production: "Production",
    poc: "PoC",
    contributors: "ishtirokchi",
    readCase: "Keys'ni o‘qish",
    empty: "Tanlangan filtr bo‘yicha loyiha topilmadi.",
    table: {
      project: "Loyiha",
      direction: "Yo‘nalish",
      status: "Status",
      impact: "Natija",
      tech: "Texnologiya",
      team: "Jamoa",
      people: "kishi"
    },
    modal: {
      problem: "Muammo",
      solution: "AI Yechim",
      impact: "Natija",
      team: "Jamoa"
    },
    directions: {
      Risk: "Risk",
      "Credit Scoring": "Kredit skoring",
      Automation: "Avtomatlashtirish",
      "NLP / Chatbots": "NLP / Chatbotlar",
      "Computer Vision": "Kompyuter ko‘rish"
    },
    list: {
      "credit-risk-llm": {
        name: "Credit Risk Copilot",
        short:
          "Moliyaviy hisobotlardan risk memolarini avtomatik tayyorlovchi LLM-asosli analitik yordamchi.",
        problem:
          "Korporativ qarz oluvchilarni qo‘lda tahlil qilish har bir hujjat uchun 6–8 soat oladi va analitiklarga qarab farq qiladi.",
        solution:
          "Domenga moslashtirilgan LLM hujjatlarni o‘qib, koeffitsientlarni ajratadi, sektor bo‘yicha taqqoslaydi va analitik ko‘rib chiqishi uchun kredit memo loyihasini taqdim etadi."
      },
      "fraud-graph": {
        name: "Real-time Fraud Graph",
        short:
          "40M qirrali mijoz grafida tranzaksiyalarni 80ms dan kam vaqtda baholaydigan graf neyron tarmoq.",
        problem:
          "Qoidalarga asoslangan firibgarlik aniqlash muvofiqlashtirilgan ko‘p hisobli sxemalarni o‘tkazib yubordi va 1:18 noto‘g‘ri-ijobiy nisbat berdi.",
        solution:
          "Streaming GNN har bir CNP tranzaksiyani xulq-atvor va kontragent xususiyatlari bo‘yicha baholaydi, tarixiy yo‘qotish ma'lumotlariga moslangan."
      },
      "branch-vision": {
        name: "Branch Vision Analytics",
        short:
          "180 ta filialda navbat uzunligi va xizmat sifatini o‘lchaydigan kompyuter ko‘rish platformasi.",
        problem:
          "Filial operatsiyalarida mijozning kutish vaqti yoki kassir bandligi uchun ob'ektiv ko‘rsatkich yo‘q edi.",
        solution:
          "Mavjud CCTV'da ishlovchi YOLO + person re-identification modeli anonim oqim tahlilini Power BI dashboardiga uzatadi."
      },
      "voice-banker": {
        name: "VoiceBanker NLU",
        short:
          "Aloqa markazi uchun o‘zbek + rus tilli ovozli yordamchi, jonli operatorga uzatish bilan.",
        problem:
          "Aloqa markazi 70% takroriy so‘rovlar — balans, karta holati, o‘tkazma — 6+ daqiqa o‘rtacha vaqt bilan ishladi.",
        solution:
          "Whisper-asosli ASR, intent klassifikatsiya va core-banking API'larni chaqirish uchun tool-use bilan ko‘p tilli NLU; murakkab keyslarni operatorga to‘liq kontekst bilan uzatadi."
      },
      "doc-ocr": {
        name: "Document Intelligence",
        short:
          "Riteyl kreditlari uchun multi-modal OCR + klassifikator pipeline.",
        problem:
          "Kredit onboarding 12 turdagi hujjatlardan qo‘lda kiritishni talab qilardi, kun ichida tasdiqlashga to‘sqinlik qildi.",
        solution:
          "Layout-aware OCR va fine-tuned klassifikator passport, maosh, ro‘yxatga olish va garov maydonlarini avtomatik ajratadi; ishonchsiz ekstraktsiyalar ko‘rib chiqishga yo‘naltiriladi."
      },
      "next-best-action": {
        name: "Next-Best-Action Engine",
        short:
          "Har bir mijoz uchun keyingi mahsulot yoki xizmatni tavsiya qiluvchi personalizatsiya dvigatel.",
        problem:
          "Cross-sell kampaniyalari segment o‘rtachalariga tayanardi va 2% dan kam konversiya berardi.",
        solution:
          "Bandit-asosli recommender event-stream xususiyatlari ustida har bir mijoz va kanal uchun next-best-action tanlaydi, halollik va chastota cheklovlari bilan."
      },
      "risk-mgmt-ml": {
        name: "Risk menejment ML",
        short:
          "Kredit portfeli uchun ML-skoring va risk-appetitni avtomatlashtirilgan hisoblash.",
        problem:
          "Mijozning defolt darajasi ML modellari bilan baholanmagan; skoring faqat KATM, DSI va Uzinfocom asosida; risk-appetit hisoboti qo'lda 2 ish kuni tayyorlanadi.",
        solution:
          "Logistic regression, XGBoost va neyron tarmoqlar defolt ehtimolini bashorat qiladi; aloqa operatorlari va YHXX bazalari bilan integratsiya skoring modelini boyitadi; risk-appetit avtomatik real vaqt rejimida hisoblanadi va kuzatiladi."
      },
      "admin-fleet": {
        name: "Avtopark va energetika AI",
        short:
          "Avtomobillar, quyosh panellari va transformatorlar uchun GPS telematika, ML-asosli haydash uslubi baholash va bashoratli texnik xizmat.",
        problem:
          "Avtopark xarajatlari oylik hisobotiga 3 ish kuni sarflanadi; 120+ avtomobil, har biriga 20+ chek; haydash uslubi tahlil qilinmagan; 5 ta'minotchi, 10+ shaxsiy kabinet va 40+ generator bo'yicha tarqoq ma'lumotlar.",
        solution:
          "GPS modullari va telematika integratsiyasi yo'l varaqalarini raqamlashtiradi; ML-modeli haydash uslubini baholaydi; yagona BI dashbord ta'minotchi API'larini birlashtiradi; bashoratli texnik-xizmat modellari panel degradatsiyasi va transformator nosozliklarini oldindan aniqlaydi."
      }
    }
  },
  team: {
    eyebrow: "Jamoa",
    h2a: "Modellar ",
    h2b: "ortidagi insonlar",
    sub: "Cross-funksional AI jamoa — muhandislar, olimlar va product — risk, riteyl va operatsiyalar bilan birga ishlaydi.",
    projects: "Loyihalar",
    members: {
      kozlov: {
        name: "Sergey Kozlov",
        role: "Sun'iy intellekt bo'yicha bosh direktor va Rais maslahatchisi",
        bio: "SQB'ning AI strategiyasini belgilaydi va Bank Boshqaruvi Raisiga AI tashabbuslari bo'yicha maslahat beradi."
      },
      muhammadjon: {
        name: "Muhammadjon Nuritdinov",
        role: "AI bo'limi rahbari",
        bio: "SQB'da AI loyihalarini boshqaradi. Moliya sohasida 5+ yil tajriba: Ijro AI, Financial Assistant AI, LogiCoreAI, SQB Voice."
      },
      umidjon: {
        name: "Umidjon Abduxamidov",
        role: "AI / Biznes va tizim tahlilchisi",
        bio: "Biznes va funksional talablarni shakllantiradi, ma'lumotlarni tayyorlaydi va AI yechimlarni barcha bosqichlarda joriy etishni qo'llab-quvvatlaydi."
      },
      timurjon: {
        name: "Timurjon Kumkov",
        role: "Loyiha menejeri",
        bio: "Bank sohasida IT va AI loyihalarni to'liq tsikl bilan boshqaradi; ilgari SQB Mobile va CROBS'da Scrum Master bo'lgan."
      },
      javokhir: {
        name: "Javohir Aliakbarov",
        role: "Scrum Master",
        bio: "AI jamoasi vazifalarini Jira'da boshqaradi; SQB chat-bot, HR, Audit va CROBS botlari uchun promptlarni rivojlantirishni qo'llab-quvvatlaydi."
      },
      murodjon: {
        name: "Murodjon Mirzaev",
        role: "Katta data muhandis",
        bio: "2020-yildan beri bank DWH va DataOps mutaxassisi; bir nechta banklarda korporativ ma'lumot omborlarini joriy etgan."
      },
      abdullo: {
        name: "Abdullo Navruzov",
        role: "Backend dasturchi",
        bio: "SQB'da backend va AI integratsiya: SQB Chat Assistant, Obnal AI, Ijro AI; Qwen3-32B va GPT-OSS-20B'ni GPU'da joriy etgan."
      },
      azizbek: {
        name: "Azizbek Qodirov",
        role: "Junior Java Backend dasturchi",
        bio: "AI servislarini Java ilovalari va Telegram-botlar bilan integratsiya qiladi; HR-bot, chat-bot va CROBS AI yordamchisi loyihalarida ishlaydi."
      },
      daler: {
        name: "Daler Ergashev",
        role: "Junior Angular dasturchi",
        bio: "Angular SPA interfeyslarini ishlab chiqadi va backend API bilan integratsiya qiladi; AI-Admin, SQB-Ijro va Monitoring loyihalarida ishlaydi."
      },
      odiljon: {
        name: "Odiljon Anvarov",
        role: "HR loyiha menejeri",
        bio: "SQB'da IT va AI mutaxassislarini ishga olishni boshqaradi; SQB Start ta'lim dasturini olib boradi va AI asosli HR Telegram-botni birga qurgan."
      },
      dilshodbek: {
        name: "Dilshodbek Normatov",
        role: "UX/UI dizayner",
        bio: "SQB Monitoring, SQB AI Chat, MFI va CROBS AI Chat uchun interfeys va prototiplar yaratadi; dizaynda AI vositalardan foydalanadi."
      }
    }
  },
  impact: {
    eyebrow: "AI Natijasi",
    h2a: "Natijani ",
    h2b: "siljitadigan raqamlar",
    sub: "Kredit riski, firibgarlik, avtomatlashtirish va mijoz tajribasi bo‘yicha AI bo‘limining umumiy natijasi — AI'gacha bo‘lgan bazaga nisbatan o‘lchangan va har chorakda audit qilinadi.",
    updated: "2026-yil aprel · Risk menejment va Ma'muriy xo'jalik AI loyihalari asosida",
    items: [
      { label: "Riskli mijozlarni aniqlash (o'sish)" },
      { label: "Kreditlarni tasdiqlash tezligi" },
      { label: "Mehnat samaradorligi tejam" },
      { label: "Insoniy xatolar (kamayish)" }
    ]
  },
  news: {
    eyebrow: "Yangiliklar",
    h2a: "Eng so‘nggi ",
    h2b: "yangiliklar",
    sub: "AI bo‘limidan e'lonlar, batafsil maqolalar va yangilanishlar.",
    read: "Maqolani o‘qish",
    back: "Orqaga",
    categories: {
      Update: "Yangilanish",
      Insight: "Tahlil",
      Announcement: "E'lon"
    },
    items: {
      n1: {
        title:
          "SQB AI Hackathon: raqamli kelajak va innovatsion yechimlar markazida!",
        excerpt:
          "SQB va Yangi O‘zbekiston universiteti hamkorligida tashkil etilgan AI Hackathon yosh dasturchilarni bank-moliya sohasidagi real masalalarga yechim topishga jalb etdi.",
        body: [
          "Davlatimiz rahbari tomonidan raqamli iqtisodiyotni rivojlantirish va sun'iy intellekt (SI) texnologiyalarini keng joriy etish bo'yicha belgilangan ustuvor vazifalar ijrosi doirasida SQB va Yangi O'zbekiston universiteti hamkorligida \"AI Hackathon\" tashkil etildi.",
          "Ushbu tashabbus yosh dasturchilar va startap jamoalarni bank-moliya sohasidagi real muammolarga innovatsion yechimlar topishga jalb etib, yangi ish o'rinlari yaratish hamda zamonaviy kasbiy ko'nikmalarni shakllantirishga xizmat qiladi. Bugungi kunda bank SI imkoniyatlaridan foydalangan holda xizmatlarni soddalashtirish va mijozlar ehtiyojlarini chuqur tahlil qilish orqali shaxsiylashtirilgan takliflarni taqdim etishga alohida e'tibor qaratmoqda.",
          "Hackathon yakunlariga ko'ra: 1-o'rin — tadbirkorlar uchun hududiy tahlilga asoslangan qaror qabul qilish platformasi; 2-o'rin — bankomatlar tarmog'ini optimallashtirish, naqd pul aylanishi va inkassatsiya logistikasini samarali tashkil etish loyihasi; 3-o'rin — hududlarda raqobat va talab tahlili asosida yangi biznes yo'nalishlarini tavsiya qiluvchi yechim.",
          "Bu kabi intilishlar SQB'ni nafaqat moliyaviy muassasa, balki mamlakatimizning ilg'or texnologiyalar va innovatsiyalar markaziga aylantirish yo'lidagi muhim qadamdir."
        ]
      },
      n2: {
        title:
          "O‘zbekistonda sun'iy intellekt iqtisodiyot drayveriga aylanmoqda",
        excerpt:
          "SQB tomonidan tashkil etilgan xalqaro konferensiya hukumat, banklar va IT-sanoat vakillarini bir minbarda jamladi.",
        body: [
          "Toshkent shahrida O'zsanoatqurilishbank (SQB) tomonidan \"Sun'iy intellekt va raqamli transformatsiya: O'zbekiston iqtisodiyoti rivojlanishining yangi bosqichi\" mavzusidagi xalqaro konferensiya tashkil etildi.",
          "Ma'lumki, Prezident Shavkat Mirziyoyev tomonidan sun'iy intellekt texnologiyalarini rivojlantirish va ularni iqtisodiyot hamda ijtimoiy sohalarga keng joriy etish bo'yicha ustuvor vazifalar belgilab berilgan. Bugungi kunda mazkur yo'nalishda amalga oshirilayotgan izchil islohotlar raqamli iqtisodiyotni shakllantirish va innovatsion rivojlanishni ta'minlashda muhim ahamiyat kasb etmoqda.",
          "Tadbir sun'iy intellekt texnologiyalarini iqtisodiyotning real sektoriga keng joriy etish, raqamli transformatsiya jarayonlarini jadallashtirish hamda davlat, biznes va ilm-fan o'rtasidagi hamkorlikni yangi bosqichga olib chiqishga qaratildi. Unda mamlakatning asosiy drayverlari bo'lgan ilm-fan, davlat va IT-industriya vakillari bir minbarda jamlandi.",
          "Ishtirokchilar orasida: O'zbekiston Fanlar akademiyasi prezidenti, akademik Sh. Ayupov; Raqamli texnologiyalar vazirining birinchi o'rinbosari O. Pekos; Raqamli ta'lim va sun'iy intellektni rivojlantirish markazi direktori A. Abdullayev; \"IT Park Uzbekistan\" bosh direktori o'rinbosari M. Muksinova.",
          "Amaliy yechim sifatida SQB tomonidan ishga tushirilgan \"AI Maslahatchisi\" platformasi taqdim etildi. U fuqarolarning biznes g'oyalarini tahlil qilish, ularning rentabelligini baholash va moliyalashtirish imkoniyatlarini shakllantirish orqali tadbirkorlikni qo'llab-quvvatlashga yo'naltirilgan."
        ]
      },
      n3: {
        title: "SQB AI Maslahatchi — g‘oyani bir necha daqiqada real biznesga aylantiradi",
        excerpt:
          "Foydalanuvchi g‘oyani kiritadi — SQB AI Maslahatchi tahlil qiladi, biznes-reja, byudjet va kredit imkoniyatini tayyor qilib beradi.",
        body: [
          "G'oya bor, lekin biznesni qanday va qayerdan boshlashni bilmaysizmi? Endi bu muammo emas.",
          "SQB tomonidan ishlab chiqilgan SQB AI Maslahatchi'si — g'oyani bir necha daqiqada real biznesga aylantiradigan raqamli yechim. Siz faqat g'oyani kiritasiz — qolganini tizim amalga oshiradi: tajribangiz va imkoniyatlaringizni tahlil qiladi, hududingizdagi bozor ehtiyojlarini o'rganadi va eng maqbul biznes yo'nalishini aniqlaydi.",
          "Hozirda sinov tariqasida Buxoro viloyati G'ijduvon hamda Shofirkon tumanlari misolida ishga tushirildi.",
          "5–10 daqiqada: tayyor biznes-reja, zarur moliyaviy resurslar hajmi, loyihaning o'zini oqlash muddati va qadamma-qadam amaliy reja. Eng muhim jihati — platformaning o'zidayoq mos kreditni tanlab, onlayn tarzda moliyalashtirish uchun ariza yuborish imkoniyati ham yaratilmoqda.",
          "Endi uzoq o'ylash shart emas, tavakkal qarorlar yo'q — faqat aniq reja va harakat. SQB — kelajakni birga yaratamiz."
        ]
      },
      n4: {
        title: "Yoshlar, startap va IT: SQB va “Yangi O‘zbekiston” universiteti hamkorligi",
        excerpt:
          "Akseleratsiya dasturi doirasida imzolangan memorandum AI, kiberxavfsizlik, ilm va startap loyihalarini qamrab oladi.",
        body: [
          "\"Yangi O'zbekiston\" universitetida startaplarni qo'llab-quvvatlashga qaratilgan akseleratsiya dasturi doirasida mazkur oliygoh va SQB o'rtasida hamkorlik memorandumi imzolandi.",
          "Memorandum ta'lim va amaliyot uyg'unligini ta'minlash, zamonaviy bilim va ko'nikmalarga ega malakali kadrlar tayyorlash hamda o'zaro uzoq muddatli hamkorlikni rivojlantirishga qaratilgan.",
          "Hamkorlik doirasida axborot texnologiyalari, sun'iy intellekt, kiberxavfsizlik, ilmiy tadqiqotlar va startap loyihalarini rivojlantirish ustuvor yo'nalishlar etib belgilandi.",
          "Mazkur kelishuv talabalar uchun amaliyot o'tash, qo'shma kurs va treninglarda ishtirok etish, real loyihalarda ishlash hamda startap tashabbuslarini rivojlantirish uchun yangi imkoniyatlar yaratadi.",
          "Bank uchun esa malakali kadrlar zaxirasini shakllantirish, yosh IT mutaxassislarni jalb qilish va raqamli rivojlanishni jadallashtirishda muhim omil bo'ladi."
        ]
      },
      n5: {
        title: "Yoshlar salohiyati va innovatsiyalar — ustuvor yo‘nalish",
        excerpt:
          "SQB va Turin politexnika universiteti o‘rtasida IT va sun'iy intellekt yo‘nalishida hamkorlik memorandumi imzolandi.",
        body: [
          "Davlatimiz rahbari o'tgan yilda yoshlar bilan ochiq muloqotida axborot texnologiyalari va sun'iy intellekt yo'nalishlari kelajak taraqqiyotining asosiy omillaridan biri ekanini ta'kidlab, yoshlarni ushbu sohalarda qo'llab-quvvatlash ustuvor vazifa sifatida belgilab berdi.",
          "Shu maqsadda O'zsanoatqurilishbank (SQB) tomonidan oliy ta'lim muassasalari bilan hamkorlik izchil kengaytirilmoqda. Xususan, Bank va Turin politexnika universiteti o'rtasida hamkorlik memorandumi imzolandi.",
          "Hamkorlik doirasida: IT va sun'iy intellekt yo'nalishlarida qo'shma loyihalar amalga oshiriladi; iqtidorli talabalar bankning raqamli tashabbuslariga jalb etiladi; talabalar amaliy faoliyatga tizimli jalb qilinadi; istiqbolli IT mutaxassislar zaxirasi shakllantiriladi.",
          "Mazkur hamkorlik yoshlarning kasbiy rivoji va zamonaviy bilimlarni egallashi uchun yangi imkoniyatlar yaratadi.",
          "SQB akademik hamjamiyat bilan hamkorlikni davom ettirib, yoshlarning innovatsion salohiyatini ro'yobga chiqarishga alohida e'tibor qaratadi. SQB — yoshlar bilan birga kelajakni bunyod etadi!"
        ]
      }
    }
  },
  events: {
    eyebrow: "Tadbirlar",
    h2a: "",
    h2b: "Konferensiyalar",
    h2c: ", meetuplar, ichki kunlar",
    sub: "AI bo‘limi gapiradigan, mezbon bo‘ladigan va o‘rganadigan joylar.",
    items: {
      e1: {
        name: "SQB AI Hackathon",
        place: "Toshkent",
        participants: "AI muhandislari, dasturchilar, talabalar"
      },
      e2: {
        name: "“Sun'iy intellekt va raqamli transformatsiya — O'zbekiston iqtisodiyoti rivojlanishining yangi bosqichi” mavzusidagi xalqaro konferensiya",
        place: "Toshkent",
        participants: "Hukumat, banklar, ekspertlar"
      },
      e3: {
        name: "SQB va “Yangi O'zbekiston” universiteti hamkorligi",
        place: "Yangi O'zbekiston universiteti, Toshkent",
        participants: "Universitet va SQB vakillari"
      },
      e4: {
        name: "SQB va Turin Politexnika universiteti hamkorligi",
        place: "Turin Politexnika universiteti, Toshkent",
        participants: "Universitet va SQB vakillari"
      }
    }
  },
  gallery: {
    eyebrow: "Media galereya",
    h2a: "",
    h2b: "Jamoa hayotidan lavhalar",
    sub: "Ma'ruza, hackathon va kundalik ish lavhalari."
  },
  faq: {
    eyebrow: "Savollar",
    h2a: "Savollaringizga ",
    h2b: "javoblar",
    sub: "AI bo‘limi haqida, biz bilan qanday hamkorlik qilish va modellarimiz qanday ishlashi haqida qisqa javoblar.",
    stillHave: "Yana savol qoldimi? Bog‘laning",
    items: [
      {
        q: "SQB AI bo‘limi nima?",
        a: "Biz bankning ichki AI jamoasi. Kredit riski, firibgarlik, avtomatlashtirish, NLP va kompyuter ko‘rish bo‘yicha mashinaviy o‘qitish tizimlarini quramiz va boshqaramiz — biznes natijasi AI'gacha bo‘lgan bazaga nisbatan o‘lchanadi."
      },
      {
        q: "SQB AI bilan qanday ishlashni boshlash mumkin?",
        a: "Quyidagi forma orqali yoki ai@sqb.uz manziliga qisqa brif yuboring — muammo, maqsadli ko‘rsatkich va bo‘lishishingiz mumkin bo‘lgan ma'lumotlar. Ikki ish kuni ichida javob beramiz va tegishli yetakchiga yo‘naltiramiz."
      },
      {
        q: "SQB AI kriptovalyuta ustida ishlaydimi?",
        a: "Yo‘q. AI bo‘limi bank qarorlariga qaratilgan — kredit, risk, firibgarlik va mijoz tajribasi. Boshqa savollar uchun SQB Innovation ofisiga murojaat qiling."
      },
      {
        q: "AI qarorlarining xavfsizligini qanday ta'minlaysiz?",
        a: "Modellarimiz bankning production tizimlarida to‘liq audit, versiyalash va rollback bilan qaror qabul qilishga yordam beradi. Xavfsizlik va tushunarlilik shartdir."
      },
      {
        q: "Tashqi hamkorlar AI jamoasi bilan ishlashi mumkinmi?",
        a: "Ha — vendorlar, universitetlar va fintech hamkorlar mehmondo‘st. Suhbatni boshlash uchun forma'dan foydalaning."
      },
      {
        q: "AI modellari production'da qanday kuzatiladi?",
        a: "Har bir production modelining monitoring dashboardi bor — input drift, prognoz taqsimoti, kalibratsiya va biznes KPI. Drift'da avtomatik ogohlantiriladi va har model har chorakda risk va audit bilan ko‘rib chiqiladi."
      }
    ]
  },
  contact: {
    eyebrow: "Hamkorlik",
    h2a: "O‘lchanadigan narsa",
    h2b: "yarataylik.",
    sub: "Hamkorlar, vendorlar, nomzodlar va ichki jamoalar — ustida ishlayotgan loyihangizni yozing, ikki ish kuni ichida javob beramiz.",
    fields: {
      name: "F.I.O",
      namePh: "Ismingiz",
      email: "Ish elektron pochta",
      emailPh: "siz@kompaniya.com",
      company: "Kompaniya / Jamoa",
      companyPh: "Ixtiyoriy",
      message: "Qanday yordam beramiz?",
      messagePh: "Qisqacha use case, dataset va maqsadli ko‘rsatkich haqida yozing."
    },
    send: "Yuborish",
    sending: "Yuborilmoqda…",
    sent: "Yuborildi",
    privacy: "Xabarni ulashmaymiz. Faqat ommaviy ma'lumot uchun.",
    address: "O‘zbekiston Respublikasi, Toshkent shahri, 100000, Shahrisabz ko‘chasi, 3-uy",
    errAll: "Iltimos, barcha majburiy maydonlarni to‘ldiring.",
    errEmail: "Iltimos, to‘g‘ri elektron pochta kiriting."
  },
  footer: {
    tagline:
      "Bank ko‘rsatkichlarini haqiqatda siljitadigan AI tizimlarini quramiz va boshqaramiz — kredit riski, firibgarlik, avtomatlashtirish, mijoz tajribasi.",
    explore: "Ko‘rish",
    engage: "Ishtirok",
    contact: "Aloqa",
    rights: "Barcha huquqlar himoyalangan.",
    disclaimer: "Faqat ommaviy ma'lumot. Shaxsiy yoki maxfiy ma'lumotlar ko‘rsatilmaydi."
  }
};

const ru: Dict = {
  nav: {
    about: "О нас",
    projects: "Проекты",
    features: "Возможности",
    team: "Команда",
    impact: "Эффект",
    news: "Новости",
    faq: "Вопросы",
    getStarted: "Начать",
    apply: "Связаться"
  },
  hero: {
    eyebrow: "Добро пожаловать в SQB AI",
    h1a: "Искусственный",
    h1b: "интеллект,",
    h1c: "создающий результат",
    sub: "Мы проектируем, строим и сопровождаем AI-системы в SQB — от кредитного риска и фрода до многоязычного диалогового банкинга — и измеряем их в базисных пунктах, а не в постах.",
    ctaPrimary: "Смотреть проекты",
    ctaSecondary: "Познакомиться с командой",
    trusted: "Доверяют в банке и за его пределами"
  },
  about: {
    eyebrow: "О нас",
    h2a: "Как ИИ создаёт ",
    h2b: "измеримую ценность",
    h2c: " в SQB",
    sub: "Мы встраиваем AI в контур принятия решений банка — не как демо, а как измеряемый компонент риска, клиентского опыта и операций.",
    benefits: [
      {
        title: "Решения в реальном времени",
        body: "Скоринг и принятие решений по заявкам и транзакциям за миллисекунды — без потери точности."
      },
      {
        title: "Интеллектуальное управление рисками",
        body: "Модели ИИ прогнозируют дефолты, выявляют аномалии и снижают кредитные и операционные риски."
      },
      {
        title: "Сквозная автоматизация процессов",
        body: "От обработки заявок до принятия решений — ИИ сокращает ручной труд и ускоряет операции."
      },
      {
        title: "Измеримый бизнес-эффект",
        body: "Рост конверсии, снижение затрат и повышение эффективности — все результаты подтверждаются данными."
      }
    ]
  },
  features: {
    eyebrow: "Возможности",
    h2a: "Как SQB AI ",
    h2b: "трансформирует банковские процессы",
    sub: "Каждое AI-решение в SQB подтверждается метриками производительности — от времени отклика до точности моделей.",
    decisioningEyebrow: "Benchmark",
    decisioningTitle: "AI для узбекского языка",
    decisioningBody:
      "Первый банковский AI-бенчмарк для узбекского языка — оценивает 17 моделей на 1377 вопросах в 6 типах языковых задач.",
    decisioningDetails: [
      "ULAB Benchmark — это первый банковский AI-бенчмарк для узбекского языка, созданный в марте 2026 года. Цель — определить, какая AI-модель лучше всего знает узбекский язык.",
      "В бенчмарке 17 ведущих AI-моделей оцениваются на 1377 вопросах, разделённых на 6 типов языковых задач (понимание, генерация, классификация, перевод, диалог, обработка ошибок) и 3 речевых регистра (официальный, нейтральный, разговорный).",
      "Топ-3: Kimi K2.5 — 70.2%, Mistral Large 2410 — 69.3%, Cogito 67B — 68.1%. Бенчмарк используется для выбора лучших моделей под банковские задачи — контакт-центр, онбординг, документооборот."
    ],
    forecastingEyebrow: "Аналитика и прогнозирование",
    forecastingTitle: "AI в аналитике и прогнозировании",
    forecastingBody:
      "Поддержка стратегических решений на основе данных и интерпретируемых моделей машинного обучения — прогнозирование рисков, поведения клиентов и эффективности портфеля.",
    forecastingDetails: [
      "Прогнозирование рисков, клиентского поведения и эффективности портфеля с использованием интерпретируемых моделей — каждый прогноз приходит с доверительными интервалами и атрибуциями признаков, а не только точечной оценкой.",
      "Калиброванные PD-кривые и сигналы раннего предупреждения по портфелям МСБ и розничного кредита, обновляются еженедельно, проходят ревью риск-команды ежеквартально.",
      "Помимо кредита, тот же тулкит выдаёт сценарии для capital planning, прогнозы оттока депозитов и спроса контакт-центра — везде, где портфельная цифра двигает решение."
    ],
    seeInAction: "Посмотреть кейсы",
    modalClose: "Закрыть",
    statusApprove: "Одобрить",
    statusReview: "Проверка",
    statusDecline: "Отказ"
  },
  projects: {
    eyebrow: "Проекты",
    h2a: "Изучаем последние ",
    h2b: "AI-проекты",
    h2c: " в продакшене",
    sub: "Реальные кейсы, запущенные в SQB. Фильтруйте по направлению или статусу — переключайтесь между карточками и таблицей метрик.",
    direction: "Направление",
    statusLabel: "Статус",
    viewCards: "Карточки",
    viewTable: "Таблица",
    all: "Все",
    production: "Production",
    poc: "PoC",
    contributors: "участн.",
    readCase: "Читать кейс",
    empty: "По выбранным фильтрам проектов нет.",
    table: {
      project: "Проект",
      direction: "Направление",
      status: "Статус",
      impact: "Эффект",
      tech: "Технологии",
      team: "Команда",
      people: "чел."
    },
    modal: {
      problem: "Проблема",
      solution: "AI-решение",
      impact: "Эффект",
      team: "Команда"
    },
    directions: {
      Risk: "Риск",
      "Credit Scoring": "Кредитный скоринг",
      Automation: "Автоматизация",
      "NLP / Chatbots": "NLP / Чат-боты",
      "Computer Vision": "Компьютерное зрение"
    },
    list: {
      "credit-risk-llm": {
        name: "Credit Risk Copilot",
        short:
          "LLM-ассистент аналитика, который готовит риск-меморандум по сырой финансовой отчётности.",
        problem:
          "Ручной разбор корпоративных заёмщиков занимает 6–8 часов на досье и зависит от аналитика.",
        solution:
          "LLM-конвейер, дообученный под домен, читает отчётность, считает коэффициенты, сравнивает с отраслью и готовит черновик меморандума."
      },
      "fraud-graph": {
        name: "Real-time Fraud Graph",
        short:
          "Графовая нейросеть, которая скорит транзакции по графу клиентов с 40M рёбер быстрее 80 мс.",
        problem:
          "Правила пропускали скоординированные мульти-аккаунтные схемы и давали 1:18 ложноположительных.",
        solution:
          "Стриминг-GNN скорит каждую CNP-транзакцию по поведенческим и контрагентским признакам, калиброван по потерям."
      },
      "branch-vision": {
        name: "Branch Vision Analytics",
        short:
          "CV-платформа измеряет очереди и качество обслуживания в 180 отделениях.",
        problem:
          "У отделений не было объективной метрики времени ожидания и загрузки кассиров.",
        solution:
          "YOLO + Re-ID на edge поверх существующих CCTV выдаёт обезличенную аналитику потоков в Power BI."
      },
      "voice-banker": {
        name: "VoiceBanker NLU",
        short:
          "Узбекско-русский голосовой ассистент контакт-центра с передачей оператору.",
        problem:
          "Контакт-центр обрабатывал 70% повторных интентов — баланс, статус карт, переводы — со средним временем 6+ мин.",
        solution:
          "Многоязычный NLU поверх Whisper-ASR, классификация интентов и tool-use к core-banking; сложные кейсы уходят оператору с полным контекстом."
      },
      "doc-ocr": {
        name: "Document Intelligence",
        short:
          "Мультимодальный OCR + классификатор для розничных кредитных заявок.",
        problem:
          "Онбординг требовал ручного ввода с 12 типов документов и блокировал одобрение в день обращения.",
        solution:
          "Layout-aware OCR и дообученный классификатор автоматически достают паспорт, доход, регистрацию и залог; неуверенные извлечения уходят на ручную проверку."
      },
      "next-best-action": {
        name: "Next-Best-Action Engine",
        short:
          "Движок персонализации, рекомендующий следующий продукт или сервис каждому клиенту.",
        problem:
          "Cross-sell кампании опирались на средние по сегменту и конвертили <2%.",
        solution:
          "Бандитный рекомендер по событийным признакам выбирает next-best-action на клиента и канал, со встроенными ограничениями частоты и справедливости."
      },
      "risk-mgmt-ml": {
        name: "Risk Management ML",
        short:
          "ML-скоринг и автоматизация расчёта risk-appetite по кредитному портфелю.",
        problem:
          "Дефолтность клиента не моделируется ML; скоринг строится только на данных КАТМ, DSI и Uzinfocom; отчёт по risk-appetite готовится 2 рабочих дня вручную.",
        solution:
          "Логистическая регрессия, XGBoost и нейросети прогнозируют вероятность дефолта; интеграция с операторами связи и базами YHXX обогащает скоринг-модель; risk-appetite считается и мониторится автоматически в реальном времени."
      },
      "admin-fleet": {
        name: "Автопарк и энергетика AI",
        short:
          "GPS-телематика, ML-оценка стиля вождения и предиктивное обслуживание автопарка, солнечных панелей и трансформаторов.",
        problem:
          "Месячный отчёт по автопарку готовится 3 рабочих дня; 120+ автомобилей, по 20+ чеков на каждый; стиль вождения не анализируется; данные по 5 поставщикам, 10+ кабинетам и 40+ генераторам разрознены.",
        solution:
          "GPS-модули и телематика оцифровывают путевые листы; ML-модель оценивает стиль вождения; единый BI-дашборд агрегирует поставщиков по API; предиктивные модели заранее выявляют деградацию панелей и проблемы с трансформаторами."
      }
    }
  },
  team: {
    eyebrow: "Команда",
    h2a: "Люди ",
    h2b: "за моделями",
    sub: "Кросс-функциональная AI-команда — инженеры, учёные и продакт — работающая бок о бок с риском, ритейлом и операциями.",
    projects: "Проекты",
    members: {
      kozlov: {
        name: "Сергей Козлов",
        role: "Генеральный директор по искусственному интеллекту и советник Председателя",
        bio: "Определяет AI-стратегию SQB и консультирует Председателя Правления по инициативам в области искусственного интеллекта."
      },
      muhammadjon: {
        name: "Мухаммаджон Нуритдинов",
        role: "Руководитель AI",
        bio: "Руководит AI-инициативами в SQB; 5+ лет в финсекторе. Проекты: Ijro AI, Financial Assistant AI, LogiCoreAI, SQB Voice."
      },
      umidjon: {
        name: "Умиджон Абдухамидов",
        role: "AI / Бизнес- и системный аналитик",
        bio: "Формирует бизнес- и функциональные требования, готовит данные и сопровождает внедрение AI-решений на всех этапах."
      },
      timurjon: {
        name: "Тимуржон Кумков",
        role: "Менеджер проектов",
        bio: "PM полного цикла в IT и AI-проектах банковского сектора; ранее Scrum Master в SQB Mobile и CROBS."
      },
      javokhir: {
        name: "Жавохир Алиакбаров",
        role: "Scrum Master",
        bio: "Управляет задачами AI-команды в Jira; поддерживает разработку промптов для SQB чат-бота, HR, аудита и CROBS."
      },
      murodjon: {
        name: "Муроджон Мирзаев",
        role: "Старший дата-инженер",
        bio: "Банковские DWH и DataOps с 2020 года; внедрял корпоративные хранилища данных в нескольких банках."
      },
      abdullo: {
        name: "Абдулло Наврузов",
        role: "Backend-разработчик",
        bio: "Backend и AI-интеграция в SQB: SQB Chat Assistant, Obnal AI, Ijro AI; развернул Qwen3-32B и GPT-OSS-20B на GPU."
      },
      azizbek: {
        name: "Азизбек Кодиров",
        role: "Junior Java Backend-разработчик",
        bio: "Интегрирует AI-сервисы с Java-приложениями и Telegram-ботами; HR-бот, чат-бот и CROBS AI-ассистент."
      },
      daler: {
        name: "Далер Эргашев",
        role: "Junior Angular-разработчик",
        bio: "Разрабатывает Angular SPA и интегрирует с backend API; работает над AI-Admin, SQB-Ijro и Monitoring."
      },
      odiljon: {
        name: "Одилжон Анваров",
        role: "HR-проектный менеджер",
        bio: "Отвечает за наём IT и AI-специалистов в SQB; ведёт программу SQB Start и со-разработал AI HR Telegram-бота."
      },
      dilshodbek: {
        name: "Дилшодбек Норматов",
        role: "UX/UI-дизайнер",
        bio: "Создаёт интерфейсы и прототипы для SQB Monitoring, SQB AI Chat, МФИ и CROBS AI Chat; применяет AI-инструменты в дизайне."
      }
    }
  },
  impact: {
    eyebrow: "Эффект AI",
    h2a: "Цифры, которые ",
    h2b: "двигают результат",
    sub: "Совокупный эффект AI-департамента по риску, фроду, автоматизации и клиентскому опыту — относительно базы до AI и с ежеквартальным аудитом.",
    updated: "Обновлено в апреле 2026 · по проектам Risk Mgmt и Admin/Fleet AI",
    items: [
      { label: "Выявление рискованных клиентов" },
      { label: "Ускорение кредитных решений" },
      { label: "Экономия трудозатрат" },
      { label: "Снижение ручных ошибок" }
    ]
  },
  news: {
    eyebrow: "Новости",
    h2a: "Что ",
    h2b: "нового",
    sub: "Анонсы, разборы и обновления от AI-департамента.",
    read: "Читать статью",
    back: "Назад",
    categories: {
      Update: "Обновление",
      Insight: "Разбор",
      Announcement: "Анонс"
    },
    items: {
      n1: {
        title:
          "SQB AI Hackathon: в центре цифрового будущего и инновационных решений!",
        excerpt:
          "SQB совместно с Университетом «Новый Узбекистан» провёл AI Hackathon, объединивший молодых разработчиков для поиска решений банковских задач.",
        body: [
          "В рамках реализации приоритетных задач, определённых руководством страны по развитию цифровой экономики и широкому внедрению технологий искусственного интеллекта (ИИ), SQB совместно с Университетом «Новый Узбекистан» организовал «AI Hackathon».",
          "Данная инициатива направлена на привлечение молодых разработчиков и стартап-команд к поиску инновационных решений для реальных задач в банковско-финансовой сфере, а также способствует созданию новых рабочих мест и формированию современных профессиональных навыков. Сегодня банк уделяет особое внимание использованию возможностей ИИ для упрощения сервисов и глубокого анализа потребностей клиентов, что позволяет предлагать персонализированные решения.",
          "По итогам Hackathon: 1-е место — платформа для принятия решений на основе региональной аналитики для предпринимателей; 2-е место — проект по оптимизации управления сетью банкоматов, оборотом наличных средств и логистикой инкассации; 3-е место — решение по рекомендации новых бизнес-направлений на основе анализа конкуренции и спроса в регионах.",
          "Подобные инициативы являются важным шагом на пути превращения SQB не только в финансовый институт, но и в центр передовых технологий и инноваций страны."
        ]
      },
      n2: {
        title: "Искусственный интеллект становится драйвером экономики Узбекистана",
        excerpt:
          "SQB провёл международную конференцию по AI и цифровой трансформации, собрав на одной площадке правительство, банки и IT-индустрию.",
        body: [
          "В Ташкенте Узпромстройбанк (SQB) провёл международную конференцию «Искусственный интеллект и цифровая трансформация: новый этап развития экономики Узбекистана».",
          "Президент Шавкат Мирзиёев определил приоритетные задачи по развитию технологий искусственного интеллекта и их широкому внедрению в экономику и социальную сферу. Последовательные реформы в этом направлении сегодня играют важную роль в формировании цифровой экономики и обеспечении инновационного развития.",
          "Мероприятие было направлено на широкое внедрение AI-технологий в реальный сектор экономики, ускорение процессов цифровой трансформации и выведение сотрудничества между государством, бизнесом и наукой на новый уровень. На одной площадке собрались главные драйверы AI-направления — представители науки, государства и IT-индустрии.",
          "Среди участников: президент Академии наук Узбекистана, академик Ш. Аюпов; первый заместитель министра цифровых технологий О. Пекос; директор Центра развития цифрового образования и AI А. Абдуллаев; заместитель генерального директора «IT Park Uzbekistan» М. Муксинова.",
          "В качестве практического решения была представлена платформа SQB «AI Консультант» — она направлена на поддержку предпринимательства за счёт анализа бизнес-идей граждан, оценки рентабельности и формирования возможностей финансирования."
        ]
      },
      n3: {
        title: "SQB AI Консультант — превращает идею в реальный бизнес за минуты",
        excerpt:
          "Цифровое решение от SQB: вы вводите идею — система выдаёт готовый бизнес-план, бюджет и онлайн-заявку на кредит.",
        body: [
          "Есть идея, но не знаете, как и с чего начать бизнес? Теперь это не проблема.",
          "SQB AI Консультант — цифровое решение, разработанное SQB, которое помогает превратить идею в реальный бизнес всего за несколько минут. Вам нужно лишь ввести свою идею — остальное система сделает сама: проанализирует ваш опыт и возможности, изучит потребности рынка в вашем регионе и определит наиболее подходящее направление бизнеса.",
          "В настоящее время проект запущен в тестовом режиме в Гиждуванском и Шафирканском районах Бухарской области.",
          "Уже через 5–10 минут вы получите: готовый бизнес-план, необходимый объём финансовых ресурсов, срок окупаемости проекта и пошаговый план действий. Самое важное — прямо в платформе также создаётся возможность выбрать подходящий кредит и подать онлайн-заявку на финансирование.",
          "Больше не нужно долго раздумывать, никаких рискованных решений — только чёткий план и действия. SQB — создаём будущее вместе."
        ]
      },
      n4: {
        title: "Молодёжь, стартапы и IT: SQB и Университет «Новый Узбекистан» начинают сотрудничество",
        excerpt:
          "Меморандум, подписанный в рамках акселерационной программы, охватывает AI, кибербезопасность, исследования и совместные стартап-проекты.",
        body: [
          "В Университете «Новый Узбекистан» в рамках акселерационной программы по поддержке стартапов подписан меморандум о сотрудничестве с SQB.",
          "Документ направлен на интеграцию образования и практики, подготовку специалистов с актуальными компетенциями, а также развитие долгосрочного партнёрства между университетом и банком.",
          "Среди приоритетных направлений сотрудничества — информационные технологии, искусственный интеллект, кибербезопасность, научные исследования и развитие стартап-проектов.",
          "Соглашение открывает для студентов новые возможности: прохождение практики, участие в совместных образовательных программах и тренингах, работа над реальными кейсами и развитие собственных стартапов.",
          "Для банка партнёрство станет инструментом формирования кадрового резерва, привлечения молодых IT-специалистов и ускорения цифровой трансформации."
        ]
      },
      n5: {
        title: "Потенциал молодёжи и инновации — приоритетное направление",
        excerpt:
          "SQB и Туринский политехнический университет подписали меморандум о сотрудничестве в области IT и искусственного интеллекта.",
        body: [
          "Как отметил глава государства в ходе открытого диалога с молодёжью в прошлом году, направления информационных технологий и искусственного интеллекта являются одними из ключевых факторов будущего развития, а поддержка молодёжи в этих сферах определена в качестве приоритетной задачи.",
          "В этих целях «Узпромстройбанк» (SQB) последовательно расширяет сотрудничество с высшими образовательными учреждениями. В частности, между Банком и Туринским политехническим университетом подписан меморандум о сотрудничестве.",
          "В рамках партнёрства: будут реализованы совместные проекты в сферах IT и искусственного интеллекта; талантливая молодёжь будет привлечена к цифровым инициативам банка; студенты будут системно вовлекаться в практическую деятельность; будет формироваться кадровый резерв перспективных IT-специалистов.",
          "Данное сотрудничество создаёт новые возможности для профессионального развития молодёжи и освоения ею современных знаний и практических навыков.",
          "SQB продолжает сотрудничество с академическим сообществом, уделяя особое внимание раскрытию инновационного потенциала молодёжи. SQB — вместе с молодёжью строит будущее!"
        ]
      }
    }
  },
  events: {
    eyebrow: "События",
    h2a: "",
    h2b: "Конференции",
    h2c: ", митапы, внутренние дни",
    sub: "Где AI-департамент выступает, принимает и учится.",
    items: {
      e1: {
        name: "SQB AI Hackathon",
        place: "Ташкент",
        participants: "AI-инженеры, разработчики, студенты"
      },
      e2: {
        name: "Международная конференция «Искусственный интеллект и цифровая трансформация — новый этап развития экономики Узбекистана»",
        place: "Ташкент",
        participants: "Правительство, банки, эксперты"
      },
      e3: {
        name: "Сотрудничество SQB и университета «Янги Узбекистан»",
        place: "Университет «Янги Узбекистан», Ташкент",
        participants: "Представители университета и SQB"
      },
      e4: {
        name: "Сотрудничество SQB и Туринского политехнического университета",
        place: "Туринский политехнический университет, Ташкент",
        participants: "Представители университета и SQB"
      }
    }
  },
  gallery: {
    eyebrow: "Медиагалерея",
    h2a: "",
    h2b: "Моменты команды",
    sub: "Фрагменты с выступлений, хакатонов и обычных рабочих дней."
  },
  faq: {
    eyebrow: "Вопросы",
    h2a: "Ответы на ваши ",
    h2b: "вопросы",
    sub: "Коротко об AI-департаменте, как с нами работать и как наши модели живут в продакшене.",
    stillHave: "Остались вопросы? Свяжитесь с нами",
    items: [
      {
        q: "Что такое AI-департамент SQB?",
        a: "Это внутренняя AI-команда банка. Мы проектируем, строим и сопровождаем ML-системы по риску, фроду, автоматизации, NLP и CV — и измеряем эффект относительно базы до AI."
      },
      {
        q: "Как начать работу с SQB AI?",
        a: "Используйте форму ниже или напишите на ai@sqb.uz короткий бриф — задача, целевая метрика и доступные данные. Ответим в течение двух рабочих дней и направим к нужному лиду."
      },
      {
        q: "Работает ли SQB AI с криптовалютами?",
        a: "Нет. AI-департамент сфокусирован на банковских решениях — кредит, риск, фрод и клиентский опыт. По остальным запросам обращайтесь в Innovation Office SQB."
      },
      {
        q: "Как обеспечивается безопасность AI-решений?",
        a: "Наши модели поддерживают принятие решений в production-системах банка с полным аудит-следом, версионированием и откатами. Безопасность и интерпретируемость — обязательны."
      },
      {
        q: "Могут ли внешние партнёры сотрудничать с командой?",
        a: "Да — вендоры, университеты и финтех-партнёры приветствуются. Начните разговор через форму."
      },
      {
        q: "Как мониторятся AI-модели в продакшене?",
        a: "У каждой production-модели есть дашборд: дрейф входов, распределение прогнозов, калибровка и бизнес-KPI. Авто-алерты на дрейф и ежеквартальный обзор с риском и аудитом."
      }
    ]
  },
  contact: {
    eyebrow: "Сотрудничество",
    h2a: "Давайте сделаем что-то",
    h2b: "измеримое.",
    sub: "Партнёры, вендоры, кандидаты и внутренние команды — расскажите о задаче, и мы вернёмся в течение двух рабочих дней.",
    fields: {
      name: "Полное имя",
      namePh: "Ваше имя",
      email: "Рабочая почта",
      emailPh: "you@company.com",
      company: "Компания / Команда",
      companyPh: "Опционально",
      message: "Чем мы можем помочь?",
      messagePh: "Кратко опишите кейс, данные и целевую метрику."
    },
    send: "Отправить",
    sending: "Отправляем…",
    sent: "Отправлено",
    privacy: "Сообщение не передаётся третьим лицам. Только публичные данные.",
    address: "Республика Узбекистан, г. Ташкент, 100000, ул. Шахрисабз, д. 3",
    errAll: "Пожалуйста, заполните все обязательные поля.",
    errEmail: "Пожалуйста, укажите корректный email."
  },
  footer: {
    tagline:
      "Проектируем и сопровождаем AI-системы, которые двигают реальные банковские метрики — риск, фрод, автоматизацию, клиентский опыт.",
    explore: "Разделы",
    engage: "Взаимодействие",
    contact: "Контакты",
    rights: "Все права защищены.",
    disclaimer: "Только публичная информация. Личные и чувствительные данные не отображаются."
  }
};

export const dictionaries: Record<Locale, Dict> = { uz, ru, en };
export type { Dict };

// ----- Stable date formatting -----
// `toLocaleDateString` returns slightly different output on Node.js vs browsers
// (different ICU databases) which causes React hydration mismatches under SSR.
// We format dates with our own tables so the SSR HTML matches the client render.

const MONTH_SHORT: Record<Locale, string[]> = {
  uz: ["yan", "fev", "mar", "apr", "may", "iyun", "iyul", "avg", "sen", "okt", "noy", "dek"],
  ru: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};

const MONTH_FULL: Record<Locale, string[]> = {
  uz: [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"
  ],
  ru: [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
};

export function formatDate(
  iso: string,
  locale: Locale,
  kind: "short" | "full" = "full"
): string {
  const d = new Date(iso);
  // Use UTC accessors so date does not shift across timezones / SSR
  const day = d.getUTCDate();
  const month = (kind === "short" ? MONTH_SHORT : MONTH_FULL)[locale][d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export function formatDay(iso: string): string {
  const d = new Date(iso);
  return String(d.getUTCDate()).padStart(2, "0");
}

export function formatMonth(iso: string, locale: Locale): string {
  const d = new Date(iso);
  return MONTH_SHORT[locale][d.getUTCMonth()].toUpperCase();
}
