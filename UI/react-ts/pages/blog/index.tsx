import { useEffect, useState } from "react";

import LoadingBall from "../../components/LoadingBall";
import apiRequest from "../../util/apiRequest";
import Post from "../../Types/Post";

function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<Array<Post>>([]);
  useEffect(() => {
    (async () => {
      const response = await apiRequest
        .get("/articles?published=false")
        .send({});
      setIsLoading(false);
      if (response.status == 200) {
        const { articles } = response.body;
        setBlogs(articles);
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
          {blogs.map((post) => (
            <div className="card" key={post._id}>
              <div className="card-image">
                <a href={`/blog/${post._id}`}>
                  <img src={post.image.path} alt={post.title} />
                </a>
              </div>
              <div className="text-container">
                <h4>{post.title}</h4>
                <p>
                  {post.summary.length > 100
                    ? post.summary.slice(0, 50) + "  ..."
                    : post.summary}
                </p>
                <div className="tags">
                  {post.categories.map((category) => (
                    <span>{category.title} </span>
                  ))}
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

export default Posts;

