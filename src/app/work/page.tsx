"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import LoadingBall from "../../components/LoadingBall";
import Project from "@/types/Project";

function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [hobbyProjects, sethobbyProjects] = useState<Array<Project>>([]);
  useEffect(() => {
    (async () => {
      let response = await fetch(
        "https://api.github.com/users/mbags-playground/repos?sort=pushed&direction=desc"
      );

      let projects = await response.json();
      response = await fetch(
        "https://api.github.com/users/mbags-playground/repos"
      );
      let data: Array<any> = await response.json();
      projects = [...projects, ...data];
      setIsLoading(false);
      const githubProjects = projects.map((project) =>
        Project.fromGithub(project)
      );
      if (response.status == 200) {
        sethobbyProjects([...githubProjects]);
      }
    })();
  }, []);
  if (isLoading) return <LoadingBall />;
  return (
    <section id="blog" className="margin-nav py-24">
      <h2 className="text-center text-2xl my-6">Opensource hobby projects</h2>
      <div
        className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"
        id="posts"
      >
        {hobbyProjects.map((project) => (
          <div
            className="card  bg-black bg-opacity-30 shadow-xl"
            key={project.id}
          >
            <div className="card-body">
              <h4 className="card-title">{project.title}</h4>
              <p>
                {project.summary?.length > 100
                  ? project.summary?.slice(0, 50) + "  ..."
                  : project.summary}
              </p>
              <div className="card-actions">
                {project.categories.map((category, key) => (
                  <span key={key}>{category.title} </span>
                ))}
              </div>
              <div className="card-actions flex justify-between">
                <Link
                  href={project.link || "#"}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Live url
                </Link>
                <Link
                  href={project.githubLink || "#"}
                  className="btn btn-secondary"
                  target="_blank"
                >
                  Github
                </Link>
              </div>
            </div>
          </div>
        ))}
        <p className="text-center width-full">...</p>
      </div>
    </section>
  );
}

export default Projects;

