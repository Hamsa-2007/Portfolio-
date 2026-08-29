export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  desc: string;
  highlights: string[];
  stack: string[];
  accentColor: string;
  secondaryColor: string;
  links: {
    live?: string;
    github?: string;
  };
  agentRole: string;
  iconType: 'medical' | 'voice' | 'agriculture' | 'forensics' | 'security';
}

export interface SkillGroup {
  category: string;
  accent: string;
  items: { name: string; level: string; icon?: string }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  type: 'Internship' | 'Hackathon' | 'Education';
  badge: string;
  badgeColor: string;
  description: string;
  achievements: string[];
  accentColor: string;
}

export const PERSONAL_INFO = {
  name: "Hamsa Priya M.",
  role: "AI / ML Engineer & Full-Stack Developer",
  subRole: "Building Autonomous Systems, Deep Neural Architectures & Human-Centric AI",
  shortBio: "Bridging the frontier of machine learning, real-time agent workflows, and intuitive software. Currently developing full-stack AI platforms with a focus on clinical intelligence, voice AI, and agricultural resilience.",
  education: "B.E. in Artificial Intelligence & Machine Learning (Sapthagiri NPS University)",
  cgpa: "9.14 CGPA",
  location: "Bengaluru, Karnataka, India",
  email: "hamsampriyam@gmail.com",
  linkedin: "https://linkedin.com/in/hamsa-priya-m-470b6538a",
  github: "https://github.com/Hamsa-2007",
  stats: [
    { label: "AI Systems Built", value: "5+", color: "#8B5CF6" },
    { label: "Hackathon Podiums", value: "3", color: "#3B82F6" },
    { label: "Academic CGPA", value: "9.14", color: "#F59E0B" },
    { label: "Architecture", value: "Multi-Agent", color: "#10B981" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "hospital-intelligence",
    number: "01",
    title: "Hospital Intelligence",
    tagline: "Clinical Handover & Patient Safety Intelligence System",
    category: "Healthcare · Generative AI · Multi-Agent",
    desc: "An AI-powered clinical workflow platform integrating Google Gemini AI to analyze raw doctor/nurse shift logs, extract critical patient flags, summarize handover reports, and predict patient risk trajectories.",
    highlights: [
      "Automated structured clinical shift handover synthesis with multi-tier validation",
      "Real-time safety incident categorization and severity matrix estimation",
      "Built with enterprise-grade React, TypeScript, Prisma & Google Gemini AI"
    ],
    stack: ["React 19", "TypeScript", "Node.js", "Prisma", "SQLite", "Google Gemini AI", "Tailwind CSS"],
    accentColor: "#8B5CF6", // Electric Violet
    secondaryColor: "#C084FC",
    links: {
      live: "https://hospital-intelligence-pdgk.vercel.app",
      github: "https://github.com/Hamsa-2007"
    },
    agentRole: "Clinical Safety Copilot",
    iconType: "medical"
  },
  {
    id: "dhwani-ai",
    number: "02",
    title: "Dhwani AI",
    tagline: "Multilingual Autonomous Voice Agent for Healthcare",
    category: "Voice AI · Groq · Twilio · Conversational",
    desc: "Autonomous conversational patient engagement system providing multilingual voice-call check-ins, medication adherence reminders, and intelligent response triage for patients in regional Indian languages.",
    highlights: [
      "Awarded 2nd Place at HackMatrix 2.0 (IIT Patna) in an intense 36-hour sprint",
      "Sub-second voice latency using Twilio Voice API, ultra-fast Groq Llama-3 inference & Supabase",
      "Real-time sentiment and urgency extraction for medical staff escalation"
    ],
    stack: ["Node.js", "Supabase", "Twilio Voice API", "Groq AI", "Llama 3", "WebSockets"],
    accentColor: "#3B82F6", // Cobalt Blue
    secondaryColor: "#60A5FA",
    links: {
      github: "https://github.com/Hamsa-2007"
    },
    agentRole: "Voice Engagement Assistant",
    iconType: "voice"
  },
  {
    id: "thaila-vardhana",
    number: "03",
    title: "Thaila Vardhana",
    tagline: "Intelligent Agro-Advisory & Yield Forecasting Engine",
    category: "AgriTech · Predictive AI · Financial Planning",
    desc: "A comprehensive digital ecosystem for oil palm growers featuring computer vision disease identification, localized soil-weather yield predictions, dynamic market price tracker, and automated financial tracking.",
    highlights: [
      "SIH 2025 Finalist (Smart India Hackathon)",
      "Integrated machine learning models for crop health and fertilizer optimization",
      "Full-stack platform empowering smallholder farmers with predictive insights"
    ],
    stack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Python ML"],
    accentColor: "#F59E0B", // Warm Coral / Amber
    secondaryColor: "#FB923C",
    links: {
      github: "https://github.com/Hamsa-2007"
    },
    agentRole: "Yield Intelligence Agent",
    iconType: "agriculture"
  },
  {
    id: "cyber-lens",
    number: "04",
    title: "Cyber Lens",
    tagline: "AI-Powered Forensic Report Analysis & Telemetry Engine",
    category: "Cyber Forensics · NLP · Threat Intelligence",
    desc: "An intelligent forensic document analyzer that automatically extracts critical Indicators of Compromise (IOCs), parses complex incident logs, and synthesizes threat mitigation summaries from raw forensic PDFs.",
    highlights: [
      "Rapid NLP entity extraction and pattern detection across multi-page forensic reports",
      "Automated threat severity scoring and incident timeline reconstruction",
      "Engineered during competitive 24-hour hackathon conditions"
    ],
    stack: ["Python", "FastAPI", "NLP", "PyPDF", "JavaScript", "React"],
    accentColor: "#10B981", // Emerald Neon
    secondaryColor: "#34D399",
    links: {
      github: "https://github.com/Hamsa-2007"
    },
    agentRole: "Forensic Analysis Bot",
    iconType: "forensics"
  },
  {
    id: "seed-intel",
    number: "05",
    title: "SeedIntel",
    tagline: "Crop Shift Mitigation & Climate Adaptation Platform",
    category: "Agri-Intelligence · Predictive Modeling · Climate AI",
    desc: "Data-driven agricultural platform designed to mitigate crop yield shifts caused by climate anomalies, featuring localized sowing windows, seed variety advisory, and weather risk simulations.",
    highlights: [
      "Predictive agro-climatic shift modeling to prevent sudden harvest failures",
      "Custom seed recommendation algorithms calibrated on regional soil data",
      "Built for rapid deployment in agrarian hackathon sprints"
    ],
    stack: ["Python", "Machine Learning", "FastAPI", "React", "Tailwind CSS"],
    accentColor: "#EC4899", // Rose / Pink Glow
    secondaryColor: "#F472B6",
    links: {
      github: "https://github.com/Hamsa-2007"
    },
    agentRole: "Climate Adaptation Agent",
    iconType: "agriculture"
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "AI & Machine Learning",
    accent: "#8B5CF6",
    items: [
      { name: "PyTorch & TensorFlow", level: "Advanced" },
      { name: "LLM & Prompt Eng (Gemini, Llama)", level: "Advanced" },
      { name: "Autonomous Multi-Agents", level: "Proficient" },
      { name: "NLP & Sentiment Analysis", level: "Advanced" },
      { name: "Computer Vision & CNNs", level: "Proficient" },
      { name: "Groq & Fast Inference", level: "Proficient" }
    ]
  },
  {
    category: "Languages & Core CS",
    accent: "#3B82F6",
    items: [
      { name: "Python", level: "Expert" },
      { name: "TypeScript & JavaScript", level: "Advanced" },
      { name: "Java", level: "Advanced" },
      { name: "C++", level: "Intermediate" },
      { name: "Data Structures & Algorithms", level: "Proficient" },
      { name: "Object-Oriented Design", level: "Advanced" }
    ]
  },
  {
    category: "Full-Stack & Systems",
    accent: "#F59E0B",
    items: [
      { name: "React 19 & Next.js", level: "Advanced" },
      { name: "Node.js & Express", level: "Advanced" },
      { name: "Tailwind CSS & Framer Motion", level: "Expert" },
      { name: "Three.js & WebGL (@r3f)", level: "Proficient" },
      { name: "REST APIs & WebSockets", level: "Advanced" }
    ]
  },
  {
    category: "Databases, Cloud & Tools",
    accent: "#EC4899",
    items: [
      { name: "Supabase & PostgreSQL", level: "Advanced" },
      { name: "MongoDB & Prisma ORM", level: "Advanced" },
      { name: "Git & GitHub CI/CD", level: "Advanced" },
      { name: "Twilio Voice API", level: "Proficient" },
      { name: "Docker & Linux", level: "Intermediate" }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "May 2026 – Jun 2026",
    role: "Software & AI Engineer Intern",
    organization: "Industry Internship Program",
    type: "Internship",
    badge: "Engineering Internship",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    description: "Spearheaded core debugging and intelligent agent optimization across distributed microservices.",
    achievements: [
      "Engineered performance optimizations that reduced live agent response latency by over 35%",
      "Upgraded transcription and parsing pipelines for high-throughput post-call processing",
      "Architected error-telemetry hooks that boosted systemic fault resolution speeds"
    ],
    accentColor: "#8B5CF6"
  },
  {
    id: "exp-2",
    period: "36-Hour National Sprint",
    role: "2nd Place Winner (Podium)",
    organization: "HackMatrix 2.0 · IIT Patna",
    type: "Hackathon",
    badge: "2nd Place / Podium",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    description: "Built the Dhwani AI patient engagement and multilingual call triage system from scratch in 36 hours.",
    achievements: [
      "Competed against 100+ top engineering teams across India",
      "Integrated Twilio voice webhooks and Groq ultra-low-latency AI response engine",
      "Delivered a live operational demo of multilingual automated health check-ins"
    ],
    accentColor: "#3B82F6"
  },
  {
    id: "exp-3",
    period: "National Level Innovation",
    role: "SIH 2025 Finalist",
    organization: "Smart India Hackathon 2025",
    type: "Hackathon",
    badge: "SIH 2025 Finalist",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    description: "Selected as National Finalist for solving complex agricultural supply & yield forecasting issues with Thaila Vardhana.",
    achievements: [
      "Formulated machine learning advisory system for oil palm crop health",
      "Presented working MVP to government ministry evaluators and industry veterans"
    ],
    accentColor: "#F59E0B"
  },
  {
    id: "exp-4",
    period: "2023 – 2027 (Expected)",
    role: "B.E. in Artificial Intelligence & Machine Learning",
    organization: "Sapthagiri NPS University",
    type: "Education",
    badge: "9.14 CGPA",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    description: "Specializing in Deep Learning, Statistical Machine Learning, Distributed Computing, and Neural Architectures.",
    achievements: [
      "Maintaining strong academic distinction with 9.14 cumulative grade point average",
      "Active participant in technical club hackathons, open-source initiatives and AI research workshops"
    ],
    accentColor: "#10B981"
  }
];
