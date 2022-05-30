import { useEffect } from "react";
import Post from "../Types/Post";

interface PostProps extends Post {
  onSuccess: Function;
}
function PostForm({
  _id,
  categories,
  summary,
  content,
  title,
  image,
  onSuccess,
}: PostProps) {
  useEffect(() => {});
  return (
    <>
      <h1 id="pageTitle">Add post</h1>
      <div className="form-container">
        <form id="postForm">
          <div className="form-group">
            <input
              className="control"
              type="text"
              name="title"
              placeholder="Title of post"
            />
          </div>
          <div className="form-group">
            <label>Choose main image</label>
            <input
              className="control"
              type="file"
              name="image"
              placeholder="Choose an image"
              id="image"
            />
          </div>
          <div className="form-group">
            <input
              className="control"
              type="text"
              name="categories"
              placeholder="Tags, separated by commas"
            />
          </div>
          <div className="form-group">
            <input
              className="control"
              type="text"
              name="summary"
              placeholder="Write a little summary"
            />
          </div>
          <div className="form-group">
            <textarea
              className="post control"
              name="content"
              cols="30"
              rows="10"
              placeholder="Write your post here"
            ></textarea>
          </div>
          <button
            type="submit"
            className="button text-center width-full"
            id="submitBtn"
          >
            Add post
          </button>
        </form>
      </div>
    </>
  );
}

export default PostForm;

