import PostForm from "../../../components/PostForm";

function AddPost() {
  const postSchema = {
    title: "string[2]",
    categories: "string[4]",
    summary: "string[5]",
    post: "string[5]",
    content: "string[5], required",
    featured: "boolean",
    published: "boolean",
  };
  return (
    <PostForm
      schema={postSchema}
      onSuccess={(data) => {
        console.log(data);
      }}
    >
      <h2>Add the Post</h2>
    </PostForm>
  );
}

export default AddPost;

