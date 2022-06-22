import { useEffect, useState } from "react";
import apiRequest from "../../util/apiRequest";
import localStorageAPI from "../../util/localStorageAPI";
import { useNavigate } from "react-router-dom";

function index() {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      if (localStorageAPI.db.user.role == "admin") {
        const { messages } = (
          await apiRequest.get("messages?count=10000&published=false").send({})
        ).body;
        setMessages(messages);
        const { projects } = (
          await apiRequest.get("projects?count=10000&published=false").send({})
        ).body;
        setProjects(projects);
        const { articles } = (
          await apiRequest.get("articles?count=10000&published=false").send({})
        ).body;
        setPosts(articles);
        const { comments } = (
          await apiRequest.get("articles/comments?count=10000").send({})
        ).body;
        setComments(comments);
      }
    })();
  }, []);

  return (
    <div className="flex flex-wrap flex-between">
      <div className="card px-2">
        <h4>
          <span className="color-primary">{posts?.length || 0}</span> posts
        </h4>
      </div>
      <div className="card px-2">
        <h4>
          <span className="color-primary">{comments.length}</span> comments
        </h4>
      </div>
      <div className="card px-2">
        <h4>
          <span className="color-primary">{projects.length}</span> projects
        </h4>
      </div>
      <div className="card px-2">
        <h4>
          <span className="color-primary">{messages.length}</span> messages
        </h4>
      </div>
    </div>
  );
}

export default index;

