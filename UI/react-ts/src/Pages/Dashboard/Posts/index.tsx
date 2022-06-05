import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const deletePost = async (id, element) => {
    // handle delete click event
    element.setAttribute("disabled", true);
    const sure = confirm(
      `Are you sure you want to delete a post with id  ${id} `
    );
    if (!sure) {
      element.removeAttribute("disabled");
      return false;
    }
    const response = await apiRequest.delete(`/articles/${id}`).send({});
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
            <Link className="silent" to="add">
              <button className="button">Add post</button>
            </Link>
          </div>
          <form className="flex width-full">
            <input type="text" className="control mr-1" />
            <button className="button">Search</button>
          </form>
        </div>

        <div className="flex flex-row horizontal-scroll flex-wrap" id="posts">
          {posts.map((post) => (
            <div className="card">
              <div className="card-image">
                <a href="/pages/admin/posts/form/index.html?id=${post._id}">
                  <img src="${post.image.path}" alt="Typing speed" />
                </a>
              </div>
              <div className="text-container">
                <h4>${post.title}</h4>
                <p>
                  $
                  {post.summary.length > 100
                    ? post.summary.slice(0, 50)
                    : post.summary}
                </p>
                <div className="tags">
                  {post.categories.reduce(
                    (iterator, category) =>
                      (iterator += "<span>" + category.title + "</span>"),
                    ""
                  )}
                </div>
                <div>
                  <button className="button-primary-inverse">
                    <Link to={`edit?id=${post._id}`}>Edit</Link>
                  </button>
                  <button
                    className="button-danger"
                    onClick={(e) => {
                      deletePost(post._id, e.target);
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

