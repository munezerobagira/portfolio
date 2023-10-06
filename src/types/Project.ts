export default class Project {
  id?: string;
  title?: string;
  githubLink?: string;
  link?: string;
  summary?: string;
  image?: {
    path: string;
  };
  categories?: [{ id: string; title: string }];
  static fromGithub(githubRepository: any): Project {
    const project = new Project();
    project.title = githubRepository?.name;
    project.githubLink = githubRepository?.html_url;
    project.summary = githubRepository?.description;
    project.image = { path: githubRepository?.avatar_url };
    project.link = githubRepository?.html_url;
    project.categories = githubRepository?.topics.map((category) => ({
      id: category.id,
      title: category.name,
    }));

    return project;
  }
}

