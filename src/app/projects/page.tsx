"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import LoadingBall from "../../components/LoadingBall";
import Project from "@/types/Project";
import { data as siteData } from "@/data";

function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Array<Project>>([]);
  
  useEffect(() => {
    (async () => {
      setProjects(siteData.projects);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <LoadingBall />;
  
  return (
    <section id="projects" className="margin-nav py-24">
      <h2 className="text-center text-2xl my-6">Professional Projects</h2>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Here are some of the professional projects I have worked on, demonstrating my expertise across different domains.
      </p>
      <div
        className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"
        id="projects-list"
      >
        {projects.map((project) => (
          <div
            className="card bg-black bg-opacity-30 shadow-xl"
            key={project.id}
          >
            <div className="card-body">
              <h4 className="card-title">{project.title}</h4>
              <p>
                {project.summary?.length > 100
                  ? project.summary?.slice(0, 100) + "..."
                  : project.summary}
              </p>
              <div className="card-actions mt-2">
                {project.categories?.map((category, key) => (
                  <span 
                    key={key}
                    className="badge badge-outline"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
              <div className="card-actions mt-4">
                <Link
                  href={project.link || "#"}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
