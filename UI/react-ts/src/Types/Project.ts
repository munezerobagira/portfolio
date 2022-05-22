export default interface Project {
  _id?: string;
  title?: string;
  githubLink?: string;
  liveLink?: string;
  summary?: string;
  image?: {
    path: string;
  };
  categories?: [{ _id: string; title: string }];
}

