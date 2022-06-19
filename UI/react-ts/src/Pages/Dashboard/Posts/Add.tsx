import PostForm from "../../../components/PostForm";

function AddPost() {
  return (
    <PostForm
      onSuccess={() => {
        console.log("You are welcome");
      }}
    >
      <h1>Add the Post</h1>
    </PostForm>
  );
}

export default AddPost;

