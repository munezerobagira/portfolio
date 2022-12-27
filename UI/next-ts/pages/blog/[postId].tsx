import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingBall from "../../components/LoadingBall";
import PostType from "../../Types/Post";
import apiRequest from "../../util/apiRequest";

function Post() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<PostType>({});
  const router = useRouter();
  const { postId } = router.query;
  console.log(postId);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await apiRequest.get(`/articles/${postId}`).send({});
      if (response.status == 200) {
        setIsLoading(false);
        const { article } = response.body;
        setPost(article);
      }
    })();
  }, [postId]);
  if (isLoading && !post.content) return <LoadingBall />;
  return (
    <section id="post" className="margin-nav py-2">
      <div className="wrapper">
        <div className="flex" id="post-main">
          <div className="main-content">
            <img
              src={post.image.path}
              alt={post.title}
              className="width-full"
            />
            <div className="text-container">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
          <aside className="post-details">
            <h5>
              Written by
              <a href="../../about/" className="silent">
                <span className="color-primary">{post.author.name}</span>
              </a>
            </h5>
            <p>
              <small>{new Date(post.updatedAt).toLocaleString()}</small>
            </p>
          </aside>
        </div>
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

