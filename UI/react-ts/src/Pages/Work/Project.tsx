import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../util/apiRequest";

function Post() {
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const { articleId } = useParams();
  console.log(articleId);
  useEffect(() => {
    (async () => {
      const response = await apiRequest
        .get("/articles?published=false")
        .send({});
      setIsLoading(false);
      if (response.status == 200) {
        const { articles } = response.body;
        setBlog(articles);
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
export default Post;

