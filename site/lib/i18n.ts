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
    careers: string;
    school: string;
    faq: string;
    getStarted: string;
    apply: string;
    toggleMenu: string;
    closeModal: string;
    galleryImageAlt: string;
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
    release: string;
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
      {
        name: string;
        short: string;
        problem: string;
        solution: string;
        impact: { label: string; value: string }[];
      }
    >;
  };
  team: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    headlineValue: string;
    headlineLabel: string;
    body: string;
    detailsCta: string;
    experienceLabel: string;
    aboutTitle: string;
    achievementsTitle: string;
    projectsTitle: string;
    skillsTitle: string;
    back: string;
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
  careers: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    h2c: string;
    sub: string;
    invite: string;
    cta: string;
    back: string;
    rolesA: string;
    rolesHi: string;
    rolesB: string;
    rolesSub: string;
    formTitle: string;
    formSub: string;
    detailDesc: string;
    detailResp: string;
    detailReq: string;
    detailOffer: string;
    apply: string;
    requirementsTitle: string;
    empty: string;
    wantTitle: string;
    want: { title: string; body: string }[];
    types: {
      "full-time": string;
      "part-time": string;
      internship: string;
      contract: string;
    };
    cv: {
      label: string;
      hint: string;
      choose: string;
      invalidType: string;
      tooLarge: string;
    };
  };
  school: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    h2c: string;
    sub: string;
    cta: string;
    back: string;
    heroTitle: string;
    heroSub: string;
    aboutTitle: string;
    about: { title: string; body: string }[];
    scheduleTitle: string;
    scheduleNote: string;
    formTitle: string;
    formSub: string;
    fields: {
      name: string;
      namePh: string;
      email: string;
      emailPh: string;
      phone: string;
      phonePh: string;
      school: string;
      schoolPh: string;
      grade: string;
      gradePh: string;
      gradeSuffix: string;
      topic: string;
      topicPh: string;
    };
    submit: string;
    sending: string;
    sent: string;
    openBot: string;
    openBotHint: string;
    tgNote: string;
    seatsLeft: string;
    seatsFull: string;
    seatsOf: string;
    errAll: string;
    errEmail: string;
    errFull: string;
    errRate: string;
    errServer: string;
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
    partnerTab: string;
    internTab: string;
    internSub: string;
    fields: {
      name: string;
      namePh: string;
      email: string;
      emailPh: string;
      company: string;
      companyPh: string;
      phone: string;
      phonePh: string;
      message: string;
      messagePh: string;
      university: string;
      universityPh: string;
      direction: string;
      directionPh: string;
      internMessage: string;
      internMessagePh: string;
    };
    send: string;
    sending: string;
    sent: string;
    openBot: string;
    openBotHint: string;
    privacy: string;
    address: string;
    errAll: string;
    errEmail: string;
    errRate: string;
    errServer: string;
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
    careers: "Careers",
    school: "School",
    faq: "FAQ",
    getStarted: "Get Started",
    apply: "Contact us",
    toggleMenu: "Toggle menu",
    closeModal: "Close",
    galleryImageAlt: "Gallery"
  },
  hero: {
    eyebrow: "Welcome to SQB AI",
    h1a: "Artificial",
    h1b: "Intelligence,",
    h1c: "creating results",
    sub: "We design, build and operate AI systems at SQB - from credit risk and fraud to multilingual conversational banking - and measure them in basis points, not blog posts.",
    ctaPrimary: "Explore Projects",
    ctaSecondary: "Meet the Team",
    trusted: "Trusted across the bank and beyond"
  },
  about: {
    eyebrow: "About",
    h2a: "How AI creates ",
    h2b: "measurable value",
    h2c: " at SQB",
    sub: "We embed AI into the bank's decision loop - not as a demo, but as a measured component of risk, customer experience and operations.",
    benefits: [
      {
        title: "Real-time decisions",
        body: "Scoring and decision-making on applications and transactions in milliseconds - without losing accuracy."
      },
      {
        title: "Intelligent risk management",
        body: "AI models predict defaults, detect anomalies and reduce credit and operational risks."
      },
      {
        title: "End-to-end process automation",
        body: "From application intake to final decision - AI reduces manual work and accelerates operations."
      },
      {
        title: "Measurable business impact",
        body: "Conversion uplift, cost reduction and efficiency gains - every result is backed by data."
      }
    ]
  },
  features: {
    eyebrow: "Features",
    h2a: "How SQB AI ",
    h2b: "transforms banking processes",
    sub: "Every AI solution at SQB is backed by performance metrics - from response time to model accuracy.",
    decisioningEyebrow: "Benchmark",
    decisioningTitle: "AI for the Uzbek language",
    decisioningBody:
      "The first banking AI benchmark for Uzbek - evaluates 17 models on 1377 questions across 6 task types and 3 speech registers.",
    decisioningDetails: [
      "ULAB Benchmark is the first banking AI benchmark for the Uzbek language, created in March 2026. The goal is to identify which AI model best understands Uzbek.",
      "The benchmark evaluates 17 leading AI models on 1377 questions, split across 6 task types (comprehension, generation, classification, translation, dialogue, error-handling) and 3 speech registers (formal, neutral, conversational).",
      "Top-3 results: Kimi K2.5 - 70.2%, Mistral Large 2410 - 69.3%, Cogito 67B - 68.1%. The benchmark is used to select the best models for banking tasks across the contact centre, onboarding and document workflows."
    ],
    forecastingEyebrow: "Analytics & Forecasting",
    forecastingTitle: "AI in analytics and forecasting",
    forecastingBody:
      "Strategic decision support based on data and interpretable machine-learning models - forecasting risks, customer behaviour and portfolio performance.",
    forecastingDetails: [
      "Forecasting risks, customer behaviour and portfolio performance using interpretable models - every forecast comes with confidence intervals and feature attributions, not just a point estimate.",
      "Calibrated PD curves and early-warning signals across the SME and retail credit book, refreshed weekly and reviewed by risk every quarter.",
      "Beyond credit, the same toolkit produces capital-planning scenarios, deposit-attrition forecasts and contact-centre demand projections - anywhere a portfolio-level number drives a decision."
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
    sub: "Real cases shipped at SQB. Filter by direction or status - switch between visual cards and a metrics table.",
    direction: "Direction",
    statusLabel: "Status",
    viewCards: "Cards",
    viewTable: "Table",
    all: "All",
    production: "Production",
    poc: "PoC",
    release: "Release",
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
      "sqb-mahalla": {
        name: "SQB Mahalla",
        short:
          "AI business advisor and regional analytics platform covering all regions and districts of Uzbekistan.",
        problem:
          "Entrepreneurs across the country lack access to localized market insights and ready-to-use business plans; manual regional research is slow, fragmented and out of reach for most mahallas.",
        solution:
          "An AI platform that analyses a business idea against regional market needs across all viloyats and tumans, generates a ready business plan in minutes and connects entrepreneurs with SQB financing options.",
        impact: [
          { label: "Geography covered", value: "All regions" },
          { label: "Districts in dataset", value: "200+" },
          { label: "Business plan generation", value: "Minutes" }
        ]
      },
      "ai-advisor": {
        name: "SQB AI Advisor",
        short:
          "Conversational AI assistant that turns a business idea into a ready business plan with matching SQB financing in minutes.",
        problem:
          "First-time entrepreneurs and SMEs struggle to translate raw ideas into structured, finance-ready business plans; consultants are expensive and slow, and most applicants approach the bank without a viable plan.",
        solution:
          "A multilingual AI advisor that interviews the user about their idea, pulls regional market signals, generates a structured plan with revenue and cost projections and routes the user to the right SQB financing product end-to-end.",
        impact: [
          { label: "Plan generation", value: "Minutes" },
          { label: "Languages", value: "UZ / RU / EN" },
          { label: "Financing routes", value: "Multiple" }
        ]
      },
      "ai-ijro": {
        name: "SQB AI Ijro",
        short:
          "AI-powered intake and routing for incoming bank correspondence - OCR, LLM and embedding-based dispatch to responsible departments.",
        problem:
          "500+ incoming letters per day are registered by hand; each item has to be read and routed manually to the right owner, consuming significant Ijro management department time.",
        solution:
          "OCR extracts text from incoming letters, an LLM analyses content and auto-registers each item, and an embedding model routes the letter to the responsible department end-to-end.",
        impact: [
          { label: "Daily documents", value: "500+" },
          { label: "Manual handling", value: "-80-90%" },
          { label: "Auto-routing", value: "Real-time" }
        ]
      },
      "ai-lex": {
        name: "AI Lex.uz",
        short:
          "AI/ML legal-document verification integrated with lex.uz and the bank's internal repository - detects outdated norms, spelling and technical errors automatically.",
        problem:
          "Internal documents are not in a single repository, so legal staff burn most of their time searching and cross-checking; there is no automated spelling/technical-error check; and without integration with the national legislation base, internal docs may reference norms that have lost effect.",
        solution:
          "An automated analysis system integrated with lex.uz and the bank's database to track legislative changes in real time; a unified centralized server / cloud repository for all internal documents; AI/ML-based content verification and OCR + NLP analysers for in-text error detection.",
        impact: [
          { label: "Document review time", value: "-50-70%" },
          { label: "Error detection", value: "+90%" },
          { label: "Compliance-risk drop", value: "-70-80%" }
        ]
      },
      "ai-callcenter": {
        name: "Call Center AI",
        short:
          "AI co-pilot for the call center: handles routine and templated client questions and seamlessly hands off complex or personal-data cases to a live operator.",
        problem:
          "The call center receives a high volume of templated and recurring questions, yet every single one ties up a human operator - increasing wait time and cost per contact.",
        solution:
          "An OpenAI-powered assistant trained on the bank's structure, systems and most frequent questions resolves simple FAQs end-to-end and routes unfamiliar topics or anything involving personal data to a live operator.",
        impact: [
          { label: "Operator workload", value: "Lower" },
          { label: "Routine queries", value: "Auto-resolved" },
          { label: "Personal data", value: "Operator" }
        ]
      },
      "sqb-fleet-ai": {
        name: "SQB Fleet AI",
        short:
          "AI fleet-management platform with real-time monitoring, ML-based driver scoring and predictive maintenance for 129 vehicles and generators across 13 regions.",
        problem:
          "129 vehicles and generators were monitored manually via scattered GPS reports - no unified analytics for driver behaviour, fuel costs, regional load or maintenance schedules; driver evaluation was subjective and lacked quantitative metrics.",
        solution:
          "An XGBoost model scores driver behaviour from GPS events (speeding, hard braking, idle time) and seven analytical engines run in parallel: driver scoring, non-target-use detection, regional load distribution, fuel and cost analytics, predictive maintenance, generator monitoring and route analysis. Data flows in real time via GPS-tracker REST APIs into PostgreSQL with a 2-minute refresh.",
        impact: [
          { label: "Vehicles & generators", value: "129" },
          { label: "Regions covered", value: "13" },
          { label: "Driver scoring automation", value: "100%" }
        ]
      },
      "sqb-solar-forecaster": {
        name: "SQB Solar Forecaster",
        short:
          "AI assistant for solar-station operators that forecasts hourly energy generation 14 days ahead and flags underperforming stations in real time.",
        problem:
          "Solar-station operators have no reliable forecast of upcoming energy generation - by-eye estimates from generic weather forecasts miss by 25-30%, making electricity-sale planning hard and delaying detection of equipment faults.",
        solution:
          "An ML model trained on each station's historical telemetry and weather forecasts automatically computes hourly generation for every station for the next 14 days; the dashboard instantly highlights stations underperforming the model's prediction.",
        impact: [
          { label: "Forecast accuracy", value: "90%+" },
          { label: "Forecast horizon", value: "14 days" },
          { label: "Manual operator work", value: "0" }
        ]
      }
    }
  },
  team: {
    eyebrow: "Team",
    h2a: "People ",
    h2b: "behind the models",
    sub: "A cross-functional AI team - engineers, scientists, designers and product - working hand-in-hand with Risk, Legal, Operations and Retail.",
    headlineValue: "20+",
    headlineLabel: "employees",
    detailsCta: "Details",
    experienceLabel: "years of experience",
    aboutTitle: "About",
    achievementsTitle: "Achievements",
    projectsTitle: "Projects",
    skillsTitle: "Skills",
    back: "Back to team",
    body: "From foundation models and MLOps to dashboards and chat-bots, the team has shipped a portfolio of AI products covering legal review, document automation, regional analytics, contact-centre support, fleet management and solar-energy operations. Data engineers, backend and frontend developers, ML specialists, designers, project and HR managers operate as a single cross-functional unit, collaborating end-to-end with the bank's risk, legal, operations and retail departments to take each idea from concept to production."
  },
  impact: {
    eyebrow: "AI Impact",
    h2a: "Numbers that ",
    h2b: "move the needle",
    sub: "Aggregate impact of the AI Department across legal review, document automation, compliance and back-office - measured against pre-AI baselines and audited quarterly.",
    updated: "Updated April 2026 · based on AI Lex.uz, AI Ijro, Call Center AI, SQB Fleet AI and SQB Solar Forecaster",
    items: [
      { label: "Document review time saved" },
      { label: "Manual handling (reduction)" },
      { label: "Compliance risk (reduction)" },
      { label: "Labour savings" }
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
          "Hackathon results: 1st place - a regional-analytics-based decision-making platform for entrepreneurs; 2nd place - an ATM network optimisation project covering cash flow and cash-in-transit logistics; 3rd place - a solution recommending new business directions based on regional competition and demand analysis.",
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
          "As a practical outcome, SQB presented its \"AI Advisor\" platform - designed to support entrepreneurship by analysing citizens' business ideas, assessing profitability and shaping financing options."
        ]
      },
      n3: {
        title: "SQB AI Advisor - turn an idea into a real business in minutes",
        excerpt:
          "A digital assistant from SQB that analyses your idea, regional market needs and produces a ready business plan with financing options.",
        body: [
          "Got an idea but don't know how or where to start your business? It's no longer a problem.",
          "SQB AI Advisor - a digital solution from SQB that turns an idea into a real business in just a few minutes. You only enter the idea - the system does the rest: analyses your experience and capabilities, studies market needs in your region, and identifies the most suitable business direction.",
          "The pilot is currently live in the Gijduvan and Shofirkon districts of Bukhara region.",
          "In just 5-10 minutes you get: a ready business plan, the required volume of financial resources, the project payback period and a step-by-step action plan. The platform also lets you pick a matching loan and submit an online financing application - no long deliberations, no risky decisions, just a clear plan and action.",
          "SQB - building the future together."
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
          "The agreement opens new opportunities for students - internships, joint courses and trainings, work on real-world cases, and the development of their own startup initiatives.",
          "For the bank, the partnership becomes a tool for building a talent pipeline, attracting young IT specialists and accelerating digital transformation."
        ]
      },
      n5: {
        title: "Youth potential and innovation - a priority direction",
        excerpt:
          "SQB signs a memorandum of cooperation with Turin Polytechnic University to deliver joint AI and IT projects.",
        body: [
          "In an open dialogue with young people last year, the country's leadership emphasised that information technology and artificial intelligence are among the key drivers of future development, and that supporting youth in these fields is a priority.",
          "To that end, Uzsanoatqurilishbank (SQB) is consistently expanding cooperation with higher-education institutions. In particular, a memorandum of cooperation has been signed between the bank and Turin Polytechnic University.",
          "Within the partnership: joint projects in IT and artificial intelligence will be carried out; talented students will be involved in the bank's digital initiatives; students will be systematically engaged in practical work; and a talent pipeline of promising IT specialists will be formed.",
          "The cooperation creates new opportunities for young people's professional growth and for acquiring modern knowledge and practical skills.",
          "SQB - building the future together with the youth!"
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
        name: "International Conference: AI and Digital Transformation - A New Stage of Uzbekistan's Economy",
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
  careers: {
    eyebrow: "Careers",
    h2a: "Build the future of ",
    h2b: "AI banking",
    h2c: " with us",
    sub: "Join the SQB AI Department - ship models that move real banking metrics, work across Risk, Legal, Operations and Retail, and grow alongside a senior cross-functional team.",
    invite: "We hire for curiosity and craft, not just CVs. If you love shipping models that touch millions of customers, turning messy data into decisions, and learning fast with a senior team - you'll fit right in.",
    cta: "I want to join you",
    back: "Back to careers",
    rolesA: "We have ",
    rolesHi: "plenty of roles",
    rolesB: "",
    rolesSub: "Pick what interests you most.",
    formTitle: "Apply for an internship",
    formSub: "Students and recent grads - tell us your direction and share your skills or portfolio. We respond within two business days.",
    detailDesc: "Description",
    detailResp: "Responsibilities",
    detailReq: "Requirements",
    detailOffer: "What we offer",
    apply: "Apply now",
    requirementsTitle: "What we're looking for",
    empty: "No open roles right now - but we're always glad to meet strong people. Write to us through the form below.",
    wantTitle: "What we want from you",
    want: [
      {
        title: "Curiosity",
        body: "You learn fast, dig into hard problems and question the obvious instead of settling for it."
      },
      {
        title: "Ownership",
        body: "You take ideas from concept to production and own the outcome - not just the assigned task."
      },
      {
        title: "Impact",
        body: "You care about real metrics and measure your work in results, not activity."
      }
    ],
    types: {
      "full-time": "Full-time",
      "part-time": "Part-time",
      internship: "Internship",
      contract: "Contract"
    },
    cv: {
      label: "Resume (CV)",
      hint: "PDF or Word · up to 15 MB",
      choose: "Choose a file",
      invalidType: "Only PDF or Word (.pdf, .doc, .docx) is allowed",
      tooLarge: "File is larger than 15 MB"
    }
  },
  school: {
    eyebrow: "School",
    h2a: "AI starts at ",
    h2b: "school",
    h2c: "",
    sub: "A free AI course for pupils in grades 9-11. Friday lessons at the bank - from what a neural network is to your own working project.",
    cta: "I want to join",
    back: "Back to the School",
    heroTitle: "SQB AI School",
    heroSub: "You do not need to be a programmer. You need curiosity. Our engineers teach how artificial intelligence really works - using the systems that run inside a real bank.",
    aboutTitle: "What the programme gives you",
    about: [
      {
        title: "Practice, not theory",
        body: "Every lesson ends with something you built yourself - not with notes to memorise."
      },
      {
        title: "Real engineers",
        body: "The classes are taught by the SQB AI team - the people who build the bank's models."
      },
      {
        title: "Free of charge",
        body: "The programme costs nothing. All you bring is curiosity and a wish to learn."
      }
    ],
    scheduleTitle: "How it works",
    scheduleNote: "every Friday · starting 17 July 2026",
    formTitle: "Sign up for a lesson",
    formSub: "Pick the topic you want to attend. Right after you submit, our Telegram bot will send you the date, time and address.",
    fields: {
      name: "Full name",
      namePh: "Your name and surname",
      email: "Email",
      emailPh: "you@example.com",
      phone: "Phone",
      phonePh: "+998 90 123 45 67",
      school: "School",
      schoolPh: "e.g. School No. 45",
      grade: "Grade",
      gradePh: "Choose your grade",
      gradeSuffix: "grade",
      topic: "Topic",
      topicPh: "Choose a topic"
    },
    submit: "Send",
    sending: "Sending…",
    sent: "Thank you! Open the Telegram bot - it has sent you all the lesson details.",
    openBot: "Open Telegram",
    openBotHint: "Press the button, then tap “Start” in the bot - it will send you the details.",
    tgNote: "After sending you will be taken to our Telegram bot. Press “Start” - the bot will message you the date, time and address of the lesson.",
    seatsLeft: "seats left",
    seatsFull: "Full",
    seatsOf: "of",
    errAll: "Please fill in all the fields.",
    errEmail: "Please enter a valid email address.",
    errFull: "This lesson is full. Please choose another one.",
    errRate: "Too many attempts. Please wait a minute and try again.",
    errServer: "Something went wrong on our side. Please try again in a moment."
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
        a: "We are the bank's in-house AI team. We design, build and operate machine-learning systems across credit risk, fraud, automation, NLP and computer vision - and we measure their business impact against pre-AI baselines."
      },
      {
        q: "How do I get started with SQB AI?",
        a: "Use the Collaborate form below or write to ai@sqb.uz with a short brief - your problem, target metric and any data you can share. We respond within two business days and triage to a relevant team lead."
      },
      {
        q: "Does SQB AI work on cryptocurrencies?",
        a: "No. The AI Department is focused on banking decisions - credit, risk, fraud and customer experience. For other inquiries please contact the SQB Innovation Office."
      },
      {
        q: "How do you ensure the safety of AI decisions?",
        a: "Our models inform decisioning inside the bank's production systems with full audit trails, version control and rollback. Safety and explainability are non-negotiable."
      },
      {
        q: "Can external partners collaborate with the AI team?",
        a: "Yes - vendors, universities and fintech partners are welcome. Use the Collaborate form to start the conversation."
      },
      {
        q: "How are AI models monitored in production?",
        a: "Every production model has a monitoring dashboard - input drift, prediction distribution, calibration and business KPIs. We auto-alert on drift and review every model quarterly with risk and audit."
      }
    ]
  },
  contact: {
    eyebrow: "Collaborate",
    h2a: "Let's build something",
    h2b: "measurable.",
    sub: "Partners, vendors, candidates and internal teams - tell us what you're working on and we'll get back within two business days.",
    partnerTab: "Partnership",
    internTab: "Internship",
    internSub: "Students and recent grads - apply for an internship with the SQB AI team. Tell us your direction and share your skills or portfolio.",
    fields: {
      name: "Full name",
      namePh: "Your name",
      email: "Work email",
      emailPh: "you@company.com",
      company: "Company / Team",
      companyPh: "Optional",
      phone: "Phone number",
      phonePh: "+998 90 123 45 67",
      message: "How can we help?",
      messagePh: "Briefly describe your use case, dataset and target metric.",
      university: "Educational institution",
      universityPh: "University, school, lyceum…",
      direction: "Desired direction",
      directionPh: "Select a direction…",
      internMessage: "About you",
      internMessagePh: "Your skills, GitHub / portfolio link and motivation."
    },
    send: "Send message",
    sending: "Sending…",
    sent: "Sent",
    openBot: "Open Telegram",
    openBotHint: "Press the button, then tap “Start” in the bot - it will send you the details.",
    privacy: "We don't share your message. Public-data inquiries only.",
    address: "Republic of Uzbekistan, Tashkent, 100000, Shakhrisabz street, 3",
    errAll: "Please fill in all required fields.",
    errRate: "Too many attempts. Please wait a minute and try again.",
    errServer: "Something went wrong on our side. Please try again in a moment.",
    errEmail: "Please enter a valid email address."
  },
  footer: {
    tagline:
      "We design, build and operate AI systems that move real banking metrics - credit risk, fraud, automation, customer experience.",
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
    careers: "Karyera",
    school: "Maktab",
    faq: "Savollar",
    getStarted: "Boshlash",
    apply: "Bog‘lanish",
    toggleMenu: "Menyuni almashtirish",
    closeModal: "Yopish",
    galleryImageAlt: "Galereya"
  },
  hero: {
    eyebrow: "SQB AI'ga xush kelibsiz",
    h1a: "Natija yaratuvchi",
    h1b: "sun'iy",
    h1c: "intellekt",
    sub: "SQB'da AI tizimlarini ishlab chiqamiz va boshqaramiz - kredit riski va firibgarlikdan tortib ko‘p tilli suhbat-bankgacha - natijalarni esa blog post emas, bazis nuqtalarda o‘lchaymiz.",
    ctaPrimary: "Loyihalarni ko‘rish",
    ctaSecondary: "Jamoa bilan tanishing",
    trusted: "Bank ichida va tashqarisida ishonch qozongan"
  },
  about: {
    eyebrow: "Biz haqimizda",
    h2a: "AI SQB'da qanday qilib ",
    h2b: "o‘lchanadigan qiymat",
    h2c: " yaratadi",
    sub: "AI'ni bankning qaror qabul qilish jarayoniga joriy etamiz - namoyish uchun emas, balki risk, mijoz tajribasi va operatsiyalarda o‘lchanadigan komponent sifatida.",
    benefits: [
      {
        title: "Real vaqtdagi qarorlar",
        body: "Arizalar va tranzaksiyalar bo‘yicha skoring va qaror qabul qilish - millisekundlarda, aniqlikni yo‘qotmasdan."
      },
      {
        title: "Aqlli risk boshqaruvi",
        body: "AI modellari defoltlarni bashorat qiladi, anomaliyalarni aniqlaydi hamda kredit va operatsion risklarni kamaytiradi."
      },
      {
        title: "Jarayonlarning to‘liq avtomatlashuvi",
        body: "Ariza qabulidan yakuniy qarorgacha - AI qo‘l mehnatini qisqartiradi va operatsiyalarni tezlashtiradi."
      },
      {
        title: "O‘lchanadigan biznes natija",
        body: "Konversiya o‘sishi, xarajatlar kamayishi va samaradorlik o‘sishi - barcha natijalar ma'lumotlar bilan tasdiqlangan."
      }
    ]
  },
  features: {
    eyebrow: "Imkoniyatlar",
    h2a: "SQB AI bank jarayonlarini ",
    h2b: "qanday o‘zgartiradi",
    sub: "SQB'dagi har bir AI yechim samaradorlik ko‘rsatkichlari bilan tasdiqlanadi - javob vaqtidan model aniqligigacha.",
    decisioningEyebrow: "Benchmark",
    decisioningTitle: "O‘zbek tili uchun AI",
    decisioningBody:
      "O‘zbek tili uchun birinchi bank AI-benchmarki - 17 ta modelni 1377 ta savol va 6 turdagi til vazifasi bo‘yicha baholaydi.",
    decisioningDetails: [
      "ULAB Benchmark - 2026-yil martda yaratilgan, o‘zbek tili uchun birinchi bank AI-benchmarki. Maqsad - qaysi AI-model o‘zbek tilini eng yaxshi biladi, aniqlash.",
      "Benchmark 17 ta yetakchi AI-modelni 1377 ta savol bo‘yicha baholaydi: 6 turdagi til vazifasi (tushunish, generatsiya, klassifikatsiya, tarjima, dialog, xatolar bilan ishlash) va 3 nutq registri (rasmiy, neytral, suhbat).",
      "Top-3 natija: Kimi K2.5 - 70.2%, Mistral Large 2410 - 69.3%, Cogito 67B - 68.1%. Benchmark aloqa markazi, onboarding va hujjat oqimida bank vazifalari uchun eng yaxshi modellarni tanlash uchun ishlatiladi."
    ],
    forecastingEyebrow: "Analitika va prognoz",
    forecastingTitle: "Analitika va prognozda AI",
    forecastingBody:
      "Ma'lumotlar va tushunarli mashinaviy o‘qitish modellariga asoslangan strategik qaror qabul qilishni qo‘llab-quvvatlash - risklar, mijoz xulq-atvori va portfel samaradorligini bashorat qiladi.",
    forecastingDetails: [
      "Risklar, mijoz xulq-atvori va portfel samaradorligini tushunarli modellar yordamida bashorat qilish - har bir prognoz nuqtali baho emas, ishonch oraliqlari va feature hissalari bilan keladi.",
      "MMT va riteyl kredit portfelida kalibrlangan PD egri chiziqlari va erta ogohlantirish signallari, har hafta yangilanadi va har chorakda risk jamoasi tomonidan ko‘rib chiqiladi.",
      "Kreditdan tashqari, xuddi shu vositalar kapital rejalashtirish ssenariylarini, depozit oqimi prognozlarini va aloqa markazi talabini bashorat qiladi - portfel darajasidagi raqam qarorga ta'sir qiladigan har qanday joyda."
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
    sub: "SQB'da ishga tushirilgan haqiqiy keyslar. Yo‘nalish yoki status bo‘yicha filtrlang - kartochka va metrik jadvali o‘rtasida almashtiring.",
    direction: "Yo‘nalish",
    statusLabel: "Status",
    viewCards: "Kartochkalar",
    viewTable: "Jadval",
    all: "Hammasi",
    production: "Ishlamoqda",
    poc: "Prototip",
    release: "Reliz",
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
      Risk: "Risklar",
      "Credit Scoring": "Kredit skoring",
      Automation: "Avtomatlashtirish",
      "NLP / Chatbots": "NLP / Chatbotlar",
      "Computer Vision": "Kompyuter ko‘rish"
    },
    list: {
      "sqb-mahalla": {
        name: "SQB Mahalla",
        short:
          "Butun O'zbekiston bo'yicha barcha viloyat va tumanlarni qamrab oluvchi AI biznes maslahat va mintaqaviy tahlil platformasi.",
        problem:
          "Mamlakatdagi tadbirkorlarga lokal bozor tahlili va tayyor biznes-rejalarga kirish imkoni yetishmaydi; mintaqaviy tadqiqot qo'lda olib boriladi, sekin va aksariyat mahallalar uchun amalda mavjud emas.",
        solution:
          "AI platforma biznes g'oyani barcha viloyat va tumanlardagi bozor ehtiyojlari bilan solishtirib tahlil qiladi, bir necha daqiqada tayyor biznes-reja chiqaradi va tadbirkorni SQB moliyalashtirish imkoniyatlari bilan bog'laydi.",
        impact: [
          { label: "Geografik qamrov", value: "Barcha viloyatlar" },
          { label: "Bazadagi tumanlar", value: "200+" },
          { label: "Biznes-reja yaratish", value: "Daqiqalar" }
        ]
      },
      "ai-advisor": {
        name: "SQB AI Advisor",
        short:
          "Biznes g'oyani bir necha daqiqada tayyor biznes-rejaga va mos SQB moliyalashtirish mahsulotiga aylantiruvchi suhbatdosh AI yordamchi.",
        problem:
          "Yangi tadbirkorlar va kichik biznes vakillariga g'oyani tuzilgan, moliyaga tayyor biznes-rejaga aylantirish qiyin; konsultantlar qimmat va sekin, ko'pchilik bankka chala biznes-reja bilan murojaat qiladi.",
        solution:
          "Ko'p tilli AI maslahatchi foydalanuvchidan g'oya haqida savol-javob oladi, mintaqaviy bozor signallarini yig'adi, tushum va xarajat prognozlari bilan tuzilgan reja yaratadi va foydalanuvchini mos SQB moliyalashtirish mahsulotiga uzatadi.",
        impact: [
          { label: "Reja yaratish", value: "Daqiqalar" },
          { label: "Tillar", value: "UZ / RU / EN" },
          { label: "Moliyalashtirish yo'llari", value: "Bir nechta" }
        ]
      },
      "ai-ijro": {
        name: "SQB AI Ijro",
        short:
          "Bankka kelgan xat-hujjatlarni qabul qilib, OCR, LLM va embedding asosida mas'ul departamentlarga avtomatik yo'naltiruvchi AI tizim.",
        problem:
          "Kuniga 500+ kelgan xatlarni qo'lda registratsiya qilish, har birini o'qib chiqib mas'ulga yo'naltirish kerak - Ijroni boshqarish departamentining katta vaqti shu jarayonga ketadi.",
        solution:
          "OCR kelgan xat matnini ajratib oladi, LLM mazmunini tahlil qilib avtomatik registratsiya qiladi, embedding modeli esa xatni mas'ul departamentga uchidan-uchiga yo'naltiradi.",
        impact: [
          { label: "Kunlik hujjatlar", value: "500+" },
          { label: "Qo'lda ishlov", value: "-80-90%" },
          { label: "Avto-yo'naltirish", value: "Real vaqt" }
        ]
      },
      "ai-lex": {
        name: "AI Lex.uz",
        short:
          "Yuridik departament uchun lex.uz va bankning ichki bazasiga integratsiyalashgan AI/ML hujjat tekshiruv tizimi - eskirgan normalar, imloviy va texnik xatolarni avtomatik aniqlaydi.",
        problem:
          "Bankning ichki hujjatlari yagona bazada emas - yuridik xodimlar vaqtining katta qismi hujjatlarni topish va solishtirishga ketadi; imloviy va texnik xatolarni tekshiruvchi ichki tizim yo'q; qonunchilik milliy bazasi va bank bazasi o'rtasida integratsiya bo'lmagani uchun o'z kuchini yo'qotgan normalarga tayanish ehtimoli yuqori.",
        solution:
          "Lex.uz va bank bazasiga integratsiyalashgan, qonunchilikdagi o'zgarishlarni real vaqtda kuzatuvchi avtomatik tahlil tizimi; barcha ichki hujjatlar uchun yagona markazlashgan server yoki cloud repository; AI/ML asosli content-verification va matn ichidagi xatolarni aniqlash uchun OCR + NLP analizerlari.",
        impact: [
          { label: "Hujjat tekshiruv vaqti", value: "-50-70%" },
          { label: "Xato aniqlash", value: "+90%" },
          { label: "Mos kelmaslik xavfi", value: "-70-80%" }
        ]
      },
      "ai-callcenter": {
        name: "Call Center AI",
        short:
          "Aloqa markazi uchun AI yordamchi: tipik va ko'p uchraydigan savollarni mustaqil hal qiladi, murakkab yoki shaxsiy ma'lumotlarga oid murojaatlarni jonli operatorga ulaydi.",
        problem:
          "Aloqa markazida shablon va tipik savollar juda ko'p, lekin har bir murojaat operator ishtirokini talab qilgan - bu yuklamani va javob vaqtini oshirgan.",
        solution:
          "Bank tuzilmasi, tizimi va eng ko'p uchraydigan savollar bo'yicha o'qitilgan OpenAI asosidagi AI yordamchi mijozlarga oddiy va ko'p uchraydigan savollarda mustaqil yordam beradi. Notanish mavzular yoki shaxsiy ma'lumotlarga tegadigan masalalarda esa avtomatik ravishda jonli operatorga ulaydi.",
        impact: [
          { label: "Operator yuklamasi", value: "Past" },
          { label: "Tipik savollar", value: "Avto-javob" },
          { label: "Shaxsiy ma'lumot", value: "Operator" }
        ]
      },
      "sqb-fleet-ai": {
        name: "SQB Fleet AI",
        short:
          "13 viloyat bo'yicha 129 ta transport vositasi va generator uchun real vaqtli monitoring, ML-asosli haydovchi skoringi va bashoratli texnik xizmatni o'z ichiga olgan AI avtopark boshqaruv platformasi.",
        problem:
          "129 ta transport vositasi va generatorlar tarqoq GPS hisobotlari orqali qo'lda kuzatilgan - haydovchi xulqi, yoqilg'i xarajatlari, hududiy yuklama va texnik xizmat jadvallari uchun yagona analitika bo'lmagan; haydovchini baholash subyektiv va miqdoriy ko'rsatkichlarsiz olib borilgan.",
        solution:
          "XGBoost modeli GPS hodisalari (tezlik oshirish, keskin tormoz, bo'sh ishlash vaqti) bo'yicha haydovchi xulqini baholaydi va 7 ta analitik dvigatel parallel ishlaydi: haydovchi skoringi, maqsadsiz foydalanishni aniqlash, hududiy yuklamani taqsimlash, yoqilg'i va xarajat tahlili, bashoratli texnik xizmat, generator monitoringi va yo'nalish tahlili. Ma'lumotlar GPS-trakerlardan REST API orqali real vaqtda PostgreSQL ga 2 daqiqalik yangilanish bilan tushadi.",
        impact: [
          { label: "Transport va generatorlar", value: "129" },
          { label: "Qamrab olingan viloyatlar", value: "13" },
          { label: "Haydovchi skoring avtomatlashtirilishi", value: "100%" }
        ]
      },
      "sqb-solar-forecaster": {
        name: "SQB Solar Forecaster",
        short:
          "Quyosh stansiyalari operatorlari uchun 14 kun oldindan har soatlik energiya ishlab chiqarishni bashorat qiluvchi va past ko'rsatkichli stansiyalarni real vaqtda aniqlovchi AI yordamchi.",
        problem:
          "Quyosh stansiyalari operatorlari kelajakdagi energiya ishlab chiqarish bo'yicha ishonchli prognozga ega emas - odatdagi ob-havo prognozi asosida 'ko'z-bilan' baholash 25-30% ga adashadi, bu elektr energiyasini sotishni rejalashtirishni qiyinlashtiradi va uskunalar nosozligini aniqlashni kechiktiradi.",
        solution:
          "Har bir stansiya tarixiy telemetriyasi va ob-havo prognozlari asosida o'qitilgan ML modeli har bir stansiya uchun keyingi 14 kunlik soatlik ishlab chiqarishni avtomatik hisoblaydi; dashboard model bashoratidan past natija ko'rsatayotgan stansiyalarni darhol ajratadi.",
        impact: [
          { label: "Bashorat aniqligi", value: "90%+" },
          { label: "Bashorat gorizonti", value: "14 kun" },
          { label: "Operator qo'l mehnati", value: "0" }
        ]
      }
    }
  },
  team: {
    eyebrow: "Jamoa",
    h2a: "Modellar ",
    h2b: "ortidagi insonlar",
    sub: "Kross-funksional AI jamoa - muhandislar, olimlar, dizaynerlar va product - Risk, Yuridik, Operatsiyalar va Riteyl bilan birga ishlaydi.",
    headlineValue: "20+",
    headlineLabel: "xodim",
    detailsCta: "Batafsil",
    experienceLabel: "yil tajriba",
    aboutTitle: "Xodim haqida",
    achievementsTitle: "Yutuqlar",
    projectsTitle: "Loyihalar",
    skillsTitle: "Ko'nikmalar",
    back: "Jamoaga qaytish",
    body: "Asosiy modellar va MLOps'dan tortib dashboardlar va chat-botlargacha - jamoa yuridik tekshiruv, hujjat avtomatlashtirish, mintaqaviy tahlil, aloqa markazi yordami, avtopark boshqaruvi va quyosh energetikasi operatsiyalarini qamrab oluvchi AI mahsulotlar portfelini ishga tushirgan. Data muhandislar, backend va frontend dasturchilar, ML mutaxassislari, dizaynerlar, loyiha va HR menejerlari yagona kross-funksional jamoa sifatida bankning Risk, Yuridik, Operatsiyalar va Riteyl bo'limlari bilan har bir g'oyani konsept'dan productioncha olib chiqib, uzluksiz hamkorlikda ishlaydi."
  },
  impact: {
    eyebrow: "AI Natijasi",
    h2a: "Natijani ",
    h2b: "siljitadigan raqamlar",
    sub: "Yuridik tekshiruv, hujjat avtomatlashtirish, compliance va back-office bo'yicha AI bo'limining umumiy natijasi - AI'gacha bo'lgan bazaga nisbatan o'lchangan va har chorakda audit qilinadi.",
    updated: "2026-yil aprel · AI Lex.uz, AI Ijro, Call Center AI, SQB Fleet AI va SQB Solar Forecaster loyihalari asosida",
    items: [
      { label: "Hujjat tekshiruv vaqti tejash" },
      { label: "Qo'lda ishlov (kamayish)" },
      { label: "Compliance risk (kamayish)" },
      { label: "Mehnat tejash" }
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
          "Hackathon yakunlariga ko'ra: 1-o'rin - tadbirkorlar uchun hududiy tahlilga asoslangan qaror qabul qilish platformasi; 2-o'rin - bankomatlar tarmog'ini optimallashtirish, naqd pul aylanishi va inkassatsiya logistikasini samarali tashkil etish loyihasi; 3-o'rin - hududlarda raqobat va talab tahlili asosida yangi biznes yo'nalishlarini tavsiya qiluvchi yechim.",
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
        title: "SQB AI Maslahatchi - g‘oyani bir necha daqiqada real biznesga aylantiradi",
        excerpt:
          "Foydalanuvchi g‘oyani kiritadi - SQB AI Maslahatchi tahlil qiladi, biznes-reja, byudjet va kredit imkoniyatini tayyor qilib beradi.",
        body: [
          "G'oya bor, lekin biznesni qanday va qayerdan boshlashni bilmaysizmi? Endi bu muammo emas.",
          "SQB tomonidan ishlab chiqilgan SQB AI Maslahatchi'si - g'oyani bir necha daqiqada real biznesga aylantiradigan raqamli yechim. Siz faqat g'oyani kiritasiz - qolganini tizim amalga oshiradi: tajribangiz va imkoniyatlaringizni tahlil qiladi, hududingizdagi bozor ehtiyojlarini o'rganadi va eng maqbul biznes yo'nalishini aniqlaydi.",
          "Hozirda sinov tariqasida Buxoro viloyati G'ijduvon hamda Shofirkon tumanlari misolida ishga tushirildi.",
          "5-10 daqiqada: tayyor biznes-reja, zarur moliyaviy resurslar hajmi, loyihaning o'zini oqlash muddati va qadamma-qadam amaliy reja. Eng muhim jihati - platformaning o'zidayoq mos kreditni tanlab, onlayn tarzda moliyalashtirish uchun ariza yuborish imkoniyati ham yaratilmoqda.",
          "Endi uzoq o'ylash shart emas, tavakkal qarorlar yo'q - faqat aniq reja va harakat. SQB - kelajakni birga yaratamiz."
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
        title: "Yoshlar salohiyati va innovatsiyalar - ustuvor yo‘nalish",
        excerpt:
          "SQB va Turin politexnika universiteti o‘rtasida IT va sun'iy intellekt yo‘nalishida hamkorlik memorandumi imzolandi.",
        body: [
          "Davlatimiz rahbari o'tgan yilda yoshlar bilan ochiq muloqotida axborot texnologiyalari va sun'iy intellekt yo'nalishlari kelajak taraqqiyotining asosiy omillaridan biri ekanini ta'kidlab, yoshlarni ushbu sohalarda qo'llab-quvvatlash ustuvor vazifa sifatida belgilab berdi.",
          "Shu maqsadda O'zsanoatqurilishbank (SQB) tomonidan oliy ta'lim muassasalari bilan hamkorlik izchil kengaytirilmoqda. Xususan, Bank va Turin politexnika universiteti o'rtasida hamkorlik memorandumi imzolandi.",
          "Hamkorlik doirasida: IT va sun'iy intellekt yo'nalishlarida qo'shma loyihalar amalga oshiriladi; iqtidorli talabalar bankning raqamli tashabbuslariga jalb etiladi; talabalar amaliy faoliyatga tizimli jalb qilinadi; istiqbolli IT mutaxassislar zaxirasi shakllantiriladi.",
          "Mazkur hamkorlik yoshlarning kasbiy rivoji va zamonaviy bilimlarni egallashi uchun yangi imkoniyatlar yaratadi.",
          "SQB akademik hamjamiyat bilan hamkorlikni davom ettirib, yoshlarning innovatsion salohiyatini ro'yobga chiqarishga alohida e'tibor qaratadi. SQB - yoshlar bilan birga kelajakni bunyod etadi!"
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
        name: "“Sun'iy intellekt va raqamli transformatsiya - O'zbekiston iqtisodiyoti rivojlanishining yangi bosqichi” mavzusidagi xalqaro konferensiya",
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
  careers: {
    eyebrow: "Karyera",
    h2a: "AI banking kelajagini ",
    h2b: "biz bilan",
    h2c: " quring",
    sub: "SQB AI bo‘limiga qo‘shiling - bank ko‘rsatkichlarini haqiqatda siljitadigan modellarni ishga tushiring, Risk, Yuridik, Operatsiyalar va Riteyl bilan ishlang va kuchli kross-funksional jamoa bilan o‘sing.",
    invite: "Biz CV emas, qiziquvchanlik va mahoratni qadrlaymiz. Agar siz millionlab mijozlarga tegadigan modellarni ishga tushirishni, tartibsiz ma'lumotni qarorlarga aylantirishni va kuchli jamoa bilan tez o‘rganishni yoqtirsangiz - bizning jamoamizdansiz.",
    cta: "Sizga qo‘shilmoqchiman",
    back: "Karyeraga qaytish",
    rolesA: "Bizda ",
    rolesHi: "ko‘plab",
    rolesB: " vakansiya bor",
    rolesSub: "Aynan sizni nima qiziqtirishini tanlang.",
    formTitle: "Stajirovkaga ariza",
    formSub: "Talabalar va bitiruvchilar - yo‘nalishingizni yozing va ko‘nikma yoki portfolioingizni ulashing. Ikki ish kuni ichida javob beramiz.",
    detailDesc: "Tavsif",
    detailResp: "Vazifalar",
    detailReq: "Talablar",
    detailOffer: "Biz taklif qilamiz",
    apply: "Ariza topshirish",
    requirementsTitle: "Biz nimani qidiramiz",
    empty: "Hozircha ochiq vakansiya yo‘q - lekin kuchli mutaxassislar bilan tanishishdan doim xursandmiz. Quyidagi forma orqali yozing.",
    wantTitle: "Sizdan nimani kutamiz",
    want: [
      {
        title: "Qiziquvchanlik",
        body: "Siz tez o‘rganasiz, murakkab masalalarga chuqur kirasiz va aniq narsani shubha ostiga olasiz."
      },
      {
        title: "Mas'uliyat",
        body: "G‘oyalarni konseptdan productioncha olib chiqasiz va faqat vazifa uchun emas, natija uchun javob berasiz."
      },
      {
        title: "Natija",
        body: "Siz uchun real metrikalar muhim - ishni faoliyat bilan emas, natija bilan o‘lchaysiz."
      }
    ],
    types: {
      "full-time": "To‘liq stavka",
      "part-time": "Yarim stavka",
      internship: "Stajirovka",
      contract: "Shartnoma asosida"
    },
    cv: {
      label: "Rezyume (CV)",
      hint: "PDF yoki Word · 15 MB gacha",
      choose: "Fayl tanlash",
      invalidType: "Faqat PDF yoki Word (.pdf, .doc, .docx) mumkin",
      tooLarge: "Fayl 15 MB dan katta"
    }
  },
  school: {
    eyebrow: "Maktab",
    h2a: "AI ",
    h2b: "maktabdan",
    h2c: " boshlanadi",
    sub: "9-11-sinf o'quvchilari uchun bepul AI kursi. Bankda juma darslari - neyron tarmoq nimaligidan tortib, o'zingizning ishlaydigan loyihangizgacha.",
    cta: "Sizga qo'shilmoqchiman",
    back: "Maktabga qaytish",
    heroTitle: "SQB AI Maktab",
    heroSub: "Dasturchi bo'lishingiz shart emas. Qiziquvchanlik yetarli. Muhandislarimiz sun'iy intellekt aslida qanday ishlashini o'rgatadi - haqiqiy bank ichida ishlayotgan tizimlar misolida.",
    aboutTitle: "Dastur sizga nima beradi",
    about: [
      {
        title: "Nazariya emas, amaliyot",
        body: "Har bir dars yodlanadigan konspekt bilan emas, o'zingiz qurgan natija bilan tugaydi."
      },
      {
        title: "Haqiqiy muhandislar",
        body: "Darslarni SQB AI jamoasi - bank modellarini quradigan mutaxassislar o'tkazadi."
      },
      {
        title: "Mutlaqo bepul",
        body: "Dastur uchun to'lov yo'q. Sizdan faqat qiziqish va o'rganish istagi kerak."
      }
    ],
    scheduleTitle: "Qanday o'tadi",
    scheduleNote: "har juma · 17-iyul 2026 dan boshlab",
    formTitle: "Darsga yozilish",
    formSub: "Qatnashmoqchi bo'lgan mavzuni tanlang. Yuborganingizdan so'ng Telegram botimiz sizga sana, vaqt va manzilni yuboradi.",
    fields: {
      name: "To'liq ism",
      namePh: "Ism va familiyangiz",
      email: "Email",
      emailPh: "siz@example.com",
      phone: "Telefon",
      phonePh: "+998 90 123 45 67",
      school: "Maktab",
      schoolPh: "masalan, 45-maktab",
      grade: "Sinf",
      gradePh: "Sinfingizni tanlang",
      gradeSuffix: "sinf",
      topic: "Mavzu",
      topicPh: "Mavzuni tanlang"
    },
    submit: "Yuborish",
    sending: "Yuborilmoqda…",
    sent: "Rahmat! Telegram botni oching - u sizga dars ma'lumotlarini yubordi.",
    openBot: "Telegramni ochish",
    openBotHint: "Tugmani bosing, so'ng botda “Start” ni bosing - u sizga ma'lumotlarni yuboradi.",
    tgNote: "Yuborgach Telegram botimizga o'tasiz. “Start” tugmasini bosing - bot sizga darsning sanasi, vaqti va manzilini yozadi.",
    seatsLeft: "joy qoldi",
    seatsFull: "To'ldi",
    seatsOf: "/",
    errAll: "Iltimos, barcha maydonlarni to'ldiring.",
    errEmail: "Iltimos, to'g'ri email kiriting.",
    errFull: "Bu dars to'lgan. Iltimos, boshqasini tanlang.",
    errRate: "Juda ko'p urinish. Bir daqiqa kutib, qayta urinib ko'ring.",
    errServer: "Bizning tomonda xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring."
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
        a: "Biz bankning ichki AI jamoasi. Kredit riski, firibgarlik, avtomatlashtirish, NLP va kompyuter ko‘rish bo‘yicha mashinaviy o‘qitish tizimlarini quramiz va boshqaramiz - biznes natijasi AI'gacha bo‘lgan bazaga nisbatan o‘lchanadi."
      },
      {
        q: "SQB AI bilan qanday ishlashni boshlash mumkin?",
        a: "Quyidagi forma orqali yoki ai@sqb.uz manziliga qisqa brif yuboring - muammo, maqsadli ko‘rsatkich va bo‘lishishingiz mumkin bo‘lgan ma'lumotlar. Ikki ish kuni ichida javob beramiz va tegishli yetakchiga yo‘naltiramiz."
      },
      {
        q: "SQB AI kriptovalyuta ustida ishlaydimi?",
        a: "Yo‘q. AI bo‘limi bank qarorlariga qaratilgan - kredit, risk, firibgarlik va mijoz tajribasi. Boshqa savollar uchun SQB Innovation ofisiga murojaat qiling."
      },
      {
        q: "AI qarorlarining xavfsizligini qanday ta'minlaysiz?",
        a: "Modellarimiz bankning production tizimlarida to‘liq audit, versiyalash va rollback bilan qaror qabul qilishga yordam beradi. Xavfsizlik va tushunarlilik shartdir."
      },
      {
        q: "Tashqi hamkorlar AI jamoasi bilan ishlashi mumkinmi?",
        a: "Ha - vendorlar, universitetlar va fintech hamkorlar mehmondo‘st. Suhbatni boshlash uchun forma'dan foydalaning."
      },
      {
        q: "AI modellari production'da qanday kuzatiladi?",
        a: "Har bir production modelining monitoring dashboardi bor - input drift, prognoz taqsimoti, kalibratsiya va biznes KPI. Drift'da avtomatik ogohlantiriladi va har model har chorakda risk va audit bilan ko‘rib chiqiladi."
      }
    ]
  },
  contact: {
    eyebrow: "Hamkorlik",
    h2a: "O‘lchanadigan narsa",
    h2b: "yarataylik.",
    sub: "Hamkorlar, vendorlar, nomzodlar va ichki jamoalar - ustida ishlayotgan loyihangizni yozing, ikki ish kuni ichida javob beramiz.",
    partnerTab: "Hamkorlik",
    internTab: "Stajirovka",
    internSub: "Talabalar va bitiruvchilar - SQB AI jamoasida stajirovkaga ariza qoldiring. Yo‘nalishingizni yozing va ko‘nikma yoki portfolioingizni ulashing.",
    fields: {
      name: "To‘liq ism",
      namePh: "Ismingiz",
      email: "Ish elektron pochta",
      emailPh: "siz@kompaniya.com",
      company: "Kompaniya / Jamoa",
      companyPh: "Ixtiyoriy",
      phone: "Telefon raqam",
      phonePh: "+998 90 123 45 67",
      message: "Qanday yordam beramiz?",
      messagePh: "Qisqacha use case, dataset va maqsadli ko‘rsatkich haqida yozing.",
      university: "O‘quv muassasasi",
      universityPh: "Universitet, maktab, litsey…",
      direction: "Istalgan yo‘nalish",
      directionPh: "Yo‘nalishni tanlang…",
      internMessage: "O‘zingiz haqingizda",
      internMessagePh: "Ko‘nikmalaringiz, GitHub / portfolio havolasi va motivatsiya."
    },
    send: "Yuborish",
    sending: "Yuborilmoqda…",
    sent: "Yuborildi",
    openBot: "Telegramni ochish",
    openBotHint: "Tugmani bosing, so'ng botda “Start” ni bosing - u sizga ma'lumotlarni yuboradi.",
    privacy: "Xabarni ulashmaymiz. Faqat ommaviy ma'lumot uchun.",
    address: "O‘zbekiston Respublikasi, Toshkent shahri, 100000, Shahrisabz ko‘chasi, 3-uy",
    errAll: "Iltimos, barcha majburiy maydonlarni to‘ldiring.",
    errRate: "Juda ko'p urinish. Bir daqiqa kutib, qayta urinib ko'ring.",
    errServer: "Bizning tomonda xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring.",
    errEmail: "Iltimos, to‘g‘ri elektron pochta kiriting."
  },
  footer: {
    tagline:
      "Bank ko‘rsatkichlarini haqiqatda siljitadigan AI tizimlarini quramiz va boshqaramiz - kredit riski, firibgarlik, avtomatlashtirish, mijoz tajribasi.",
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
    careers: "Карьера",
    school: "Школа",
    faq: "Вопросы",
    getStarted: "Начать",
    apply: "Связаться",
    toggleMenu: "Переключить меню",
    closeModal: "Закрыть",
    galleryImageAlt: "Галерея"
  },
  hero: {
    eyebrow: "Добро пожаловать в SQB AI",
    h1a: "Искусственный",
    h1b: "интеллект,",
    h1c: "создающий результат",
    sub: "Мы проектируем, строим и сопровождаем AI-системы в SQB - от кредитного риска и фрода до многоязычного диалогового банкинга - и измеряем их в базисных пунктах, а не в постах.",
    ctaPrimary: "Смотреть проекты",
    ctaSecondary: "Познакомиться с командой",
    trusted: "Доверяют в банке и за его пределами"
  },
  about: {
    eyebrow: "О нас",
    h2a: "Как ИИ создаёт ",
    h2b: "измеримую ценность",
    h2c: " в SQB",
    sub: "Мы встраиваем AI в контур принятия решений банка - не как демо, а как измеряемый компонент риска, клиентского опыта и операций.",
    benefits: [
      {
        title: "Решения в реальном времени",
        body: "Скоринг и принятие решений по заявкам и транзакциям за миллисекунды - без потери точности."
      },
      {
        title: "Интеллектуальное управление рисками",
        body: "Модели ИИ прогнозируют дефолты, выявляют аномалии и снижают кредитные и операционные риски."
      },
      {
        title: "Сквозная автоматизация процессов",
        body: "От обработки заявок до принятия решений - ИИ сокращает ручной труд и ускоряет операции."
      },
      {
        title: "Измеримый бизнес-эффект",
        body: "Рост конверсии, снижение затрат и повышение эффективности - все результаты подтверждаются данными."
      }
    ]
  },
  features: {
    eyebrow: "Возможности",
    h2a: "Как SQB AI ",
    h2b: "трансформирует банковские процессы",
    sub: "Каждое AI-решение в SQB подтверждается метриками производительности - от времени отклика до точности моделей.",
    decisioningEyebrow: "Benchmark",
    decisioningTitle: "AI для узбекского языка",
    decisioningBody:
      "Первый банковский AI-бенчмарк для узбекского языка - оценивает 17 моделей на 1377 вопросах в 6 типах языковых задач.",
    decisioningDetails: [
      "ULAB Benchmark - это первый банковский AI-бенчмарк для узбекского языка, созданный в марте 2026 года. Цель - определить, какая AI-модель лучше всего знает узбекский язык.",
      "В бенчмарке 17 ведущих AI-моделей оцениваются на 1377 вопросах, разделённых на 6 типов языковых задач (понимание, генерация, классификация, перевод, диалог, обработка ошибок) и 3 речевых регистра (официальный, нейтральный, разговорный).",
      "Топ-3: Kimi K2.5 - 70.2%, Mistral Large 2410 - 69.3%, Cogito 67B - 68.1%. Бенчмарк используется для выбора лучших моделей под банковские задачи - контакт-центр, онбординг, документооборот."
    ],
    forecastingEyebrow: "Аналитика и прогнозирование",
    forecastingTitle: "AI в аналитике и прогнозировании",
    forecastingBody:
      "Поддержка стратегических решений на основе данных и интерпретируемых моделей машинного обучения - прогнозирование рисков, поведения клиентов и эффективности портфеля.",
    forecastingDetails: [
      "Прогнозирование рисков, клиентского поведения и эффективности портфеля с использованием интерпретируемых моделей - каждый прогноз приходит с доверительными интервалами и атрибуциями признаков, а не только точечной оценкой.",
      "Калиброванные PD-кривые и сигналы раннего предупреждения по портфелям МСБ и розничного кредита, обновляются еженедельно, проходят ревью риск-команды ежеквартально.",
      "Помимо кредита, тот же тулкит выдаёт сценарии для capital planning, прогнозы оттока депозитов и спроса контакт-центра - везде, где портфельная цифра двигает решение."
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
    sub: "Реальные кейсы, запущенные в SQB. Фильтруйте по направлению или статусу - переключайтесь между карточками и таблицей метрик.",
    direction: "Направление",
    statusLabel: "Статус",
    viewCards: "Карточки",
    viewTable: "Таблица",
    all: "Все",
    production: "Production",
    poc: "PoC",
    release: "Релиз",
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
      "sqb-mahalla": {
        name: "SQB Mahalla",
        short:
          "AI бизнес-советник и платформа региональной аналитики, охватывающая все области и районы Узбекистана.",
        problem:
          "Предпринимателям по всей стране не хватает локальной рыночной аналитики и готовых бизнес-планов; ручное региональное исследование медленное, фрагментированное и недоступно для большинства махаллей.",
        solution:
          "AI-платформа анализирует бизнес-идею с учётом потребностей рынка по всем вилоятам и туманам, за минуты формирует готовый бизнес-план и связывает предпринимателя с программами финансирования SQB.",
        impact: [
          { label: "География покрытия", value: "Все регионы" },
          { label: "Районов в базе", value: "200+" },
          { label: "Создание бизнес-плана", value: "Минуты" }
        ]
      },
      "ai-advisor": {
        name: "SQB AI Advisor",
        short:
          "Диалоговый AI-ассистент, который за минуты превращает бизнес-идею в готовый бизнес-план с подходящим финансированием SQB.",
        problem:
          "Начинающим предпринимателям и малому бизнесу сложно превратить идею в структурированный, готовый к финансированию бизнес-план; консультанты дороги и медленны, поэтому большинство приходит в банк без жизнеспособного плана.",
        solution:
          "Многоязычный AI-советник проводит интервью по идее, подтягивает региональные рыночные сигналы, формирует структурированный план с прогнозом доходов и расходов и направляет пользователя к подходящему финансовому продукту SQB.",
        impact: [
          { label: "Создание плана", value: "Минуты" },
          { label: "Языки", value: "UZ / RU / EN" },
          { label: "Варианты финансирования", value: "Несколько" }
        ]
      },
      "ai-ijro": {
        name: "SQB AI Ijro",
        short:
          "Приём входящей корреспонденции банка с автоматической маршрутизацией: OCR, LLM и embedding-модель направляют письма ответственным департаментам.",
        problem:
          "500+ входящих писем в день регистрируются вручную; каждое письмо нужно прочитать и направить ответственному - на это уходит значительная часть времени Департамента управления исполнением.",
        solution:
          "OCR извлекает текст входящего письма, LLM анализирует содержание и автоматически регистрирует обращение, а embedding-модель направляет письмо ответственному департаменту в режиме end-to-end.",
        impact: [
          { label: "Документов в день", value: "500+" },
          { label: "Ручная обработка", value: "-80-90%" },
          { label: "Авто-маршрутизация", value: "Реальное время" }
        ]
      },
      "ai-lex": {
        name: "AI Lex.uz",
        short:
          "AI/ML-проверка юридических документов с интеграцией lex.uz и внутренней базы банка - автоматически выявляет утратившие силу нормы, орфографические и технические ошибки.",
        problem:
          "Внутренние документы банка не хранятся в едином репозитории, и юристы тратят основное время на поиск и сверку; нет автоматической проверки орфографических и технических ошибок; без интеграции с национальной базой законодательства возможна ссылка на нормы, утратившие силу.",
        solution:
          "Автоматическая система анализа, интегрированная с lex.uz и базой банка, отслеживает изменения законодательства в реальном времени; единый централизованный сервер или cloud-репозиторий для всех внутренних документов; AI/ML content-verification и OCR + NLP-анализаторы для выявления ошибок в тексте.",
        impact: [
          { label: "Время проверки документов", value: "-50-70%" },
          { label: "Выявление ошибок", value: "+90%" },
          { label: "Снижение комплаенс-рисков", value: "-70-80%" }
        ]
      },
      "ai-callcenter": {
        name: "Call Center AI",
        short:
          "ИИ-ассистент для колл-центра: помогает операторам с типовыми и часто задаваемыми вопросами клиентов, а сложные обращения и вопросы с личными данными передаёт живому оператору.",
        problem:
          "Слишком много шаблонных и типичных вопросов, но каждый требовал участия оператора - это увеличивало нагрузку и время ответа.",
        solution:
          "Автоматизация заметно понижает нагрузку на работников и ускоряет процесс. ИИ-ассистент на OpenAI, обученный на структуре, системе банка и самых частых вопросах, помогает клиентам с простыми и часто задаваемыми вопросами. В случае незнакомых тем или тем, затрагивающих личные данные, - соединяет с оператором.",
        impact: [
          { label: "Нагрузка на оператора", value: "Ниже" },
          { label: "Типовые запросы", value: "Авто-ответ" },
          { label: "Личные данные", value: "Оператор" }
        ]
      },
      "sqb-fleet-ai": {
        name: "SQB Fleet AI",
        short:
          "AI-платформа управления автопарком: real-time мониторинг, ML-скоринг водителей и предиктивное ТО для 129 транспортных средств и генераторов в 13 регионах.",
        problem:
          "129 транспортных средств и генераторов мониторились вручную через разрозненные GPS-отчёты - единой аналитики по поведению водителей, расходу топлива, региональной загрузке и срокам ТО не было; оценка водителей была субъективной, без количественных метрик.",
        solution:
          "Модель XGBoost оценивает поведение водителей по событиям GPS (превышение скорости, резкое торможение, простой двигателя), параллельно работают 7 аналитических движков: скоринг водителей, контроль нецелевого использования, распределение нагрузки по регионам, расход топлива и затраты, предиктивное ТО, мониторинг генераторов и анализ маршрутов. Данные поступают в реальном времени через REST API GPS-трекеров в PostgreSQL с обновлением каждые 2 минуты.",
        impact: [
          { label: "ТС и генераторов", value: "129" },
          { label: "Регионов в покрытии", value: "13" },
          { label: "Автоматизация скоринга водителей", value: "100%" }
        ]
      },
      "sqb-solar-forecaster": {
        name: "SQB Solar Forecaster",
        short:
          "AI-помощник для операторов солнечных станций: предсказывает почасовую выработку энергии на 14 дней вперёд и в реальном времени отмечает станции с отклонениями.",
        problem:
          "Операторы солнечных станций не имеют надёжного прогноза будущей выработки - оценка «на глаз» по обычному прогнозу погоды ошибается на 25-30%, из-за чего трудно планировать продажу электроэнергии и вовремя замечать поломки оборудования.",
        solution:
          "ML-модель, обученная на исторической телеметрии каждой станции и прогнозах погоды, автоматически рассчитывает почасовую выработку на 14 дней вперёд для каждой станции; дашборд мгновенно подсвечивает станции, работающие хуже, чем предсказывает модель.",
        impact: [
          { label: "Точность прогноза", value: "90%+" },
          { label: "Горизонт прогноза", value: "14 дней" },
          { label: "Ручной труд оператора", value: "0" }
        ]
      }
    }
  },
  team: {
    eyebrow: "Команда",
    h2a: "Люди ",
    h2b: "за моделями",
    sub: "Кросс-функциональная AI-команда - инженеры, учёные, дизайнеры и продакт - работает бок о бок с Risk, Legal, Operations и Retail.",
    headlineValue: "20+",
    headlineLabel: "сотрудников",
    detailsCta: "Подробнее",
    experienceLabel: "лет опыта",
    aboutTitle: "О сотруднике",
    achievementsTitle: "Достижения",
    projectsTitle: "Проекты",
    skillsTitle: "Навыки",
    back: "Назад к команде",
    body: "От базовых моделей и MLOps до дашбордов и чат-ботов - команда запустила портфель AI-продуктов, охватывающих юридическую проверку, автоматизацию документооборота, региональную аналитику, поддержку контакт-центра, управление автопарком и операции в солнечной энергетике. Дата-инженеры, backend- и frontend-разработчики, ML-специалисты, дизайнеры, проектные и HR-менеджеры работают как единая кросс-функциональная команда, плечом к плечу с подразделениями риска, юридического, операций и ритейла, доводя каждую идею от концепта до production."
  },
  impact: {
    eyebrow: "Эффект AI",
    h2a: "Цифры, которые ",
    h2b: "двигают результат",
    sub: "Совокупный эффект AI-департамента по юридической проверке, автоматизации документооборота, комплаенсу и бэк-офису - относительно базы до AI и с ежеквартальным аудитом.",
    updated: "Обновлено в апреле 2026 · по проектам AI Lex.uz, AI Ijro, Call Center AI, SQB Fleet AI и SQB Solar Forecaster",
    items: [
      { label: "Экономия времени проверки документов" },
      { label: "Ручная обработка (снижение)" },
      { label: "Комплаенс-риск (снижение)" },
      { label: "Экономия трудозатрат" }
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
          "По итогам Hackathon: 1-е место - платформа для принятия решений на основе региональной аналитики для предпринимателей; 2-е место - проект по оптимизации управления сетью банкоматов, оборотом наличных средств и логистикой инкассации; 3-е место - решение по рекомендации новых бизнес-направлений на основе анализа конкуренции и спроса в регионах.",
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
          "Мероприятие было направлено на широкое внедрение AI-технологий в реальный сектор экономики, ускорение процессов цифровой трансформации и выведение сотрудничества между государством, бизнесом и наукой на новый уровень. На одной площадке собрались главные драйверы AI-направления - представители науки, государства и IT-индустрии.",
          "Среди участников: президент Академии наук Узбекистана, академик Ш. Аюпов; первый заместитель министра цифровых технологий О. Пекос; директор Центра развития цифрового образования и AI А. Абдуллаев; заместитель генерального директора «IT Park Uzbekistan» М. Муксинова.",
          "В качестве практического решения была представлена платформа SQB «AI Консультант» - она направлена на поддержку предпринимательства за счёт анализа бизнес-идей граждан, оценки рентабельности и формирования возможностей финансирования."
        ]
      },
      n3: {
        title: "SQB AI Консультант - превращает идею в реальный бизнес за минуты",
        excerpt:
          "Цифровое решение от SQB: вы вводите идею - система выдаёт готовый бизнес-план, бюджет и онлайн-заявку на кредит.",
        body: [
          "Есть идея, но не знаете, как и с чего начать бизнес? Теперь это не проблема.",
          "SQB AI Консультант - цифровое решение, разработанное SQB, которое помогает превратить идею в реальный бизнес всего за несколько минут. Вам нужно лишь ввести свою идею - остальное система сделает сама: проанализирует ваш опыт и возможности, изучит потребности рынка в вашем регионе и определит наиболее подходящее направление бизнеса.",
          "В настоящее время проект запущен в тестовом режиме в Гиждуванском и Шафирканском районах Бухарской области.",
          "Уже через 5-10 минут вы получите: готовый бизнес-план, необходимый объём финансовых ресурсов, срок окупаемости проекта и пошаговый план действий. Самое важное - прямо в платформе также создаётся возможность выбрать подходящий кредит и подать онлайн-заявку на финансирование.",
          "Больше не нужно долго раздумывать, никаких рискованных решений - только чёткий план и действия. SQB - создаём будущее вместе."
        ]
      },
      n4: {
        title: "Молодёжь, стартапы и IT: SQB и Университет «Новый Узбекистан» начинают сотрудничество",
        excerpt:
          "Меморандум, подписанный в рамках акселерационной программы, охватывает AI, кибербезопасность, исследования и совместные стартап-проекты.",
        body: [
          "В Университете «Новый Узбекистан» в рамках акселерационной программы по поддержке стартапов подписан меморандум о сотрудничестве с SQB.",
          "Документ направлен на интеграцию образования и практики, подготовку специалистов с актуальными компетенциями, а также развитие долгосрочного партнёрства между университетом и банком.",
          "Среди приоритетных направлений сотрудничества - информационные технологии, искусственный интеллект, кибербезопасность, научные исследования и развитие стартап-проектов.",
          "Соглашение открывает для студентов новые возможности: прохождение практики, участие в совместных образовательных программах и тренингах, работа над реальными кейсами и развитие собственных стартапов.",
          "Для банка партнёрство станет инструментом формирования кадрового резерва, привлечения молодых IT-специалистов и ускорения цифровой трансформации."
        ]
      },
      n5: {
        title: "Потенциал молодёжи и инновации - приоритетное направление",
        excerpt:
          "SQB и Туринский политехнический университет подписали меморандум о сотрудничестве в области IT и искусственного интеллекта.",
        body: [
          "Как отметил глава государства в ходе открытого диалога с молодёжью в прошлом году, направления информационных технологий и искусственного интеллекта являются одними из ключевых факторов будущего развития, а поддержка молодёжи в этих сферах определена в качестве приоритетной задачи.",
          "В этих целях «Узпромстройбанк» (SQB) последовательно расширяет сотрудничество с высшими образовательными учреждениями. В частности, между Банком и Туринским политехническим университетом подписан меморандум о сотрудничестве.",
          "В рамках партнёрства: будут реализованы совместные проекты в сферах IT и искусственного интеллекта; талантливая молодёжь будет привлечена к цифровым инициативам банка; студенты будут системно вовлекаться в практическую деятельность; будет формироваться кадровый резерв перспективных IT-специалистов.",
          "Данное сотрудничество создаёт новые возможности для профессионального развития молодёжи и освоения ею современных знаний и практических навыков.",
          "SQB продолжает сотрудничество с академическим сообществом, уделяя особое внимание раскрытию инновационного потенциала молодёжи. SQB - вместе с молодёжью строит будущее!"
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
        name: "Международная конференция «Искусственный интеллект и цифровая трансформация - новый этап развития экономики Узбекистана»",
        place: "Ташкент",
        participants: "Правительство, банки, эксперты"
      },
      e3: {
        name: "Сотрудничество SQB и университета «Новый Узбекистан»",
        place: "Университет «Новый Узбекистан», Ташкент",
        participants: "Представители университета и SQB"
      },
      e4: {
        name: "Сотрудничество SQB и Туринского политехнического университета",
        place: "Туринский политехнический университет, Ташкент",
        participants: "Представители университета и SQB"
      }
    }
  },
  careers: {
    eyebrow: "Карьера",
    h2a: "Стройте будущее ",
    h2b: "AI-банкинга",
    h2c: " вместе с нами",
    sub: "Присоединяйтесь к AI-департаменту SQB - запускайте модели, которые двигают реальные банковские метрики, работайте с Risk, Legal, Operations и Retail и растите рядом с сильной кросс-функциональной командой.",
    invite: "Мы нанимаем за любознательность и мастерство, а не только за резюме. Если вам нравится запускать модели, которые касаются миллионов клиентов, превращать сырые данные в решения и быстро учиться рядом с сильной командой - вам к нам.",
    cta: "Хочу к вам",
    back: "Назад к карьере",
    rolesA: "У ",
    rolesHi: "нас",
    rolesB: " много вакансий",
    rolesSub: "Выберите, что интересно именно вам.",
    formTitle: "Заявка на стажировку",
    formSub: "Студенты и выпускники - укажите направление и поделитесь навыками или портфолио. Ответим в течение двух рабочих дней.",
    detailDesc: "Описание",
    detailResp: "Обязанности",
    detailReq: "Требования",
    detailOffer: "Мы предлагаем",
    apply: "Откликнуться",
    requirementsTitle: "Что мы ищем",
    empty: "Сейчас открытых вакансий нет - но мы всегда рады сильным специалистам. Напишите нам через форму ниже.",
    wantTitle: "Что мы хотим от вас",
    want: [
      {
        title: "Любознательность",
        body: "Вы быстро учитесь, копаетесь в сложных задачах и ставите под сомнение очевидное."
      },
      {
        title: "Ответственность",
        body: "Вы доводите идеи от концепта до прода и отвечаете за результат, а не только за задачу."
      },
      {
        title: "Эффект",
        body: "Вам важны реальные метрики - вы измеряете работу результатом, а не активностью."
      }
    ],
    types: {
      "full-time": "Полная занятость",
      "part-time": "Частичная занятость",
      internship: "Стажировка",
      contract: "Контракт"
    },
    cv: {
      label: "Резюме (CV)",
      hint: "PDF или Word · до 15 МБ",
      choose: "Выбрать файл",
      invalidType: "Разрешён только PDF или Word (.pdf, .doc, .docx)",
      tooLarge: "Файл больше 15 МБ"
    }
  },
  school: {
    eyebrow: "Школа",
    h2a: "AI начинается со ",
    h2b: "школы",
    h2c: "",
    sub: "Бесплатный курс по искусственному интеллекту для учеников 9-11 классов. Занятия по пятницам в банке - от того, что такое нейросеть, до вашего собственного работающего проекта.",
    cta: "Хочу к вам",
    back: "Назад в Школу",
    heroTitle: "SQB AI Школа",
    heroSub: "Не нужно быть программистом. Нужна любознательность. Наши инженеры объясняют, как искусственный интеллект работает на самом деле - на примере систем, которые уже работают внутри настоящего банка.",
    aboutTitle: "Что даёт программа",
    about: [
      {
        title: "Практика, а не теория",
        body: "Каждое занятие заканчивается не конспектом, а результатом, который вы сделали сами."
      },
      {
        title: "Настоящие инженеры",
        body: "Занятия ведёт команда SQB AI - те, кто строит модели банка."
      },
      {
        title: "Полностью бесплатно",
        body: "Программа ничего не стоит. От вас - только интерес и желание учиться."
      }
    ],
    scheduleTitle: "Как это проходит",
    scheduleNote: "каждую пятницу · с 17 июля 2026",
    formTitle: "Записаться на занятие",
    formSub: "Выберите тему, на которую хотите прийти. Сразу после отправки наш Telegram-бот пришлёт вам дату, время и адрес.",
    fields: {
      name: "Ф.И.О.",
      namePh: "Ваше имя и фамилия",
      email: "Email",
      emailPh: "you@example.com",
      phone: "Телефон",
      phonePh: "+998 90 123 45 67",
      school: "Школа",
      schoolPh: "например, школа №45",
      grade: "Класс",
      gradePh: "Выберите класс",
      gradeSuffix: "класс",
      topic: "Тема",
      topicPh: "Выберите тему"
    },
    submit: "Отправить",
    sending: "Отправляем…",
    sent: "Спасибо! Откройте Telegram-бот - он прислал вам все детали занятия.",
    openBot: "Открыть Telegram",
    openBotHint: "Нажмите кнопку, затем «Start» в боте - он пришлёт вам детали.",
    tgNote: "После отправки вы перейдёте в наш Telegram-бот. Нажмите «Start» - бот пришлёт вам дату, время и адрес занятия.",
    seatsLeft: "мест свободно",
    seatsFull: "Мест нет",
    seatsOf: "из",
    errAll: "Пожалуйста, заполните все поля.",
    errEmail: "Пожалуйста, введите корректный email.",
    errFull: "На это занятие мест больше нет. Выберите другое.",
    errRate: "Слишком много попыток. Подождите минуту и попробуйте снова.",
    errServer: "На нашей стороне произошла ошибка. Попробуйте ещё раз через минуту."
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
        a: "Это внутренняя AI-команда банка. Мы проектируем, строим и сопровождаем ML-системы по риску, фроду, автоматизации, NLP и CV - и измеряем эффект относительно базы до AI."
      },
      {
        q: "Как начать работу с SQB AI?",
        a: "Используйте форму ниже или напишите на ai@sqb.uz короткий бриф - задача, целевая метрика и доступные данные. Ответим в течение двух рабочих дней и направим к нужному лиду."
      },
      {
        q: "Работает ли SQB AI с криптовалютами?",
        a: "Нет. AI-департамент сфокусирован на банковских решениях - кредит, риск, фрод и клиентский опыт. По остальным запросам обращайтесь в Innovation Office SQB."
      },
      {
        q: "Как обеспечивается безопасность AI-решений?",
        a: "Наши модели поддерживают принятие решений в production-системах банка с полным аудит-следом, версионированием и откатами. Безопасность и интерпретируемость - обязательны."
      },
      {
        q: "Могут ли внешние партнёры сотрудничать с командой?",
        a: "Да - вендоры, университеты и финтех-партнёры приветствуются. Начните разговор через форму."
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
    sub: "Партнёры, вендоры, кандидаты и внутренние команды - расскажите о задаче, и мы вернёмся в течение двух рабочих дней.",
    partnerTab: "Партнёрство",
    internTab: "Стажировка",
    internSub: "Студенты и выпускники - подайте заявку на стажировку в команде SQB AI. Укажите направление и поделитесь навыками или портфолио.",
    fields: {
      name: "Полное имя",
      namePh: "Ваше имя",
      email: "Рабочая почта",
      emailPh: "you@company.com",
      company: "Компания / Команда",
      companyPh: "Опционально",
      phone: "Телефон",
      phonePh: "+998 90 123 45 67",
      message: "Чем мы можем помочь?",
      messagePh: "Кратко опишите кейс, данные и целевую метрику.",
      university: "Учебное заведение",
      universityPh: "Университет, школа, лицей…",
      direction: "Желаемое направление",
      directionPh: "Выберите направление…",
      internMessage: "О себе",
      internMessagePh: "Ваши навыки, ссылка на GitHub / портфолио и мотивация."
    },
    send: "Отправить",
    sending: "Отправляем…",
    sent: "Отправлено",
    openBot: "Открыть Telegram",
    openBotHint: "Нажмите кнопку, затем «Start» в боте - он пришлёт вам детали.",
    privacy: "Сообщение не передаётся третьим лицам. Только публичные данные.",
    address: "Республика Узбекистан, г. Ташкент, 100000, ул. Шахрисабз, д. 3",
    errAll: "Пожалуйста, заполните все обязательные поля.",
    errRate: "Слишком много попыток. Подождите минуту и попробуйте снова.",
    errServer: "На нашей стороне произошла ошибка. Попробуйте ещё раз через минуту.",
    errEmail: "Пожалуйста, укажите корректный email."
  },
  footer: {
    tagline:
      "Проектируем и сопровождаем AI-системы, которые двигают реальные банковские метрики - риск, фрод, автоматизацию, клиентский опыт.",
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
