import Project from "@/types/Project";
import User from "@/types/User";

export const data: {
  user: User;
  projects: Project[];
  skills: { icon: string; name: string }[];
} = {
  user: {
    keywords: [
      "Full-Stack Engineer",
      "Frontend Engineer",
      "Backend Engineer",
      "Mobile Engineer",
      "Cloud & DevOps",
    ],
    info: "Enthusiastic remote full-stack developer with over 5 years of experience crafting secure and user-centric applications. Adept at tackling projects from concept to deployment across diverse technologies, including front-end, back-end, mobile development, and cloud platforms. Proven ability to lead and collaborate effectively in remote environments.",
    summary:
      "I'm a results-oriented remote software engineer with a passion for building secure, scalable software solutions.  I possess a comprehensive skillset encompassing both back-end development (JavaScript, TypeScript, Python) and front-end development (Vue.js, React, React Native).  Experienced in leading remote teams, delivering projects on time, and prioritizing the highest security standards.",
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
    {
      name: "Javascript",
      icon: "javascript-plain",
    },
    {
      name: "Typescript",
      icon: "typescript-plain",
    },
    {
      name: "Vue.js",
      icon: "vuejs-plain",
    },
    {
      name: "React",
      icon: "react-plain",
    },
    {
      name: "Next.js",
      icon: "nextjs-plain",
    },
    {
      name: "Nest.js",
      icon: "nestjs-plain",
    },
    {
      name: "Express.js",
      icon: "express-original",
    },
    {
      name: "Mocha.js",
      icon: "mocha-plain",
    },
    {
      name: "Jest",
      icon: "jest-plain",
    },
    {
      name: "Python",
      icon: "python-plain",
    },
    {
      name: "FastAPI",
      icon: "fastapi-plain",
    },
    {
      name: "Flask",
      icon: "flask-plain",
    },
    {
      name: "Dart",
      icon: "dart-plain",
    },
    {
      name: "Flutter",
      icon: "flutter-plain",
    },
    {
      name: "React Native",
      icon: "react-plain",
    },
    {
      name: "Docker",
      icon: "docker-plain",
    },
    {
      name: "Kubernetes",
      icon: "kubernetes-plain",
    },
    {
      name: "Azure",
      icon: "azure-plain",
    },
    {
      name: "Figma",
      icon: "figma-plain",
    },
    {
      name: "Git",
      icon: "git-plain",
    },
    {
      name: "NeoVim",
      icon: "neovim-plain",
    },
  ],
};
