import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LoadingBall from "../../components/LoadingBall";
import apiRequest from "../../util/apiRequest";
import Project from "../../Types/Project";
import "./index.css";

function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<Array<Project>>([]);
  useEffect(() => {
    (async () => {
      const response = await apiRequest
        .get("/projects?published=false")
        .send({});
      setIsLoading(false);
      if (response.status == 200) {
        const { projects } = response.body;
        setBlogs(projects);
      }
    })();
  }, []);
  if (isLoading) return <LoadingBall />;
  return (
    <section id="blog" className="margin-nav py-2">
      <div className="wrapper">
        <div className="heading text-center">
          <h2>Blog posts</h2>
        </div>
        <div className="flex flex-wrap" id="featured-post"></div>

        <div className="flex flex-row horizontal-scroll flex-wrap" id="posts">
          {blogs.map((project) => (
            <div className="card" key={project._id}>
              <div className="card-image">
                <Link to={`/blogs/${project._id}`}>
                  <img src={project.image.path} alt={project.title} />
                </Link>
              </div>
              <div className="text-container">
                <h4>{project.title}</h4>
                <p>
                  {project.summary.length > 100
                    ? project.summary.slice(0, 50) + "  ..."
                    : project.summary}
                </p>
                <div className="tags">
                  {project.categories.map((category) => (
                    <span>{category.title} </span>
                  ))}
                </div>
                <div className="flex flex-between">
                  <a
                    href={project.link}
                    className="button silent"
                    target="_blank"
                  >
                    Live url
                  </a>
                  <a
                    href={project.githubLink || "#"}
                    className="button silent mx-1"
                  >
                    Github
                  </a>
                </div>
              </div>
            </div>
          ))}
          <p className="text-center width-full">...</p>
        </div>
      </div>
    </section>
  );
}

export default Projects;

