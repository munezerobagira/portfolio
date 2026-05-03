import Project from "@/types/Project";
import User from "@/types/User";

export const data: {
  user: User;
  projects: Project[];
  skills: { icon: string; name: string }[];
} = {
  user: {
    keywords: [
      "Cloud-Native Engineer",
      "Research Engineer",
      "Product Architect",
      "UI/UX Designer",
      "Security Engineer",
    ],
    info: "Cloud-Native Engineer, Researcher, and UI/UX Designer operating out of Kigali. I build platforms that scale without breaking and perform without vulnerabilities.",
    summary:
      "Researcher & Engineer: Cloud/Security Engineering · Product Architecture · UI/UX Design. Currently pursuing MSIT at Carnegie Mellon University Africa.",
    about: "",
    profilePic: {
      width: 433,
      height: 577,
      url: "/profile-image.png",
    },
    name: "Sostene Munezero Bagira",
    email: "hi@mbags.space",
    role: "creator",
    id: "1",
  },

  projects: [],

  skills: [
    { name: "TypeScript", icon: "typescript-plain" },
    { name: "Python", icon: "python-plain" },
    { name: "Go", icon: "go-plain" },
    { name: "React", icon: "react-plain" },
    { name: "Next.js", icon: "nextjs-plain" },
    { name: "Node.js", icon: "nodejs-plain" },
    { name: "FastAPI", icon: "fastapi-plain" },
    { name: "Flask", icon: "flask-plain" },
    { name: "Docker", icon: "docker-plain" },
    { name: "Kubernetes", icon: "kubernetes-plain" },
    { name: "Google Cloud", icon: "googlecloud-plain" },
    { name: "Azure", icon: "azure-plain" },
    { name: "Terraform", icon: "terraform-plain" },
    { name: "Elasticsearch", icon: "elasticsearch-plain" },
    { name: "PostgreSQL", icon: "postgresql-plain" },
    { name: "Figma", icon: "figma-plain" },
    { name: "Git", icon: "git-plain" },
    { name: "Linux", icon: "linux-plain" },
  ],
};

/* ── ROI Highlights (Unfair Advantage section) ─────────────────────── */
export type AdvantageNode = {
  id: string;
  tag: string;
  headline: string;
  body: string;
  proofPoint: string;
  accentColor: "cyan" | "green";
};

export const advantageNodes: AdvantageNode[] = [
  {
    id: "scalable-execution",
    tag: "01 / SCALABLE EXECUTION",
    headline: "Resilient Pipelines.\nZero Downtime.",
    body: "Architecting CI/CD workflows and cloud-native infrastructures that absorb traffic spikes without cascading failure. From IaC to container orchestration.",
    proofPoint:
      "Scaled a full-stack platform to 600+ concurrent users — zero downtime across peak load events.",
    accentColor: "cyan",
  },
  {
    id: "security-defense",
    tag: "02 / SECURITY & DEFENSE",
    headline: "Threat Anticipation.\nSystem Hardening.",
    body: "Deploying XDR, SIEM, and custom detection logic to reduce attacker dwell time and harden attack surfaces before exploitation.",
    proofPoint:
      "Reduced incident response time by 50% through automated threat-detection pipelines and SIEM integration.",
    accentColor: "green",
  },
  {
    id: "product-velocity",
    tag: "03 / PRODUCT VELOCITY",
    headline: "Code Aligned\nto Business.",
    body: "Translating product requirements into robust backend systems, designing APIs that serve both developers and end-users without friction.",
    proofPoint:
      "Led backend platform handling 10,000+ daily requests with sub-100 ms response times.",
    accentColor: "cyan",
  },
];

/* ── Campaign / Proving Grounds deployments ────────────────────────── */
export type Deployment = {
  id: string;
  codename: string;
  classification: string;
  objective: string;
  techStack: string[];
  outcome: string;
  status: "DEPLOYED" | "ACTIVE" | "COMPLETED";
};

export const deployments: Deployment[] = [
  {
    id: "ndimboni",
    codename: "NDIMBONI PLATFORM",
    classification: "Security Intelligence",
    objective:
      "Engineered an automated IOC extraction engine that parses user-submitted threat reports, identifies Indicators of Compromise, and calculates confidence scores via ML heuristics.",
    techStack: ["Python", "FastAPI", "NLP", "PostgreSQL", "Docker"],
    outcome: "Automated threat triage for national-level security operations.",
    status: "DEPLOYED",
  },
  {
    id: "elk-ai",
    codename: "AI + ELK PIPELINE",
    classification: "Security Operations",
    objective:
      "End-to-end integration of Logstash, Elasticsearch, Kibana, and a Flask-based LLM middleware layer. Log ingestion, enrichment, and natural-language alert summaries.",
    techStack: ["ELK Stack", "Flask", "LLM", "Logstash", "Kibana"],
    outcome: "Reduced alert investigation time by 88% across SOC workflows.",
    status: "ACTIVE",
  },
  {
    id: "talent-platform",
    codename: "TALENT NEXUS",
    classification: "Product Architecture",
    objective:
      "Product-managed and UI/UX-designed an opportunity aggregation platform connecting talent with employers. Intelligent matching algorithm backed by a microservices architecture.",
    techStack: ["Next.js", "TypeScript", "Figma", "PostgreSQL", "GCP"],
    outcome: "Aggregated 10,000+ users within 6 months of launch.",
    status: "DEPLOYED",
  },
  {
    id: "phazend",
    codename: "PHAZEND TOURISM",
    classification: "AI Tourism Architecture",
    objective:
      "Designed intelligent tourism architecture for Rwanda — personalized itinerary generation, real-time availability, and multi-lingual conversational UI.",
    techStack: ["React", "Node.js", "AI/ML", "Mapbox", "Figma"],
    outcome:
      "Award-nominated intelligent tourism system at CMU Africa innovation showcase.",
    status: "COMPLETED",
  },
];

/* ── Certifications ─────────────────────────────────────────────────── */
export type Certification = {
  id: string;
  name: string;
  issuer: string;
  acronym: string;
  color: string;
};

export const certifications: Certification[] = [
  {
    id: "gcp-arch",
    name: "Professional Cloud Architect",
    issuer: "Google Cloud",
    acronym: "GCP PCA",
    color: "#00ff55",
  },
  {
    id: "kcna",
    name: "Kubernetes and Cloud Native Associate",
    issuer: "CNCF",
    acronym: "KCNA",
    color: "#4ade80",
  },
];

/* ── Research Papers ────────────────────────────────────────────────── */
export type ResearchPaper = {
  id: string;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  tags: string[];
  status: "Published" | "Under Review" | "In Progress" | "Preprint";
  doi?: string;
  url?: string;
};

export const researchPapers: ResearchPaper[] = [
  {
    id: "ai-threat-hunting",
    title:
      "LLM-Augmented Threat Hunting: Natural Language Interfaces for SOC Alert Triage",
    venue: "CMU Africa Research Symposium",
    year: "2024",
    abstract:
      "We present a framework that integrates Large Language Models into Security Operations Center workflows, enabling analysts to query SIEM data using natural language and receive contextualised alert summaries. Evaluation on a 6-month production log corpus shows an 88% reduction in mean-time-to-investigate.",
    tags: ["LLM", "Cybersecurity", "SIEM", "NLP", "SOC"],
    status: "Published",
  },
  {
    id: "iot-threat-modeling",
    title:
      "Automated IOC Extraction from Unstructured Threat Intelligence Reports",
    venue: "IEEE Conference on Emerging Technologies in Security",
    year: "2024",
    abstract:
      "A machine-learning pipeline for Indicator-of-Compromise extraction from free-text threat reports. The system employs named-entity recognition fine-tuned on CTI corpora, achieving 91% F1 on benchmark datasets and enabling real-time ingestion into national SIEM infrastructure.",
    tags: ["Threat Intelligence", "NLP", "IOC", "Machine Learning"],
    status: "Under Review",
  },
  {
    id: "resilient-cicd",
    title:
      "Resilient CI/CD Pipelines for Cloud-Native Applications: Patterns and Anti-Patterns",
    venue: "CMU Africa MSIT Capstone",
    year: "2025",
    abstract:
      "A systematic study of failure modes in cloud-native deployment pipelines. We categorise 23 anti-patterns observed across production environments and propose a resilience framework validated through chaos-engineering experiments across three infrastructure stacks.",
    tags: [
      "DevOps",
      "Cloud-Native",
      "CI/CD",
      "Resilience Engineering",
      "Kubernetes",
    ],
    status: "In Progress",
  },
];

