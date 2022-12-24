import { Children, useEffect, useState } from "react";
import Post from "../Types/Post";
import { withHTMLForm } from "../util/validator";
interface PostProps extends Post {
  onSuccess: (data: this["schema"]) => void;
  children: JSX.Element;
  schema?: Object;
}
function PostForm({
  _id,
  categories,
  summary,
  content,
  title,
  image,
  onSuccess,
  schema,
  children,
}: PostProps) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    withHTMLForm("postForm", schema, (data) => {
      if (img) return onSuccess({ ...data, img });
      const sure = confirm("Do want the image to be auto generated");
      if (sure) return onSuccess({ ...data, img });
      alert("Please add an image");
    });
  });
  console.log(_id);
  return (
    <>
      {children}
      <div className="form-container">
        <form id="postForm">
          {_id && (
            <input
              className="control"
              type="hidden"
              name="title"
              placeholder="id"
              defaultValue={_id}
            />
          )}
          <div className="form-group">
            <input
              className="control"
              type="text"
              name="title"
              placeholder="Title of post"
              defaultValue={title || ""}
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
              onChange={(e) => setImg(e.target.files[0])}
            />
            {image && <img src={image.path} alt={title} />}
          </div>
          <div className="form-group">
            <input
              className="control"
              type="text"
              name="categories"
              placeholder="Tags, separated by commas"
              defaultValue={
                (categories &&
                  categories.map((category) => category.title).join(", ")) ||
                ""
              }
            />
          </div>
          <div className="form-group">
            <input
              className="control"
              type="text"
              name="summary"
              placeholder="Write a little summary"
              defaultValue={summary || ""}
            />
          </div>
          <div className="form-group">
            <textarea
              className="post control"
              name="content"
              cols={30}
              rows={10}
              placeholder="Write your post here"
              defaultValue={content || ""}
            ></textarea>
          </div>
          <button
            type="submit"
            className="button text-center width-full"
            id="submitBtn"
          >
            {_id ? "Add post" : "Edit Post "}
          </button>
        </form>
      </div>
    </>
  );
}

export default PostForm;

