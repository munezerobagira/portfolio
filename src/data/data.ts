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
      "Product Architect",
      "UI/UX Designer",
      "Security Engineer",
      "Full-Stack Builder",
    ],
    info: "Cloud-Native Engineer, Product Architect, and UI/UX Designer operating out of Kigali. I build platforms that scale without breaking and perform without vulnerabilities.",
    summary:
      "Tri-brid operator: Product Management · UI/UX Design · Cloud/Security Engineering. Currently pursuing MSIT at Carnegie Mellon University Africa.",
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
  accentColor: "cyan" | "magenta";
};

export const advantageNodes: AdvantageNode[] = [
  {
    id: "scalable-execution",
    tag: "01 / SCALABLE EXECUTION",
    headline: "Resilient Pipelines.\nZero Downtime.",
    body: "Architecting CI/CD workflows and cloud-native infrastructures that absorb traffic spikes without cascading failure. From IaC to container orchestration.",
    proofPoint:
      "Scaled a full-stack platform to 600+ concurrent users as CTO at PassResource.",
    accentColor: "cyan",
  },
  {
    id: "security-defense",
    tag: "02 / SECURITY & DEFENSE",
    headline: "Threat Anticipation.\nSystem Hardening.",
    body: "Deploying XDR, SIEM, and custom detection logic to reduce attacker dwell time and harden attack surfaces before exploitation.",
    proofPoint:
      "Reduced incident response time by 50% using Microsoft XDR + Splunk at Irembo.",
    accentColor: "magenta",
  },
  {
    id: "product-velocity",
    tag: "03 / PRODUCT VELOCITY",
    headline: "Code Aligned\nto Business.",
    body: "Translating product requirements into robust backend systems, designing APIs that serve both developers and end-users without friction.",
    proofPoint:
      "Led backend platform at Mpuza Inc. handling 10,000+ daily requests flawlessly.",
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
    id: "ini-opportunity",
    codename: "INI OPPORTUNITY",
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
    color: "#00F0FF",
  },
  {
    id: "kcna",
    name: "Kubernetes and Cloud Native Associate",
    issuer: "CNCF",
    acronym: "KCNA",
    color: "#FF003C",
  },
];

