import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectType from "../../Types/Project";
import apiRequest from "../../util/apiRequest";

function Project() {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setBlog] = useState<ProjectType>({});
  const { projectId } = useParams();
  console.log(projectId);
  useEffect(() => {
    (async () => {
      const response = await apiRequest
        .get(`/projects/${projectId}?published=false`)
        .send({});
      setIsLoading(false);
      if (response.status == 200) {
        const { project } = response.body;
        setBlog(project);
      }
    })();
  }, []);
  return (
    <section id="post" className="margin-nav py-2">
      <div className="wrapper">
        <div className="flex" id="post-main"></div>
        <h1>Comments</h1>
        <div className="comment-group" id="comment-container"></div>
        <form className="form" id="write-comment">
          <div className="input-group">
            <textarea
              name="comment"
              placeholder="write your comment"
              cols={40}
              className="control"
              rows={5}
            ></textarea>
          </div>
          <button className="button" id="submitBtn">
            Send comment
          </button>
        </form>
      </div>
    </section>
  );
}
export default Project;

