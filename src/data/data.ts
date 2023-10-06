import Project from "@/types/Project";
import User from "@/types/User";

export const data: {
  user: User;
  projects: Project[];
  skills: { icon: string; name: string }[];
} = {
  user: {
    keywords:
      "Skilled Software Engineer, Exprienced Software Engineer, Web Security Engineer",
    info: "Security-focused software engineer with more than 3 years of experience in developing and maintaining secure software applications. Expertise in Javascript and Typescript tools, and framework, with a focus on security best practices and threat modeling. Proven ability to identify, analyze, and mitigate security vulnerabilities. Passionate about building secure and reliable software.",
    summary:
      "Security-focused software engineer with more than 3 years of experience in developing and maintaining secure software applications. Expertise in Javascript and Typescript tools, and framework, with a focus on security best practices and threat modeling. Proven ability to identify, analyze, and mitigate security vulnerabilities. Passionate about building secure and reliable software.",
    about: "Software Engineer",
    profilePic: {
      width: 512,
      height: 512,
      url: "/profile.jpeg",
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
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/javascript.svg",
    },
    {
      name: "Typescript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/typescript.svg",
    },
    {
      name: "Vue.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/vuejs.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/react.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/nextjs.svg",
    },
    {
      name: "Nest.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/nestjs.svg",
    },
    {
      name: "Express.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/express.svg",
    },
    {
      name: "Mocha.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/mocha.svg",
    },
    {
      name: "Jest",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/jest.svg",
    },
    {
      name: "gRPC",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/grpc.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/python.svg",
    },
    {
      name: "FastAPI",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/fastapi.svg",
    },
    {
      name: "Visual Studio Code",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/vscode.svg",
    },
    {
      name: "Dart",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/dart.svg",
    },
    {
      name: "Flutter",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/flutter.svg",
    },
    {
      name: "React Native",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/react-native.svg",
    },
    {
      name: "Neovim",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicons/icons/neovim.svg",
    },
  ],
};

