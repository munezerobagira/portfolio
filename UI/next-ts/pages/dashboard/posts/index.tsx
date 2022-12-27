import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingBall from "../../../components/LoadingBall";
import Post from "../../../Types/Post";
import apiRequest from "../../../util/apiRequest";
import toast from "../../../util/toast";

function DashboardPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Array<Post>>([]);
  useEffect(() => {
    (async () => {
      const response = await apiRequest
        .get("articles?published=false&count=10")
        .send({});
      setLoading(false);
      if (response.status == 200) {
        const { articles } = response.body;
        setPosts(articles);
      }
    })();
  }, []);
  const deletePost = async (post: Post, element) => {
    // handle delete click event
    element.setAttribute("disabled", true);
    const sure = prompt(
      `Enter the title of the post as  \n"${post.title.trim()}"  \nto delete post`
    );
    if (sure !== post.title.trim()) {
      alert("Not same title");
      element.removeAttribute("disabled");
      return false;
    }
    const response = await apiRequest.delete(`/articles/${post._id}`).send({});
    if (response.status == 200) {
      toast("Your post has been deleted sucessfull");
      return window.location.reload();
    }
    element.removeAttribute("disabled");
  };
  if (loading) return <LoadingBall />;

  return (
    <>
      <div>
        <div className="flitter">
          <div className="flex flex-between">
            <h1>Posts</h1>
            <Link className="silent" href="/dashboard/posts/add">
              <button className="button">Add post</button>
            </Link>
          </div>
          <form className="flex width-full">
            <input type="text" className="control mr-1" />
            <button className="button">Search</button>
          </form>
        </div>

        <div className="flex flex-row horizontal-scroll flex-wrap" id="posts">
          {posts.map((post, key) => (
            <div className="card" key={key}>
              <div className="card-image">
                <Link href="/s/admin/posts/form/index.html?id=${post._id}">
                  <img src={post.image.path} alt={post.summary} />
                </Link>
              </div>
              <div className="text-container">
                <h4>{post.title}</h4>
                <p>
                  {post.summary.length > 100
                    ? post.summary.slice(0, 50)
                    : post.summary}
                </p>
                <div className="tags">
                  {post.categories.map((category, key) => (
                    <span key={key}> {category.title} </span>
                  ))}
                </div>
                <div>
                  <button className="button-primary-inverse">
                    <Link href={`/dashboard/posts/${post._id}`}>Edit</Link>
                  </button>
                  <button
                    className="button-danger"
                    onClick={(e) => {
                      deletePost(post, e.target);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardPosts;

