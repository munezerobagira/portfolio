import Project from "@/types/Project";
import User from "@/types/User";

export const data: {
  user: User;
  projects: Project[];
  skills: { icon: string; name: string }[];
} = {
  user: {
    keywords:
      "Just another Engineer",
    info: "Security-focused software engineer with more than 3 years of experience in developing and maintaining secure software applications. Expertise in Javascript and Typescript tools, and framework, with a focus on security best practices and threat modeling. Proven ability to identify, analyze, and mitigate security vulnerabilities. Passionate about building secure and reliable software.",
    summary:
      "Security-focused software engineer with more than 3 years of experience in developing and maintaining secure software applications. Expertise in Javascript and Typescript tools, and framework, with a focus on security best practices and threat modeling. Proven ability to identify, analyze, and mitigate security vulnerabilities. Passionate about building secure and reliable software.",
    about: "Software Engineer",
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

